
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import os from 'os';
import cors from 'cors';
import multer from 'multer';
import http from 'http';
import https from 'https';
import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";
import { execa } from 'execa';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);
// Tạo thư mục uploads nếu chưa có
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}





// === Load .env.port ===
const envPortPath = path.resolve(__dirname, '../.env.port');
if (!fs.existsSync(envPortPath)) {
  throw new Error(`File .env.port không tồn tại tại ${envPortPath}`);
}
dotenv.config({ path: envPortPath });

if (!process.env.HTTP_PORT || !process.env.HTTPS_PORT) {
  throw new Error('⚠️ Vui lòng set HTTP_PORT và HTTPS_PORT trong file .env.port');
}

const HTTP_PORT = parseInt(process.env.HTTP_PORT, 10);
const HTTPS_PORT = parseInt(process.env.VITE_API_PORT, 10);

// === Lấy LAN IP hiện tại ===
function detectLanIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}
const lanIP = detectLanIP();
console.log(`Detected LAN IP: ${lanIP}`);

// === Đường dẫn file .env.ip ===
const envIPPath = path.resolve(__dirname, '../.env.ip');

// === Thư mục cert/key ===
const CERT_DIR = 'D:/certs';
if (!fs.existsSync(CERT_DIR)) fs.mkdirSync(CERT_DIR, { recursive: true });

const certFile = path.join(CERT_DIR, 'server-cert.pem').replace(/\\/g, '/');
const keyFile = path.join(CERT_DIR, 'server-key.pem').replace(/\\/g, '/');

// === Hàm generate cert ===
async function generateCert(ip) {
  console.log(`⚙️ Creating SSL certificate for localhost and ${ip}...`);

  await execa('mkcert', [
    '-cert-file', certFile,
    '-key-file', keyFile,
    'localhost',
    ip
  ], { stdio: 'inherit' });

  console.log(`✅ Certificate created for: localhost, ${ip}`);
}

// === Kiểm tra và regenerate nếu IP thay đổi ===
async function ensureCert() {
  let oldIP = null;

  if (fs.existsSync(envIPPath)) {
    const content = fs.readFileSync(envIPPath, 'utf8');
    const match = content.match(/VITE_API_IP=(.+)/);
    if (match) oldIP = match[1].trim();
  }

  if (oldIP !== lanIP || !fs.existsSync(certFile) || !fs.existsSync(keyFile)) {
    console.log(`🔄 IP changed (${oldIP} → ${lanIP}) or cert missing. Regenerating cert...`);
    await generateCert(lanIP);
  } else {
    console.log(`✅ Using existing cert for IP ${lanIP}`);
  }

  // luôn cập nhật .env.ip cho frontend
  fs.writeFileSync(envIPPath, `VITE_API_IP=${lanIP}\n`);
  console.log(`📌 Updated .env.ip with ${lanIP}`);
}

await ensureCert();

const dbSchoolSurvey = client.db('school_survey');
const dbOnTheMove = client.db('on_the_move');
const dbTest = client.db('test');

app.use(cors({ origin: true, credentials: true }));
// phục vụ file audio
await client.connect();
console.log("✅ MongoDB connected");
app.use('/audio/school', express.static('D:/english/how_do_you_get_to_school'));
app.use('/audio/transport', express.static('D:/english/take_on_the_move'));
// route /api/dialogue (như hiện tại)
app.get('/api/dialogue', async (req, res) => {
  try {
    
    const db = dbSchoolSurvey;
    const messages = await db.collection('messages')
      .find({ conversation_id: "survey_2025_09" })
      .sort({ turn: 1 })
      .toArray();

    console.log("Messages length:", messages.length);
    console.log("First message sample:", messages[0]);

    const dialogue = messages.flatMap(msg =>
      (msg.audio_filename || []).map((file, i) => ({   // 👈 tránh undefined
        id: `${msg.turn}-${i}`,
        speaker: msg.speaker,
        text: i === 0 ? msg.text : "",
        audioSrc: `/audio/school/${file}`
      }))
    );

    res.json(dialogue);
  } catch (err) {
    console.error("Error in /api/dialogue:", err);
    res.status(500).send(err.toString());
  }
});

async function getMessagesWithAudio(db, ids) {
  const messages = await db.collection('messages')
    .find({ _id: { $in: ids.map(id => new ObjectId(id)) } })
    .sort({ turn: 1 })
    .toArray();

  return messages.flatMap(msg =>
    msg.audio_filename.map((file, i) => ({
      id: `${msg.turn}-${i}`,
      speaker: msg.speaker,
      text: i === 0 ? msg.text : "",
      audioSrc: `/audio/${file}`
    }))
  );
}

// --- route trả về survey kèm sections ---
app.get('/api/survey/:conversationId', async (req, res) => {
  try {
    
    const db = dbSchoolSurvey;

    const structure = await db.collection('survey_structure')
      .findOne({ conversation_id: req.params.conversationId });

    if (!structure) return res.status(404).send('Survey structure not found');

    const sections = {}; // JS thuần, không cần type

    for (const [sectionName, ids] of Object.entries(structure.sections)) {
      sections[sectionName] = await getMessagesWithAudio(db, ids); // bỏ "as any[]"
    }

    res.json({ conversation_id: structure.conversation_id, sections });

  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});
// --- route trả về means_of_transport ---
// route trả về means_of_transport (db test)
app.get('/api/means_of_transport/:conversationId', async (req, res) => {
  try {
    
    const db = dbTest;   // ⚡ DB test

    const messages = await db.collection('means_of_transport')
      .find({ conversation_id: req.params.conversationId })
      .sort({ turn: 1 })
      .toArray();

    if (!messages || messages.length === 0) {
      return res.status(404).send('No means_of_transport found');
    }

    const dialogue = messages.flatMap(msg => {
  const uniqueFiles = [...new Set(msg.audio_filename || [])]; // loại trùng
  return uniqueFiles.map((file, i) => ({
    id: `${msg.turn}-${i}`,
    speaker: msg.speaker,
    text: i === 0 ? msg.text : "",
    meaning_vi: i === 0 ? msg.meaning_vi : "",
    audioSrc: `/audio/transport/${file}`
  }));
});
    
    res.json(dialogue);

  } catch (err) {
    console.error("Error in /api/means_of_transport:", err);
    res.status(500).send(err.toString());
  }
});
// phục vụ file audio cho by_phuong_tien
app.use('/audio/by_phuong_tien', express.static('D:/english/by_phuong_tien'));

// --- route trả về by_phuong_tien ---
app.get('/api/by_phuong_tien/:conversationId', async (req, res) => {
  try {
    
    const db = dbOnTheMove; // ✅ dùng DB on_the_move

    const messages = await db.collection('by_phuong_tien')
      .find({ conversation_id: req.params.conversationId })
      .sort({ turn: 1 })
      .toArray();

    if (!messages || messages.length === 0) {
      return res.status(404).send('No by_phuong_tien found');
    }

    // map dữ liệu cho client
    const dialogue = messages.flatMap(msg =>
      (msg.audio_filename || []).map((file, i) => ({
        id: `${msg.turn}-${i}`,
        speaker: msg.speaker,
        text: i === 0 ? msg.text : "",
        meaning_vi: i === 0 ? msg.meaning_vi : "",
        audioSrc: `/audio/by_phuong_tien/${file}`
      }))
    );

    res.json(dialogue);

  } catch (err) {
    console.error("Error in /api/by_phuong_tien:", err);
    res.status(500).send(err.toString());
  }
});
app.use('/audio/how_to_use_a_bike', express.static('D:/english/how_to_use_a_bike'));
// --- route trả về how_to_use_a_bike ---
app.get('/api/how_to_use_a_bike/:conversationId', async (req, res) => {
  try {
    
    const db = dbOnTheMove; // DB mới bạn dùng

    const messages = await db.collection('how_to_use_a_bike')
      .find({ conversation_id: req.params.conversationId })
      .sort({ turn: 1 })
      .toArray();

    if (!messages || messages.length === 0) {
      return res.status(404).send('No how_to_use_a_bike data found');
    }

    // map ra dữ liệu client cần
    const dialogue = messages.flatMap(msg =>
      (msg.audio_filename || []).map((file, i) => ({
        id: `${msg.turn}-${i}`,
        speaker: msg.speaker,
        text: i === 0 ? msg.text : "",        // hiển thị text 1 lần
        meaning_vi: i === 0 ? msg.meaning_vi : "", // nghĩa tiếng Việt
        audioSrc: `/audio/how_to_use_a_bike/${file}` // thư mục chứa audio
      }))
    );

    res.json(dialogue);

  } catch (err) {
    console.error("Error in /api/how_to_use_a_bike:", err);
    res.status(500).send(err.toString());
  }
});
app.use('/audio/practice_to_use_a_bike', express.static('D:/english/pratice__to_use_a_bike'));
// --- route trả về practice_to_use_a_bike ---
app.get('/api/practice_to_use_a_bike/:conversationId', async (req, res) => {
  try {
    
    const db = dbOnTheMove;

    const messages = await db.collection('practice_to_use_a_bike')
      .find({ conversation_id: req.params.conversationId })
      .sort({ turn: 1 })
      .toArray();

    if (!messages || messages.length === 0) {
      return res.status(404).send('No practice_to_use_a_bike data found');
    }

    const dialogue = messages.flatMap(msg =>
      (msg.audio_filename || []).map((file, i) => ({
        id: `${msg.turn}-${i}`,
        speaker: msg.speaker,
        text: i === 0 ? msg.text : "",
        meaning_vi: i === 0 ? msg.meaning_vi : "",
        audioSrc: `/audio/practice_to_use_a_bike/${file}`
      }))
    );

    res.json(dialogue);

  } catch (err) {
    console.error("Error in /api/practice_to_use_a_bike:", err);
    res.status(500).send(err.toString());
  }
});
// phục vụ audio + hình ảnh cho vehicles
app.use('/audio/vehicles', express.static('D:/english/vehicle'));
app.use('/images/vehicles', express.static('D:/english/images'));

// --- route trả về toàn bộ vehicles ---
app.get('/api/vehicles', async (req, res) => {
  try {
    
    const db = dbOnTheMove;   // ✅ DB on_the_move
    const vehicles = await db.collection('vehicles')
      .find({})
      .sort({ word: 1 })
      .toArray();

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).send('No vehicles found');
    }

    const data = vehicles.map(v => ({
      id: v._id,
      word: v.word,
      meaning_vi: v.meaning_vi,
      category: v.category,
      audioSrc: v.audio_path ? v.audio_path.replace("D:/english/vehicle", "/audio/vehicles") : null,
      imageSrc: v.image_path ? v.image_path.replace("D:/english/images", "/images/vehicles") : null
    }));

    res.json(data);

  } catch (err) {
    console.error("Error in /api/vehicles:", err);
    res.status(500).send(err.toString());
  }
});
// phục vụ file audio cho in_the_sky_on_land_on_water
app.use('/audio/in_the_sky_on_land_on_water', express.static('D:/english/in_the_sky_on_land_on_water'));

// --- route trả về in_the_sky_on_land_on_water ---
app.get('/api/in_the_sky_on_land_on_water', async (req, res) => {
  try {
    const db = dbOnTheMove; // ✅ database on_the_move
    const items = await db.collection('in_the_sky_on_land_on_water')
      .find({})
      .sort({ word: 1 })
      .toArray();

    if (!items || items.length === 0) {
      return res.status(404).send('No in_the_sky_on_land_on_water data found');
    }

    // map dữ liệu để trả về client
    const data = items.map(v => ({
      id: v._id,
      word: v.word,
      sentence: v.sentence,
      meaning_vi: v.meaning_vi,
      category: v.category,
      audioSrc: v.audio_path
        ? v.audio_path.replace("D:/english/in_the_sky_on_land_on_water", "/audio/in_the_sky_on_land_on_water")
        : null
    }));

    res.json(data);

  } catch (err) {
    console.error("Error in /api/in_the_sky_on_land_on_water:", err);
    res.status(500).send(err.toString());
  }
});
// static file cho audio
app.use('/audio/like_vehicle', express.static('D:/english/like_vehicle'));

/**
 * GET /api/like_vehicle
 * Trả về tất cả hoặc lọc theo category
 * Ví dụ:
 *   - /api/like_vehicle  → tất cả
 *   - /api/like_vehicle?category=affirmative
 *   - /api/like_vehicle?category=negative
 *   - /api/like_vehicle?category=interrogative
 */
app.get("/api/like_vehicle", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const messages = await dbOnTheMove.collection("like_vehicle")
      .find(filter)
      .sort({ sentence: 1 })
      .toArray();

    if (!messages.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const dialogue = messages.map(msg => ({
      id: msg._id,
      sentence: msg.sentence,
      meaning_vi: msg.meaning_vi,
      category: msg.category,
      audioSrc: msg.audio_path
        ? msg.audio_path.replace("D:/english/like_vehicle", "/audio/like_vehicle")
        : null
    }));

    res.json(dialogue);
  } catch (err) {
    console.error("Error in /api/like_vehicle:", err);
    res.status(500).send("Internal Server Error");
  }
});
// serve audio files
app.use("/audio/take_ride_fly", express.static("D:/english/take_ride_fly"));

/**
 * GET /api/take_ride_fly
 * Trả về tất cả hoặc lọc theo category
 *   - /api/take_ride_fly
 *   - /api/take_ride_fly?category=take
 *   - /api/take_ride_fly?category=ride
 *   - /api/take_ride_fly?category=fly
 */
app.get("/api/take_ride_fly", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const messages = await dbOnTheMove.collection("take_ride_fly")
      .find(filter)
      .sort({ sentence: 1 })
      .toArray();

    if (!messages.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const dialogue = messages.map(msg => ({
      id: msg._id,
      sentence: msg.sentence,
      meaning_vi: msg.meaning_vi,
      category: msg.category,
      audioSrc: msg.audio_path
        ? msg.audio_path.replace("D:/english/take_ride_fly", "/audio/take_ride_fly")
        : null
    }));

    res.json(dialogue);
  } catch (err) {
    console.error("Error in /api/take_ride_fly:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.use('/audio/too_either', express.static('D:/english/Too_for_agreeing'));
// --- route trả về toàn bộ grammar "Too / Either for agreeing" ---
app.get("/api/grammar/too_either", async (req, res) => {
  try {
    const db = dbOnTheMove; // hoặc dbTest nếu bạn muốn
    const grammar = await db.collection("grammar")
      .findOne({ grammar_name: "Too / Either for agreeing" });

    if (!grammar) {
      return res.status(404).json({ message: "Grammar not found" });
    }

    // map audio path -> đổi sang endpoint /audio/too_either
    const mapAudio = (path) =>
      path ? path.replace("D:/english/Too_for_agreeing", "/audio/too_either") : null;

    // chuẩn hóa dữ liệu trả về
    const data = {
      grammar_name: grammar.grammar_name,
      type: grammar.type,
      statements: grammar.statements.map(s => ({
        ...s,
        audio_path: mapAudio(s.audio_path),
        agreeing: s.agreeing?.map(a => ({
          ...a,
          audio_path: mapAudio(a.audio_path)
        })),
        not_agreeing: s.not_agreeing?.map(na => ({
          ...na,
          audio_path: mapAudio(na.audio_path)
        }))
      })),
      examples: {
        agreeing: grammar.examples?.agreeing?.map(ex => ({
          sentences: ex.sentences.map(s => ({
            ...s,
            audio_path: mapAudio(s.audio_path)
          }))
        })),
        not_agreeing: grammar.examples?.not_agreeing?.map(ex => ({
          sentences: ex.sentences.map(s => ({
            ...s,
            audio_path: mapAudio(s.audio_path)
          }))
        }))
      }
    };

    res.json(data);

  } catch (err) {
    console.error("Error in /api/grammar/too_either:", err);
    res.status(500).send("Internal Server Error");
  }
});
// phục vụ ảnh và audio cho vocabulary_use_a_bike
app.use('/images/vocabulary_use_a_bike', express.static('D:/english/images'));
app.use('/audio/vocabulary_use_a_bike', express.static('D:/english/how_to_use_a_bike'));
// GET /api/vocabulary/:category
app.get("/api/vocabulary/:category", async (req, res) => {
  try {
    const db = dbOnTheMove; // hoặc dbTest, tuỳ bạn chọn DB
    const { category } = req.params;

    const vocab = await db.collection("vocabulary").findOne({ category });

    if (!vocab) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }

    const mapImage = (p) => p ? p.replace("D:/english/images", "/images/vocabulary_use_a_bike") : null;
    const mapAudio = (p) => p ? p.replace("D:/english/how_to_use_a_bike", "/audio/vocabulary_use_a_bike") : null;

    const data = vocab.items.map(item => ({
      word: item.word,
      meaning_vi: item.meaning_vi,
      imageSrc: mapImage(item.image_path),
      audioSrc: mapAudio(item.audio_path)
    }));

    res.json({
      topic: vocab.topic,
      category: vocab.category,
      items: data
    });

  } catch (err) {
    console.error("Error in /api/vocabulary:", err);
    res.status(500).send("Internal Server Error");
  }
});
// phục vụ file audio cho practice_to_use_a_bike_2
app.use('/audio/practice_to_use_a_bike_2', express.static('D:/english/practice_to_use_a_bike_2'));





// --- route trả về practice_to_use_a_bike_2 ---
// --- route trả về dữ liệu theo category ---
app.get('/api/practice/:category', async (req, res) => {
  try {
    const db = dbOnTheMove;

    const doc = await db.collection('practice')
      .findOne({ category: req.params.category });

    if (!doc) {
      return res.status(404).send(`No data found for category ${req.params.category}`);
    }

    // Convert đường dẫn tuyệt đối thành URL
    doc.items.forEach(item => {
      item.sentences.forEach(sentence => {
        if (sentence.audio_path) {
          // Lấy tên file
          const filename = sentence.audio_path.split('\\').pop().split('/').pop();
          // Gắn URL public
          sentence.audio_path = `/audio/${doc.category}/${filename}`;
        }
      });
    });

    res.json(doc);

  } catch (err) {
    console.error("Error in /api/practice/:category:", err);
    res.status(500).send(err.toString());
  }
});
// public audio
app.use('/audio/but_as_a_contrast', express.static('D:/english/but_as_a_contrast'));

// --- API trả về dữ liệu contrast ---
app.get('/api/contrast/:category', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const doc = await db.collection('contrast')
      .findOne({ category: req.params.category });

    if (!doc) {
      return res.status(404).send(`No data found for category ${req.params.category}`);
    }

    // chuẩn hóa đường dẫn public
    doc.items.forEach(item => {
      if (item.audio_path) {
        const filename = item.audio_path.split('\\').pop().split('/').pop();
        item.audio_path = `/audio/${doc.category}/${filename}`;
      }
    });

    res.json(doc);

  } catch (err) {
    console.error("Error in /api/contrast/:category:", err);
    res.status(500).send(err.toString());
  }
});

// Public audio
app.use('/audio/say_fast', express.static('D:/english/say_fast'));

// --- API trả về dữ liệu say_fast ---
app.get('/api/say_fast/:category', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const doc = await db.collection('say_fast')
      .findOne({ category: req.params.category });

    if (!doc) {
      return res.status(404).send(`No data found for category ${req.params.category}`);
    }

    // chuẩn hóa đường dẫn public
    doc.items.forEach(item => {
      if (item.audio_path) {
        const filename = item.audio_path.split('\\').pop().split('/').pop();
        item.audio_path = `/audio/${doc.category}/${filename}`;
      }
    });

    res.json(doc);

  } catch (err) {
    console.error("Error in /api/say_fast/:category:", err);
    res.status(500).send(err.toString());
  }
});
// Public audio
app.use('/audio/how_kids_school', express.static('D:/english/How_Kids_Go_to_School_Around_the_World'));

// --- API trả về dữ liệu ---
app.get('/api/how_kids_school/:category', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const doc = await db.collection('how_kids_school')
      .findOne({ category: req.params.category });

    if (!doc) {
      return res.status(404).send(`No data found for category ${req.params.category}`);
    }

    // chuẩn hóa path
    doc.items.forEach(item => {
      if (item.audio_path) {
        const filename = item.audio_path.split('\\').pop().split('/').pop();
        item.audio_path = `/audio/${doc.category}/${filename}`;
      }
    });

    res.json(doc);

  } catch (err) {
    console.error("Error in /api/how_kids_school/:category:", err);
    res.status(500).send(err.toString());
  }
});
// phục vụ audio + hình ảnh cho example_vehicles
// app.use('/audio/example_vehicles', express.static('D:/english/vehicle'));
app.use('/images/example_vehicles', express.static('D:/english/images'));
// phục vụ audio chính của từ vựng
app.use('/audio/example_vehicles', express.static('D:/english/vehicle'));

// phục vụ audio của ví dụ
app.use('/audio/example_vehicles/examples', express.static('D:/english/example_vehicle'));


// --- route trả về toàn bộ example_vehicles ---
app.get('/api/example_vehicles', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const vehicles = await db.collection('example_vehicles')
      .find({})
      .sort({ word: 1 })
      .toArray();

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).send('No example_vehicles found');
    }

    const data = vehicles.map(v => ({
      id: v._id,
      word: v.word,
      meaning_vi: v.meaning_vi,
      category: v.category,
      audioSrc: v.audio_path
        ? v.audio_path.replace("D:/english/vehicle", "/audio/example_vehicles")
        : null,
      imageSrc: v.image_path
        ? v.image_path.replace("D:/english/images", "/images/example_vehicles")
        : null,
      examples: (v.examples || []).map(ex => ({
        sentence: ex.sentence,
        audioSrc: ex.audio_path
          ? ex.audio_path.replace("D:/english/example_vehicle", "/audio/example_vehicles/examples")
          : null
      }))
    }));

    res.json(data);

  } catch (err) {
    console.error("Error in /api/example_vehicles:", err);
    res.status(500).send(err.toString());
  }
});

// --- route trả về 1 phương tiện cụ thể theo word ---
app.get('/api/example_vehicles/:word', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const vehicle = await db.collection('example_vehicles')
      .findOne({ word: req.params.word });

    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }

    const data = {
      id: vehicle._id,
      word: vehicle.word,
      meaning_vi: vehicle.meaning_vi,
      category: vehicle.category,
      audioSrc: vehicle.audio_path
        ? vehicle.audio_path.replace("D:/english/vehicle", "/audio/example_vehicles")
        : null,
      imageSrc: vehicle.image_path
        ? vehicle.image_path.replace("D:/english/images", "/images/example_vehicles")
        : null,
      examples: (vehicle.examples || []).map(ex => ({
        sentence: ex.sentence,
        audioSrc: ex.audio_path
          ? ex.audio_path.replace("D:/english/example_vehicle", "/audio/example_vehicles/examples")
          : null
      }))
    };

    res.json(data);

  } catch (err) {
    console.error("Error in /api/example_vehicles/:word:", err);
    res.status(500).send(err.toString());
  }
});
// --- route kiểm tra audio của example_vehicles ---
app.get('/api/example_vehicles/check_audio', async (req, res) => {
  const vehicles = await dbOnTheMove.collection('example_vehicles').find({}).toArray();
  const result = [];
  for (const v of vehicles) {
    if (v.audio_path) {
      result.push({
        word: v.word,
        file: v.audio_path,
        exists: fs.existsSync(v.audio_path)
      });
    }
    for (const ex of v.examples || []) {
      if (ex.audio_path) {
        result.push({
          word: v.word,
          sentence: ex.sentence,
          file: ex.audio_path,
          exists: fs.existsSync(ex.audio_path)
        });
      }
    }
  }
  res.json(result);
});
// Phục vụ file tĩnh
// Phục vụ file tĩnh
app.use('/audio/hot_air_balloon', express.static('D:/english/Hot_Air_Balloons'));
app.use('/images/hot_air_balloon', express.static('D:/english/images'));

// --- API trả về dữ liệu hot_air_balloon ---
app.get('/api/hot_air_balloon/:category', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const { category } = req.params;

    // Lấy document duy nhất hot-air-balloons
    const doc = await db.collection('hot_air_balloons')
      .findOne({ slug: "hot-air-balloons" });

    if (!doc) {
      return res.status(404).json({ message: "No hot_air_balloon document found" });
    }

    // Chuẩn hóa path ảnh và audio (dùng encodeURIComponent để tránh lỗi khi có space, dấu phẩy)
    const mapImage = (filename) =>
      filename ? `/images/hot_air_balloon/${encodeURIComponent(filename)}` : null;

    const mapAudio = (filename) =>
      filename ? `/audio/hot_air_balloon/${encodeURIComponent(filename)}` : null;

    let result = null;

    // Map theo category
    switch (category) {
      case "reading":
        result = doc.transcript.map(item => ({
          ...item,
          audioSrc: mapAudio(item.audio)
        }));
        break;

      case "vocabulary":
        result = doc.vocabulary.map(item => ({
          ...item,
          imageSrc: mapImage(item.image_filename),
          audioSrc: mapAudio(item.audio)
        }));
        break;

      case "exercises":
        result = doc.exercises;
        break;

      case "weird_but_true":
        result = {
          ...doc.weird_but_true,
          audioSrc: mapAudio(doc.weird_but_true.audio)
        };
        break;

      case "files":
        result = {
          imageSrc: mapImage(doc.files.image_filename),
          audioFolder: "/audio/hot_air_balloon",
          vocabAudioFolder: "/audio/hot_air_balloon/vocabulary"
        };
        break;

      default:
        return res.status(400).json({ message: `Invalid category: ${category}` });
    }

    res.json(result);

  } catch (err) {
    console.error("Error in /api/hot_air_balloon/:category:", err);
    res.status(500).send("Internal Server Error");
  }
});
// ---- Phục vụ file tĩnh ----
app.use('/audio/catch_the_bus', express.static('D:/english/Catch the Bus in Curitiba'));
app.use('/images/catch_the_bus', express.static('D:/english/images'));
// ---- Phục vụ file tĩnh ----
app.get('/api/catch_the_bus/:category', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const { category } = req.params;

    console.log("API /catch_the_bus called with category:", category);

    const doc = await db.collection('CatchTheBusInCuritiba')
      .findOne({ slug: "catch-the-bus-in-curitiba" });

    if (!doc) {
      console.error("Document not found in DB");
      return res.status(404).json({ message: "No catch_the_bus document found" });
    }

    const mapImage = (filename) => filename ? `/images/catch_the_bus/${filename}` : null;
    const mapAudio = (filename) => filename ? `/audio/catch_the_bus/${filename}` : null;

    let result = null;

    switch (category) {
      case "reading":
        result = doc.transcript.map(item => ({
          ...item,
          audioSrc: mapAudio(item.audio)
        }));
        break;

      case "vocabulary":
        result = doc.vocabulary.map(item => ({
          ...item,
          imageSrc: mapImage(item.image_filename),
          audioSrc: mapAudio(item.audio)
        }));
        break;

      case "files":
        result = {
          imageSrc: mapImage(doc.files.image_filename),
          audioFolder: "/audio/catch_the_bus",
          vocabAudioFolder: "/audio/catch_the_bus/vocabulary"
        };
        break;

      default:
        return res.status(400).json({ message: `Invalid category: ${category}` });
    }

    res.json(result);

  } catch (err) {
    console.error("Error in /api/catch_the_bus/:category:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ---- Phục vụ file tĩnh ----
app.use('/audio/the_lion_and_the_mouse', express.static('D:/english/The Lion and the Mouse'));
app.use('/images/the_lion_and_the_mouse', express.static('D:/english/images'));

// ---- API The Lion and the Mouse ----
app.get('/api/the_lion_and_the_mouse/:category', async (req, res) => {
  try {
    const db = dbOnTheMove;
    const { category } = req.params;

    console.log("API /the_lion_and_the_mouse called with category:", category);

    const doc = await db.collection('The_Lion_and_the_Mouse')
      .findOne({ slug: "the-lion-and-the-mouse" });

    if (!doc) {
      console.error("Document not found in DB");
      return res.status(404).json({ message: "No the_lion_and_the_mouse document found" });
    }

    const mapImage = (filename) => filename ? `/images/the_lion_and_the_mouse/${filename}` : null;
    const mapAudio = (filename) => filename ? `/audio/the_lion_and_the_mouse/${filename}` : null;

    let result = null;

    switch (category) {
      case "reading":
        result = doc.transcript.map(item => ({
          ...item,
          audioSrc: mapAudio(item.audio)
        }));
        break;

      case "vocabulary":
        result = doc.vocabulary.map(item => ({
          ...item,
          imageSrc: mapImage(item.image),
          audioSrc: mapAudio(item.audio)
        }));
        break;

      case "files":
        result = {
          imageSrc: mapImage(doc.files.image_filename),
          audioFolder: "/audio/the_lion_and_the_mouse",
          vocabAudioFolder: "/audio/the_lion_and_the_mouse/vocabulary"
        };
        break;

      case "exercises":
        result = {
          ...doc.exercises,
          order_story: {
            ...doc.exercises.order_story,
            instructionsAudio: mapAudio(doc.exercises.order_story.instructions_audio),
            sentences: doc.exercises.order_story.sentences.map((s, i) => ({
              text: s,
              audioSrc: mapAudio(doc.exercises.order_story.sentences_audio[i])
            }))
          },
          describe_animals: {
            ...doc.exercises.describe_animals,
            tables: doc.exercises.describe_animals.tables.map(t => ({
              ...t,
              imageSrc: mapImage(t.image_filename),
              example_sentences: t.example_sentences.map(e => ({
                text: typeof e === "string" ? e : e.text,
                audioSrc: mapAudio(typeof e === "string" ? null : e.audio)
              }))
            }))
          },
          express_yourself: {
            ...doc.exercises.express_yourself,
            activities: doc.exercises.express_yourself.activities.map(a => ({
              ...a,
              audioSrc: mapAudio(a.audio)
            }))
          }
        };
        break;

      default:
        return res.status(400).json({ message: `Invalid category: ${category}` });
    }

    res.json(result);

  } catch (err)
 {
    console.error("Error in /api/the_lion_and_the_mouse/:category:", err);
    res.status(500).send("Internal Server Error");
  }
});
// ---- Phục vụ file tĩnh ----
const dbUnit4_Our_Senses = client.db('Unit4_Our_Senses');

// Serve static files
// Serve static files
// Serve static files
// Phục vụ tất cả ảnh từ D:/english/images
app.use('/images', express.static('D:/english/images'));
app.use('/audio/unit4_our_senses/vocabulary1', express.static('D:/english/Unit4_Our_Senses/Vocabulary1'));
app.use('/audio/unit4_our_senses/vocabulary2', express.static('D:/english/Unit4_Our_Senses/Vocabulary2'));
app.use('/audio/unit4_our_senses/song', express.static('D:/english/Unit4_Our_Senses/Song'));
app.use('/audio/unit4_our_senses/grammar1', express.static('D:/english/Unit4_Our_Senses/Grammar1'));
app.use('/images/unit4_our_senses', express.static('D:/english/images'));
app.use('/audio/unit4_our_senses/grammar2', express.static('D:/english/Unit4_Our_Senses/Grammar2'));
app.use('/audio/unit4_our_senses/reading', express.static('D:/english/Unit4_Our_Senses/READING'));
app.use('/audio/unit4_our_senses/WB_Vocabulary1', express.static('D:/english/Unit4_Our_Senses/WB_Vocabulary1'));
app.use(
  '/audio/unit4_our_senses/Vocabulary2',express.static('D:/english/Unit4_Our_Senses/WB_Vocabulary1')
);
app.use('/audio/Unit5_Animal_Habitats/Vocabulary1', express.static('D:/english/Unit5_Animal_Habitats/Vocabulary1'));
app.use('/audio', express.static('D:/english/Unit4_Our_Senses/Spin'));

// ---- THÊM: workbook audio + images ----
// phục vụ toàn bộ thư mục Workbook (cách đơn giản)
app.use('/audio/unit4_our_senses/workbook', express.static('D:/english/Unit4_Our_Senses/WB_Vocabulary1'));


// hoặc nếu bạn muốn tách theo từng loại (như vocabulary1, song, ...)
app.use('/audio/unit4_our_senses/workbook/vocabulary1', express.static('D:/english/Unit4_Our_Senses/Workbook/Vocabulary1'));
app.use('/audio/unit4_our_senses/workbook/song',        express.static('D:/english/Unit4_Our_Senses/Workbook/Song'));
app.use('/audio/unit4_our_senses/workbook/grammar1',    express.static('D:/english/Unit4_Our_Senses/Workbook/Grammar1'));
app.use('/audio/english/Unit6_What_is_for_Dinner/audio',    express.static('D:/english/Unit6_What_is_for_Dinner/audio'));
app.use('/audio/english/Unit7_Feeling_Fit/audio',    express.static('D:/english/Unit7_Feeling_Fit/audio'));
app.use('/audio/english/Unit7_Feeling_Fit/words_question',    express.static('D:/english/Unit7_Feeling_Fit/audio'));
app.use('/audio/english/Unit7_Feeling_Fit/words_answer',    express.static('D:/english/Unit7_Feeling_Fit/audio'));
app.use('/audio/unit8/vocab1',    express.static('D:/english/Unit8_Celebrateuse/audio'));

app.use('/audio/unit8',    express.static('D:/english/Unit8_Celebrateuse/audio'));
app.use('/audio/english/Unit8/Grammar1',    express.static('D:/english/Unit8_Celebrateuse/audio'));

app.use('/audio/english/Scramble',    express.static('D:/english/Scramble'));
app.use('/audio/english/Unit8_Celebrations/audio',    express.static('D:/english/Unit8_Celebrateuse/audio'));


app.use('/audio/english/Unit8/Grammar1/words_answer',    express.static('D:/english/Unit8_Celebrateuse/audio'));
app.use('/audio/english/Unit8/Grammar2/words_question',    express.static('D:/english/Unit8_Celebrateuse/audio'));
app.use('/audio/english/Unit8/Grammar2/words_answer',    express.static('D:/english/Unit8_Celebrateuse/audio'));
app.use('/audio/english/Unit8/Grammar2/words_answer',    express.static('D:/english/Unit8_Celebrateuse/audio'));
app.use('/audio/english/Unit8_Reading/audio',    express.static('D:/english/Unit8_Celebrateuse/audio'));

app.use('/audio/english/Unit8_Writing/audio',    express.static('D:/english/Unit8_Celebrateuse/audio'));
app.use('/audio/unit8/workbook',    express.static('D:/english/Unit8_Celebrateuse/audio'));
app.use('/audio/unit9',    express.static('D:/english/Unit9_My_Weekend/audio'));
app.use('/audio/unit1',    express.static('D:/english/Unit1_A_Helping_Hand/audio'));
app.use('/audio/unit2',    express.static('D:/english/Unit2_My_Place_in_the_World/audio'));
// phục vụ ảnh cho workbook
app.use('/images/unit4_our_senses/workbook', express.static('D:/english/images'));
// Phục vụ tất cả ảnh
app.use('/images', express.static('D:/english/images'));


app.get('/audio/win', (req, res) => {
  res.sendFile('D:/sound/winner.mp3');
});
app.get('/audio/lose', (req, res) => {
  res.sendFile('D:/sound/lose.mp3');
});
app.get('/audio/level_up', (req, res) => {
  res.sendFile('D:/sound/level_up.mp3');
});
app.get('/audio/star', (req, res) => {
  res.sendFile('D:/sound/level_up.mp3');
});
// ---- API cho Unit4 Our Senses ----
app.get('/api/unit4_our_senses/:category', async (req, res) => {
  try {
    const db = dbUnit4_Our_Senses;
    const { category } = req.params;

    console.log("API /unit4_our_senses called with category:", category);

    // helper để map audio/image
    const mapImage = (filename) => filename ? `/images/unit4_our_senses/${filename}` : null;
    const mapAudio = (folder, filename) => filename ? `/audio/unit4_our_senses/${folder}/${filename}` : null;

    let result = null;

    switch (category) {
      case "vocabulary": {
        const doc = await db.collection('Vocabulary1')
          .findOne({ slug: "unit4-our-senses-vocabulary1" });

        if (!doc) return res.status(404).json({ message: "No vocabulary found" });

        result = {
          vocabulary: doc.vocabulary.map(item => ({
            ...item,
            imageSrc: mapImage(item.image),
            audioSrc: mapAudio("vocabulary1", item.audio)
          })),
          describe_guess: {
            instructions: doc.describe_guess.instructions,
            items: doc.describe_guess.items.map(it => ({
              ...it,
              imageSrc: mapImage(it.image),
              audioSrc: mapAudio("vocabulary1", it.audio),
              example: {
                ...it.example,
                audioSrc: mapAudio("vocabulary1", it.example.audio)
              }
            }))
          }
        };
        break;
      }

      case "describe_guess": {
        const doc = await db.collection('Vocabulary1')
          .findOne({ slug: "unit4-our-senses-vocabulary1" });

        if (!doc) return res.status(404).json({ message: "No describe_guess found" });

        result = doc.describe_guess.items.map(item => ({
          word: item.word,
          imageSrc: mapImage(item.image),
          audioSrc: mapAudio("vocabulary", item.audio),
          example: item.example ? {
            text: item.example.text,
            audioSrc: mapAudio("vocabulary", item.example.audio)
          } : null
        }));
        break;
      }

      case "song": {
        const doc = await db.collection('songs')
          .findOne({ song_name: "Our Senses" });

        if (!doc) return res.status(404).json({ message: "No song found" });

        result = {
          song_name: doc.song_name,
          unit: doc.unit,
          audioSrc: mapAudio("song", doc.file_name),
          lyrics: doc.lyrics
        };
        break;
      }

      case "grammar1": {
        const doc = await db.collection('Grammar1')
          .findOne({ slug: "unit4-our-senses-grammar1" });

        if (!doc) return res.status(404).json({ message: "No grammar1 found" });

        // gom exercises
        const exercises = [];

        // Exercise 1
        if (doc.exercise) {
          exercises.push({
            type: "exercise1",
            ...doc.exercise,
            questions: doc.exercise.questions.map(q => ({
              ...q,
              audioSrc: q.audio ? mapAudio("grammar1", q.audio) : null,
              imageSrc: q.image ? mapImage(q.image.split('/').pop()) : null
            }))
          });
        }

        // Exercise 2
        if (doc.exercise2) {
          exercises.push({
            type: "exercise2",
            ...doc.exercise2,
            sample: {
              ...doc.exercise2.sample,
              audioSrc: mapAudio("grammar1", doc.exercise2.sample.audio)
            },
            suggested_answers: doc.exercise2.suggested_answers.map(ans => ({
              ...ans,
              audioSrc: mapAudio("grammar1", ans.audio)
            })),
            imageSrc: doc.exercise2.image ? mapImage(doc.exercise2.image.split('/').pop()) : null
          });
        }

        // Exercise 3
        if (doc.exercise3) {
          exercises.push({
            type: "exercise3",
            ...doc.exercise3,
            sample: {
              ...doc.exercise3.sample,
              audioSrc: mapAudio("grammar1", doc.exercise3.sample.audio)
            },
            examples: doc.exercise3.examples.map(ex => ({
              ...ex,
              audioSrc: mapAudio("grammar1", ex.audio)
            }))
          });
        }

        result = {
          grammar_name: doc.grammar_name,
          introduction: {
            ...doc.introduction,
            audioSrc: mapAudio("grammar1", doc.introduction.audio)
          },
          items: doc.items.map(item => ({
            ...item,
            audioSrc: mapAudio("grammar1", item.audio)
          })),
          exercises
        };
        break;
      }
      case "vocabulary2": {
        const doc = await db.collection('Vocabulary2')
          .findOne({ slug: "unit4-our-senses-vocabulary2" });

        if (!doc) return res.status(404).json({ message: "No vocabulary2 found" });

        result = {
          title: doc.title,
          vocabulary: doc.vocabulary.map(item => ({
            ...item,
            imageSrc: mapImage(item.image),
            audioSrc: mapAudio("vocabulary2", item.audio),
            example: item.example ? {
              text: item.example.text,
              audioSrc: mapAudio("vocabulary2", item.example.audio)
            } : null
          })),
          exercise1: {
            ...doc.exercise1,
            questions: doc.exercise1.questions.map(q => ({
              ...q,
              audioSrc: q.audio ? mapAudio("vocabulary2", q.audio) : null
            }))
          },
          exercise2: {
            ...doc.exercise2,
            groups: doc.exercise2.groups.map(g => ({
              ...g,
              imageSrc: mapImage(g.image),
              items: g.items.map(i => ({
                ...i,
                audioSrc: mapAudio("vocabulary2", i.audio)
              }))
            }))
          },
          files: {
            imageFolder: "/images/unit4_our_senses",
            audioFolder: "/audio/unit4_our_senses/vocabulary2"
          }
        };
        break;
      }
      case "grammar2": {
        const doc = await db.collection('Grammar2')
          .findOne({ slug: "unit4-our-senses-grammar2" });

        if (!doc) return res.status(404).json({ message: "No grammar2 found" });

        result = {
          title: doc.title,
          grammar_name: doc.grammar_name,
          introduction: {
            ...doc.introduction,
            audioSrc: mapAudio("grammar2", doc.introduction.audio),
            imageSrc: mapImage(doc.introduction.image)
          },
          items: (doc.items || []).map(item => ({
            ...item,
            audioSrc: mapAudio("grammar2", item.audio),
            imageSrc: mapImage(item.image),
            example: {
              ...item.example,
              audioSrc: mapAudio("grammar2", item.example.audio),
              imageSrc: mapImage(item.example.image)
            }
          })),
          exercise1: (doc.exercise1 && doc.exercise1.questions) ? {
            ...doc.exercise1,
            questions: doc.exercise1.questions.map(q => ({
              ...q,
              audioSrc: mapAudio("grammar2", q.audio),
              imageSrc: mapImage(q.image),
              answer: {
                ...q.answer,
                audioSrc: mapAudio("grammar2", q.answer.audio),
                imageSrc: mapImage(q.answer.image)
              }
            }))
          } : null,
          exercise2: (doc.exercise2 && doc.exercise2.questions) ? {
            ...doc.exercise2,
            questions: doc.exercise2.questions.map(q => ({
              ...q,
              audioSrc: mapAudio("grammar2", q.audio),
              imageSrc: mapImage(q.image)
            }))
          } : null,
          exercise3: doc.exercise3 ? {
            ...doc.exercise3,
            sample: {
              ...doc.exercise3.sample,
              audioSrc: mapAudio("grammar2", doc.exercise3.sample.audio),
              imageSrc: mapImage(doc.exercise3.sample.image)
            }
          } : null,
        };
        break;
      }
      case "reading": {
        const doc = await db.collection('Reading')
          .findOne({ slug: "unit4-our-senses-reading" });

        if (!doc) return res.status(404).json({ message: "No reading found" });

        result = {
          title: doc.title,
          passage_name: doc.passage_name,
          content: doc.content.map(item => ({
            ...item,
            audioSrc: mapAudio("reading", item.audio),
            imageSrc: mapImage(item.image)
          })),
          vocabulary: (doc.vocabulary || []).map(item => ({
            ...item,
            audioSrc: mapAudio("reading", item.audio),
            imageSrc: mapImage(item.image)
          })),
          exercises: (doc.exercises || []).map(ex => {
            if (ex.type === "true_false") {
              return {
                ...ex,
                questions: ex.questions
              };
            }
            if (ex.type === "table_fill") {
              return {
                ...ex,
                columns: ex.columns,
                rows: ex.rows
              };
            }
            if (ex.type === "speaking") {
              return {
                ...ex,
                prompts: ex.prompts
              };
            }
            return ex;
          }),
          files: {
            imageFolder: "/images/unit4_our_senses",
            audioFolder: "/audio/unit4_our_senses/reading"
          }
        };
        break;
      } 
      case "writing": {
        const doc = await db.collection('Writing')
          .findOne({ slug: "unit4-our-senses-writing" });

        if (!doc) return res.status(404).json({ message: "No writing found" });

        result = {
          title: doc.title,
          introduction: doc.introduction,
          passage: {
            text: doc.passage.text,
            imageSrc: mapImage(doc.passage.image)
          },
          instructions: doc.instructions,
          exercises: (doc.exercises || []).map(ex => ({
            ...ex,
            sentences: ex.sentences ? ex.sentences.map(s => ({
              ...s,
              underline: s.underline || false
            })) : []
          })),
          files: {
            imageFolder: "/images/unit4_our_senses"
          }
        };
        break;
      }
      case 'spin_tab_data': {
                const spinData = await db.collection('Workbook').findOne({ slug: "workbook-spin-wheel-vocab" });
                if (!spinData) return res.status(404).json({ message: "Spin tab data not found" });
                result = spinData;
                break;
            }
       case 'spin_tab_data_tobe': {
                const spinData = await db.collection('Workbook').findOne({ slug: "workbook-spin-wheel-to-be" });
                if (!spinData) return res.status(404).json({ message: "Spin 'to be' data not found" });
                result = spinData;
                break;
            }      
      case 'spin_tab_data_taste': {
                const spinData = await db.collection('Workbook').findOne({ slug: "workbook-spin-wheel-taste" });
                if (!spinData) return res.status(404).json({ message: "Spin 'taste' data not found" });
                result = spinData;
                break;
            }      



      case "files":
      result = {
        imageFolder: "/images/unit4_our_senses",
        audioFolders: {
          vocabulary1: "/audio/unit4_our_senses/vocabulary1",
          vocabulary2: "/audio/unit4_our_senses/vocabulary2",
          song: "/audio/unit4_our_senses/song",
          grammar1: "/audio/unit4_our_senses/grammar1",
          grammar2: "/audio/unit4_our_senses/grammar2"
        }
      };
      break;


      default:
        return res.status(400).json({ message: `Invalid category: ${category}` });
    }

    res.json(result);

  } catch (err) {
    console.error("Error in /api/unit4_our_senses/:category:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/api/unit4_our_senses/workbook/:activityType', async (req, res) => {
  try {
    const db = dbUnit4_Our_Senses;
    const { activityType } = req.params;

    console.log("API /unit4_our_senses/workbook called with:", activityType);

    // helper
    // helper
    const mapImage = (filename) =>
      filename ? `/images/unit4_our_senses/${filename}` : null;

    const mapAudio = (filename) =>
      filename ? `/audio/unit4_our_senses/workbook/${filename}` : null;

    let result = null;

    switch (activityType) {
      case "circle_activity": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-vocabulary1-workbook" });

        if (!doc) return res.status(404).json({ message: "No circle activity found" });

        result = {
          title: doc.title,
          instruction: doc.instruction,
          items: doc.items.map(item => ({
            ...item,
            imageSrc: mapImage(item.image)
          })),
          files: doc.files
        };
        break;
      }

      case "listen_write": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-vocabulary1-listenwrite" });

        if (!doc) return res.status(404).json({ message: "No listen_write activity found" });

        result = {
          title: doc.title,
          instruction: doc.instruction,
          words: doc.words,
          sentences: doc.sentences.map(s => ({
            ...s,
            audioSrc: mapAudio(s.audio),
            imageSrc: mapImage(s.image)
          })),
          files: doc.files
        };
        break;
      }

      case "match_activity": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-vocabulary1-match" });

        if (!doc) return res.status(404).json({ message: "No match activity found" });

        result = {
          title: doc.title,
          instruction: doc.instruction,
          items: doc.items.map(i => ({
            ...i,
            imageSrc: mapImage(i.image)
          })),
          files: doc.files
        };
        break;
      }

      case "song_match": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-song-match" });

        if (!doc) return res.status(404).json({ message: "No song match activity found" });

        result = {
          _id: doc._id,
          slug: doc.slug,
          unit: doc.unit,
          section: doc.section,
          type: doc.type,
          title: doc.title,
          instruction: doc.instruction,
          audioSrc: doc.audio || null,
          items: doc.items,
          files: doc.files
        };
        break;
      }

      case "song_write": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-song-write" });

        if (!doc) return res.status(404).json({ message: "No song write activity found" });

        result = {
          title: doc.title,
          instruction: doc.instruction,
          words: doc.words.map(w => ({
            ...w,
            imageSrc: mapImage(w.image)
          })),
          adjectives: doc.adjectives,
          sentencePatterns: doc.sentencePatterns,
          files: doc.files
        };
        break;
      }

      case "grammar1": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-grammar1" });
          

        if (!doc) return res.status(404).json({ message: "No grammar1 workbook found" });

        result = {
          title: doc.title,
          instruction: doc.instruction,
          tables: doc.tables
        };
        break;
      }

      case "grammar1_match": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-grammar1-look-match" });

        if (!doc) return res.status(404).json({ message: "No grammar1 match workbook found" });

        result = {
          title: doc.title,
          instruction: doc.instruction,
          items: doc.items.map(item => ({
            ...item,
            imageSrc: `${doc.files.imageFolder}/${item.imageLabel}.jpg`
          })),
          files: doc.files
        };
        break;
      }
      case "unscramble_sentences": {
            const doc = await db.collection('Workbook')
                .findOne({ slug: "unit4-our-senses-unscramble-sentences" });

            if (!doc) return res.status(404).json({ message: "No unscramble sentences workbook found" });

            // Map audio và image từ folder server sang URL
            const result = {
                title: doc.title,
                instruction: doc.instruction,
                sentences: doc.sentences.map(s => ({
                    ...s,
                    audioSrc: s.audio ? `${doc.files.audioFolder}/${s.audio}` : null,
                    imageSrc: s.imageSrc ? s.imageSrc : null
                })),
                files: doc.files
            };

            res.json(result);
            break;
        }
      case "read_write": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-read-write" });

        if (!doc) return res.status(404).json({ message: "No read_write workbook found" });

        result = {
          title: doc.title,
          instruction: doc.instruction,
          sentences: doc.sentences.map(s => ({
            ...s,
            imageSrc: mapImage(s.imageSrc.split('/').pop()),       // lấy tên file
            questionAudioSrc: mapAudio(s.questionAudio),
            answerAudioSrc: mapAudio(s.answerAudio)
          })),
          files: doc.files
        };
        break;
      }
      case "look_smell_taste": {
  const doc = await db.collection('Workbook')
    .findOne({ slug: "unit4-our-senses-look-smell-taste" });

  if (!doc) return res.status(404).json({ message: "No look_smell_taste workbook found" });

    result = {
      title: doc.title,
      instruction: doc.instruction,
      adjectives: {
        look: doc.adjectives.look.map(a => ({
          ...a,
          audioSrc: a.audio ? `${doc.files.audioFolder}/${a.audio}` : null
        })),
        smell: doc.adjectives.smell.map(a => ({
          ...a,
          audioSrc: a.audio ? `${doc.files.audioFolder}/${a.audio}` : null
        })),
        taste: doc.adjectives.taste.map(a => ({
          ...a,
          audioSrc: a.audio ? `${doc.files.audioFolder}/${a.audio}` : null
        }))
      },
      examples: doc.examples.map(e => ({
        ...e,
        imageSrc: e.imageSrc ? `${doc.files.imageFolder}/${e.imageSrc.split('/').pop()}` : null,
        questionAudioSrc: e.questionAudio ? `${doc.files.audioFolder}/${e.questionAudio}` : null,
        answerAudioSrc: e.answerAudio ? `${doc.files.audioFolder}/${e.answerAudio}` : null
      })),
      files: doc.files
    };
    break;
  }
  case "vocabulary2_read_write": {
  const doc = await db.collection("Workbook")
    .findOne({ slug: "unit4-our-senses-vocabulary2-read-write" });

  if (!doc) {
    return res.status(404).json({ message: "No vocabulary2 read_write workbook found" });
  }

  result = {
    title: doc.title,
    instruction: doc.instruction,
    sentences: doc.sentences.map(s => ({
      id: s.id,
      sentence: s.sentence,
      answer: s.answer,
      meaning: s.meaning,
      imageSrc: mapImage(s.imageSrc.split("/").pop()), // chỉ lấy tên file rồi map lại
      questionAudioSrc: mapAudio(s.questionAudio),
      answerAudioSrc: mapAudio(s.answerAudio)
    })),
    files: doc.files
  };
  break;
}

      case "vocabulary2_sort_words": {
        const doc = await db.collection("Workbook")
          .findOne({ slug: "unit4-our-senses-vocabulary2-sort-words" });

        if (!doc) {
          return res.status(404).json({ message: "No vocabulary2 sort words workbook found" });
        }

        result = {
          title: doc.title,
          instruction: doc.instruction,
          words: doc.words.map(w => ({
            word: w.word,
            imageSrc: `${doc.files.imageFolder}/${w.imageSrc.split("/").pop()}`,
            examples: w.examples.map(ex => ({
              sentence: ex.sentence,
              meaning: ex.meaning,
              audioSrc: `${doc.files.audioFolder}/${ex.audio}`
            }))
          })),
          categories: doc.categories,
          files: doc.files
        };
        break;
      }
      case "grammar2_was_were": {
  const doc = await db.collection("Workbook")
    .findOne({ slug: "unit4-our-senses-grammar2-was-were" });

  if (!doc) {
    return res.status(404).json({ message: "No grammar2 was/were workbook found" });
  }

  result = {
    title: doc.title,
    instruction: doc.instruction,
    table: {
      columns: doc.table.columns,
      rows: doc.table.rows.map(r => ({
        present: {
          question: r.present.question,
          answer: r.present.answer
        },
        past: {
          question: r.past.question,
          answer: r.past.answer
        },
        tokens: {
          question: r.tokens.question,
          answer: r.tokens.answer
        }
      }))
    },
    files: doc.files
  };
  break;
}
 case "grammar2_look_match": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-grammar2-look-match" });
        if (!doc) return res.status(404).json({ message: "No grammar2 look match workbook found" });
        
        result = {
          ...doc,
          pairs: doc.pairs.map(p => ({
            ...p,
            audioSrc: `${doc.files.audioFolder}/${p.audio}`,
            imageSrc: `${doc.files.imageFolder}/${p.imageSrc.split('/').pop()}`
          }))
        };
        break;
      }
      case "grammar2_read_write": {
        const doc = await db.collection('Workbook').findOne({ slug: "unit4-our-senses-read-write-2" });
        if (!doc) {
            return res.status(404).json({ message: "No grammar2 read_write workbook found" });
        }

        // Add robust checks to prevent server crash
        if (!doc.files || !Array.isArray(doc.sentences)) {
            console.warn(`Data for slug 'unit4-our-senses-read-write-2' is malformed. Missing 'files' or 'sentences' array.`);
            result = {
                title: doc.title || 'Error',
                instruction: doc.instruction || 'Data could not be loaded.',
                sentences: [],
                files: doc.files || {}
            };
        } else {
            result = {
                title: doc.title,
                instruction: doc.instruction,
                sentences: doc.sentences.map(s => ({
                    ...s,
                    question: s.sentence || '', // RENAME to match component prop, handle missing sentence
                    imageSrc: s.imageSrc ? `${doc.files.imageFolder}/${s.imageSrc.split('/').pop()}` : '',
                    questionAudioSrc: s.questionAudio ? `${doc.files.audioFolder}/${s.questionAudio}` : '',
                    answerAudioSrc: s.answerAudio ? `${doc.files.audioFolder}/${s.answerAudio}` : ''
                })),
                files: doc.files
            };
        }
        break;
      }
      case "grammar2_role_play": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-grammar2-role-play" });
        if (!doc) return res.status(404).json({ message: "No grammar2 role play found" });
        result = doc;
        break;
      }
      case "game_time_crossword": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-game-time-do-the-crossword-puzzle" });
        if (!doc) return res.status(404).json({ message: "No crossword puzzle found" });
        result = doc;
        break;
      }
      case "look_write": {
        const doc = await db.collection('Workbook')
          .findOne({ slug: "unit4-our-senses-workbook-look-write" });
        if (!doc) return res.status(404).json({ message: "No look_write activity found" });
        result = {
            ...doc,
            questions: doc.questions.map(q => ({
                ...q,
                image: q.image, // Server will prepend base URL
                answer: {
                    ...q.answer,
                    audio: {
                        question: q.answer.audio.question,
                        response: q.answer.audio.response,
                    }
                }
            }))
        };
        break;
      }
      case "listen_read_fast": {
        try {
          const doc = await db.collection("Workbook").findOne({
            slug: "unit4-our-senses-workbook-listen-read-fast"
          });

          if (!doc) {
            return res.status(404).json({ message: "No reading found" });
          }

          result = doc;
        } catch (err) {
          console.error("Error fetching reading_stinky_animals:", err);
          return res.status(500).json({ message: "Server error" });
        }
        break;
      }
      case "reading_stinky_animals": {
          try {
            const doc = await db.collection("Workbook").findOne({
              slug: "unit4-our-senses-workbook-reading-stinky-animals-plants"
            });

            if (!doc) {
              return res.status(404).json({ message: "No reading found" });
            }

            result = doc;
          } catch (err) {
            console.error("Error fetching reading_stinky_animals:", err);
            return res.status(500).json({ message: "Server error" });
          }
          break;
        }
        case "reading_true_false": {
                const doc = await db.collection('Workbook')
                  .findOne({ slug: "unit4-our-senses-workbook-reading-true-false" });
                if (!doc) return res.status(404).json({ message: "No reading true/false activity found" });
                result = doc;
                break;
            }
      case "reading_complete_chart": {
                const doc = await db.collection('Workbook')
                  .findOne({ slug: "unit4-our-senses-workbook-reading-complete-chart" });
                if (!doc) return res.status(404).json({ message: "No reading complete chart activity found" });
                result = doc;
                break;
            }      

      case "read_write_turtle": {
                const doc = await db.collection('Workbook')
                  .findOne({ slug: "unit4-our-senses-workbook-read-write-turtle" });
                if (!doc) return res.status(404).json({ message: "No read/write turtle activity found" });
                result = doc;
                break;
            }
            case "read_write_winter": {
                const doc = await db.collection('Workbook')
                  .findOne({ slug: "unit4-our-senses-workbook-read-write-winter" });
                if (!doc) return res.status(404).json({ message: "No read/write winter activity found" });
                result = doc;
                break;
            }
            case "read_choose": {
                const doc = await db.collection('Workbook')
                  .findOne({ slug: "unit4-our-senses-workbook-read-choose" });
                if (!doc) return res.status(404).json({ message: "No read/choose activity found" });
                result = doc;
                break;
            }
              case "read_write_box": {
                const doc = await db.collection('Workbook').findOne({ _id: new ObjectId('68cc0142de074df5b9cebed4') });
                if (!doc) return res.status(404).json({ message: "No read/write from box activity found" });

                const normalizedDoc = { ...doc, activity: doc.type || 'Read and Write' };
                delete normalizedDoc.type;

                if (Array.isArray(normalizedDoc.questions)) {
                    normalizedDoc.questions.forEach(q => {
                        if (q.audio) {
                            q.audio = `/audio/unit4_our_senses/${path.basename(q.audio)}`;
                        }
                    });
                }
                result = normalizedDoc;
                break;
            }
            case "read_write_sense_table": {
                const doc = await db.collection('Workbook').findOne({ _id: new ObjectId('68cc03c6de074df5b9cebed5') });
                if (!doc) return res.status(404).json({ message: "No read/write sense table activity found" });
                
                const normalizedDoc = { ...doc, activity: doc.type || 'Read and Write' };
                delete normalizedDoc.type;

                if (normalizedDoc.table && Array.isArray(normalizedDoc.table.rows)) {
                    normalizedDoc.table.rows.forEach(row => {
                        Object.keys(row).forEach(key => {
                            // Check if the property is an object with an audio key
                            if (typeof row[key] === 'object' && row[key] !== null && row[key].audio) {
                                row[key].audio = `/audio/unit4_our_senses/${path.basename(row[key].audio)}`;
                            }
                        });
                    });
                }
                result = normalizedDoc;
                break;
            }
       case "final_test_listen_choose": {
                const doc = await db.collection('Workbook').findOne({ slug: "unit4-our-senses-workbook-final-test-listen-choose" });
                if (!doc) return res.status(404).json({ message: "No final test activity found" });
                result = doc;
                break;
            }
            case "spin_wheel_vocab": {
                const doc = await db.collection('Workbook').findOne({ slug: "workbook-spin-wheel-vocab" });
                if (!doc) return res.status(404).json({ message: "Spin wheel vocab not found" });
                result = doc;
                break;
            }    
      
            // case "final_test_listen_choose": {
            //     const doc = await db.collection('Workbook').findOne({ slug: "unit4-our-senses-workbook-final-test-listen-choose" });
            //     if (!doc) return res.status(404).json({ message: "No final test activity found" });
            //     result = doc;
            //     break;
            // }
            




      default:
        return res.status(400).json({ message: `Invalid workbook activityType: ${activityType}` });
    }

    res.json(result);

  } catch (err) {
    console.error("Error in /api/unit4_our_senses/workbook/:activityType:", err);
    res.status(500).send("Internal Server Error");
  }
});
// API endpoint for Unit 5
app.get('/api/unit/unit5_animal_habitats', async (req, res) => {
  try {
    const db = client.db('Unit5_Animal_Habitats');
    // fetch all documents with the same slug and merge sections so the API returns a complete view
    const docs = await db.collection('UNIT5_ANIMAL_HABITATS').find({ slug: 'unit5_animal_habitats' }).sort({ _id: 1 }).toArray();
    if (!docs || docs.length === 0) return res.status(404).send('Unit 5 data not found.');

    // merge sections: iterate from oldest to newest so newer docs overwrite fields
    const sectionsMap = new Map();
    let unitTitle = docs[0].unit || 'Unit 5';
    for (const doc of docs) {
      if (doc.unit) unitTitle = doc.unit;
      if (Array.isArray(doc.sections)) {
        for (const s of doc.sections) {
          const key = s.slug || s.section || JSON.stringify(s);
          const existing = sectionsMap.get(key) || {};
          sectionsMap.set(key, { ...existing, ...s });
        }
      }
    }

    const merged = {
      slug: 'unit5_animal_habitats',
      unit: unitTitle,
      sections: Array.from(sectionsMap.values())
    };

    res.json(merged);
  } catch (err) {
    console.error(`Error in /api/unit/unit5_animal_habitats:`, err);
    res.status(500).send('Internal Server Error');
  }
});

// GET a specific section of Unit 5 by section slug
app.get('/api/unit/unit5_animal_habitats/:section', async (req, res) => {
  try {
    const db = client.db('Unit5_Animal_Habitats');
    // fetch all docs and merge sections to support cases where different docs contain different sections
    const docs = await db.collection('UNIT5_ANIMAL_HABITATS')
      .find({ slug: 'unit5_animal_habitats' })
      .sort({ _id: 1 })
      .toArray();

    if (!docs || docs.length === 0) {
      return res.status(404).send('Unit 5 data not found.');
    }

    const sectionsMap = new Map();
    for (const doc of docs) {
      if (!Array.isArray(doc.sections)) continue;
      for (const s of doc.sections) {
        const key = s.slug || s.section || JSON.stringify(s);
        const existing = sectionsMap.get(key) || {};
        sectionsMap.set(key, { ...existing, ...s });
      }
    }

    const mergedSections = Array.from(sectionsMap.values());
    const { section } = req.params;

    switch (section) {
      case 'vocabulary1': {
        const vocab = mergedSections.find(s => s.slug === 'vocabulary1');
        if (!vocab) return res.status(404).send('vocabulary1 not found');
        return res.json({
          slug: vocab.slug,
          type: 'Vocabulary',
          title: vocab.title,
          instruction: vocab.instruction || null,
          content: vocab.content || []
        });
      }
      case 'work_with_partner': {
        const qa = mergedSections.find(s => s.slug === 'work_with_partner');
        if (!qa) return res.status(404).send('work_with_partner not found');
        return res.json({
          slug: qa.slug,
          type: 'Q&A',
          title: qa.title,
          instruction: qa.instruction || null,
          content: qa.content || []
        });
      }
      case 'listen_read_and_sing': {
        const song = mergedSections.find(s => s.slug === 'listen_read_and_sing');
        if (!song) return res.status(404).send('listen_read_and_sing not found');
        return res.json({
          slug: song.slug,
          type: 'Song',
          title: song.title,
          song_title: song.song_title || null,
          song_audio: song.song_audio || null,
          lyrics: song.lyrics || []
        });
      }
      case 'act_out_and_describe': {
        const act = mergedSections.find(s => s.slug === 'act_out_and_describe');
        if (!act) return res.status(404).send('act_out_and_describe not found');
        return res.json({
          slug: act.slug,
          type: 'Activity',
          title: act.title,
          instruction: act.instruction || null
        });
      }
      case 'match': {
        const match = mergedSections.find(s => s.slug === 'match');
        if (!match) return res.status(404).send('match not found');
        return res.json({
          slug: match.slug,
          type: 'Match',
          title: match.title,
          instruction: match.instruction || null,
          questions: match.questions || []
        });
      }
      case 'Read_the_answers': { 
        const match = mergedSections.find(s => s.slug === 'read_write_why');
        if (!match) return res.status(404).send('match not found');
        return res.json({
          slug: match.slug,
          type: match.type || 'Read and Write',
          instruction: match.instruction || null,
          items: match.items || []
        });
      }
      case 'ask_and_answer': {
        const aa = mergedSections.find(s => s.slug === 'ask_and_answer');
        if (!aa) return res.status(404).send('ask_and_answer not found');
        return res.json({
          slug: aa.slug,
          type: aa.type || 'Ask and Answer',
          title: aa.title || 'Ask and Answer',
          instruction: aa.instruction || null,
          items: aa.items || []
        });
      }
      case 'vocabulary2': {
        const vocab = mergedSections.find(s => s.slug === 'vocabulary2');
        if (!vocab) return res.status(404).send('vocabulary2 not found');
        return res.json({
          slug: vocab.slug,
          type: vocab.type || 'Vocabulary',
          title: vocab.title || 'Vocabulary 2',
          instruction: vocab.instruction || null,
          content: vocab.content || []
        });
      }
      case 'drag_drop_animals': {
        const drag = mergedSections.find(s => s.slug === 'drag_drop_animals');
        if (!drag) return res.status(404).send('drag_drop_animals not found');
        return res.json({
          slug: drag.slug,
          type: drag.type || 'Activity',
          title: drag.title || 'Drag and Drop',
          instruction: drag.instruction || null,
          categories: drag.categories || [],
          items: drag.items || []
        });
      }
      case 'listen_and_read': {
        const s = mergedSections.find(s => s.slug === 'listen_and_read');
        if (!s) return res.status(404).send('Section not found');
        return res.json(s);
      }

      case 'read_circle_correct_words': {
        const s = mergedSections.find(s => s.slug === 'read_circle_correct_words');
        if (!s) return res.status(404).send('Section not found');
        return res.json({
          slug: s.slug,
          type: s.type,
          title: s.title,
          instruction: s.instruction,
          questions: s.questions
        });
      }

      case 'complete_the_chart': {
        const s = mergedSections.find(s => s.slug === 'complete_the_chart');
        if (!s) return res.status(404).send('Section not found');
        return res.json({
          slug: s.slug,
          type: s.type,
          title: s.title,
          instruction: s.instruction,
          chart: s.chart
        });
      }

      case 'talk_about_parts': {
        const s = mergedSections.find(s => s.slug === 'talk_about_parts');
        if (!s) return res.status(404).send('Section not found');
        return res.json({
          slug: s.slug,
          type: s.type,
          title: s.title,
          instruction: s.instruction,
          prompts: s.prompts
        });
      }
      case 'mounira_animal': {
  const wr = mergedSections.find(s => s.slug === 'mounira_animal');
  if (!wr) return res.status(404).send('mounira_animal not found');
  return res.json({
    slug: wr.slug,
    type: wr.type || 'Writing',
    title: wr.title,
    instruction: wr.instruction || null,
    text: wr.text || [],
    explain: wr.explain || null,
    images: wr.images || []
  });
}

case 'write_about_animal': {
  const wr = mergedSections.find(s => s.slug === 'write_about_animal');
  if (!wr) return res.status(404).send('write_about_animal not found');
  return res.json({
    slug: wr.slug,
    type: wr.type || 'Writing',
    title: wr.title,
    instruction: wr.instruction || null,
    prompts: wr.prompts || []
  });
}

case 'share_your_writing': {
  const wr = mergedSections.find(s => s.slug === 'share_your_writing');
  if (!wr) return res.status(404).send('share_your_writing not found');
  return res.json({
    slug: wr.slug,
    type: wr.type || 'Writing',
    title: wr.title,
    instruction: wr.instruction || null,
    chart_columns: wr.chart_columns || [],
    chart_rows: wr.chart_rows || []
  });
}

      default: {
        const found = mergedSections.find(s => s.slug === section);
        if (!found) return res.status(404).send(`Section not found: ${section}`);
        return res.json(found);
      }
    }
  } catch (err) {
    console.error(`Error in /api/unit/unit5_animal_habitats/:section:`, err);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint for Unit 5 Workbook
// app.get('/api/unit/unit5_animal_habitats_workbook', async (req, res) => {
//   try {
//     const db = client.db('Unit5_Animal_Habitats');
//     const docs = await db.collection('Workbook')
//       .find({ slug: 'unit5_animal_habitats_workbook' })
//       .sort({ _id: 1 })
//       .toArray();

//     if (!docs || docs.length === 0) {
//       return res.status(404).send('Workbook data not found.');
//     }

//     // merge sections từ các bản ghi
//     const sectionsMap = new Map();
//     let unitTitle = docs[0].unit || 'Unit 5 – Animal Habitats';
//     for (const doc of docs) {
//       if (doc.unit) unitTitle = doc.unit;
//       if (Array.isArray(doc.sections)) {
//         for (const s of doc.sections) {
//           const key = s.slug || s.section || JSON.stringify(s);
//           const existing = sectionsMap.get(key) || {};
//           sectionsMap.set(key, { ...existing, ...s });
//         }
//       }
//     }

//     const merged = {
//       slug: 'unit5_animal_habitats_workbook',
//       unit: unitTitle,
//       sections: Array.from(sectionsMap.values())
//     };

//     res.json(merged);
//   } catch (err) {
//     console.error(`Error in /api/unit/unit5_animal_habitats_workbook:`, err);
//     res.status(500).send('Internal Server Error');
//   }
// });
// // GET a specific section of Workbook by section slug
// app.get('/api/unit/unit5_animal_habitats_workbook/:section', async (req, res) => {
//   try {
//     const db = client.db('Unit5_Animal_Habitats');
//     const docs = await db.collection('Workbook')
//       .find({ slug: 'unit5_animal_habitats_workbook' })
//       .sort({ _id: 1 })
//       .toArray();

//     if (!docs || docs.length === 0) {
//       return res.status(404).send('Workbook data not found.');
//     }

//     const sectionsMap = new Map();
//     for (const doc of docs) {
//       if (!Array.isArray(doc.sections)) continue;
//       for (const s of doc.sections) {
//         const key = s.slug || s.section || JSON.stringify(s);
//         const existing = sectionsMap.get(key) || {};
//         sectionsMap.set(key, { ...existing, ...s });
//       }
//     }

//     const mergedSections = Array.from(sectionsMap.values());
//     const { section } = req.params;

//     switch (section) {
//       case 'vocabulary1': {
//         const vocab = mergedSections.find(s => s.slug === 'vocabulary1');
//         if (!vocab) return res.status(404).send('vocabulary1 not found');
//         return res.json({
//           slug: vocab.slug,
//           type: vocab.type || 'Vocabulary',
//           title: vocab.title,
//           instruction: vocab.instruction || null,
//           content: vocab.content || []
//         });
//       }

//       case 'look_pictures_read_write': {
//         const sec = mergedSections.find(s => s.slug === 'look_pictures_read_write');
//         if (!sec) return res.status(404).send('look_pictures_read_write not found');
//         return res.json({
//           slug: sec.slug,
//           type: sec.type || 'Read and Write',
//           title: sec.title,
//           instruction: sec.instruction || null,
//           questions: sec.questions || []
//         });
//       }
//        // --- SONG: Listen to the song. Read. Draw lines to match
//       case 'song_listen_read_match': {
//         const song1 = mergedSections.find(s => s.slug === 'song_listen_read_match');
//         if (!song1) return res.status(404).send('song_listen_read_match not found');
//         return res.json({
//           slug: song1.slug,
//           type: song1.type || 'Song',
//           title: song1.title,
//           instruction: song1.instruction || null,
//           questions: song1.questions || []
//         });
//       }

//       // --- SONG: Write a new verse for the song
//       case 'song_write_new_verse': {
//         const song2 = mergedSections.find(s => s.slug === 'song_write_new_verse');
//         if (!song2) return res.status(404).send('song_write_new_verse not found');
//         return res.json({
//           slug: song2.slug,
//           type: song2.type || 'Song Writing',
//           title: song2.title,
//           instruction: song2.instruction || null,
//           word_box: song2.word_box || [],
//           template: song2.template || {}
//         });
//       }
//        // GRAMMAR 1 (có nhiều section con)
//       case 'grammar1': {
//         const grammar = mergedSections.find(s => s.slug === 'grammar1');
//         if (!grammar) return res.status(404).send('grammar1 not found');
//         return res.json(grammar);
//       }
//        case 'vocabulary2_listen_write': {
//         const sec = mergedSections.find(s => s.slug === 'vocabulary2_listen_write');
//         if (!sec) return res.status(404).send('vocabulary2_listen_write not found');
//         return res.json(sec);
//       }

//       case 'vocabulary2_look_read_true_false': {
//         const sec = mergedSections.find(s => s.slug === 'vocabulary2_look_read_true_false');
//         if (!sec) return res.status(404).send('vocabulary2_look_read_true_false not found');
//         return res.json(sec);
//       }
//       case 'infinitive_of_purpose':
//         sectionData = doc.sections.find(s => s.slug === 'grammar2_infinitive_of_purpose');
//         break;

//       case 'listen_and_write':
//         sectionData = doc.sections.find(s => s.slug === 'listen_and_write');
//         break;

//       case 'what_about_you':
//         sectionData = doc.sections.find(s => s.slug === 'what_about_you');
//         break;

//       case 'work_with_a_partner':
//         sectionData = doc.sections.find(s => s.slug === 'work_with_a_partner');
//         break;





//       default: {
//         const found = mergedSections.find(s => s.slug === section);
//         if (!found) return res.status(404).send(`Section not found: ${section}`);
//         return res.json(found);
//       }
//     }
//   } catch (err) {
//     console.error(`Error in /api/unit/unit5_animal_habitats_workbook/:section:`, err);
//     res.status(500).send('Internal Server Error');
//   }
// });


// API endpoint for Unit 5 Workbook
app.get('/api/unit/unit5_animal_habitats_workbook', async (req, res) => {
  try {
    const db = client.db('Unit5_Animal_Habitats');
    // Fetch from both workbook and reading collections
    const docs = await db.collection('Workbook')
      .find({ $or: [
          { slug: 'unit5_animal_habitats_workbook' },
          { slug: 'unit5_animal_habitats_reading' },
          { slug: 'unit5_animal_habitats_writing' }
      ]})
      .sort({ _id: 1 })
      .toArray();

    if (!docs || docs.length === 0) {
      return res.status(404).send('Workbook data not found.');
    }

    const allSections = [];
    for (const doc of docs) {
        // If the doc itself represents a section group (like the Vocabulary 2 or Reading doc)
        if (doc.type === 'Workbook' || doc.slug === 'unit5_animal_habitats_reading' || doc.slug === 'unit5_animal_habitats_writing') {
            if (Array.isArray(doc.sections)) {
                allSections.push(...doc.sections);
            }
        }
        // If the doc is a container for other sections (original structure)
        else if (Array.isArray(doc.sections)) {
            allSections.push(...doc.sections);
        }
    }

    // Deduplicate and merge sections based on a unique key
    const sectionsMap = new Map();
    for (const s of allSections) {
        const key = s.slug || s.section;
        if (!key) continue; 
        const existing = sectionsMap.get(key) || {};
        sectionsMap.set(key, { ...existing, ...s });
    }
    
    const workbookDoc = docs.find(d => d.slug === 'unit5_animal_habitats_workbook');

    const merged = {
      slug: 'unit5_animal_habitats_workbook',
      unit: workbookDoc?.unit || 'Unit 5 – Animal Habitats',
      sections: Array.from(sectionsMap.values())
    };

    res.json(merged);
  } catch (err) {
    console.error(`Error in /api/unit/unit5_animal_habitats_workbook:`, err);
    res.status(500).send('Internal Server Error');
  }
});

// GET a specific section of Workbook by section slug
app.get('/api/unit/unit5_animal_habitats_workbook/:section', async (req, res) => {
  try {
    const db = client.db('Unit5_Animal_Habitats');
    const docs = await db.collection('Workbook')
      .find({ $or: [
          { slug: 'unit5_animal_habitats_workbook' },
          { slug: 'unit5_animal_habitats_reading' },
          { slug: 'unit5_animal_habitats_writing' }
      ]})
      .sort({ _id: 1 })
      .toArray();

    if (!docs || docs.length === 0) {
      return res.status(404).send('Workbook data not found.');
    }

    const allSections = [];
    for (const doc of docs) {
        if (doc.type === 'Workbook' || doc.slug === 'unit5_animal_habitats_reading' || doc.slug === 'unit5_animal_habitats_writing') {
            if (Array.isArray(doc.sections)) allSections.push(...doc.sections);
        } else if (Array.isArray(doc.sections)) {
            allSections.push(...doc.sections);
        }
    }

    const sectionsMap = new Map();
    for (const s of allSections) {
        const key = s.slug || s.section;
        if (!key) continue;
        const existing = sectionsMap.get(key) || {};
        sectionsMap.set(key, { ...existing, ...s });
    }
    
    const mergedSections = Array.from(sectionsMap.values());
    const { section } = req.params;
    
    const foundSection = mergedSections.find(s => s.slug === section);

    if (foundSection) {
        return res.json(foundSection);
    }
    
    // Fallback for nested sections within larger section groups (like vocab2 or grammar1)
    for (const sec of mergedSections) {
        if (Array.isArray(sec.sections)) {
            const subSection = sec.sections.find(sub => sub.slug === section);
            if (subSection) return res.json(subSection);
        }
         if (Array.isArray(sec.children)) {
            const subSection = sec.children.find(sub => sub.slug === section);
            if (subSection) return res.json(subSection);
        }
    }

    return res.status(404).send(`Section not found: ${section}`);

  } catch (err) {
    console.error(`Error in /api/unit/unit5_animal_habitats_workbook/:section:`, err);
    res.status(500).send('Internal Server Error');
  }
});
// API endpoint for Unit 6
app.get('/api/unit/unit6_what_is_for_dinner', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_what_is_for_dinner" });
    
    if (!doc) {
      return res.status(404).send('Unit 6 Vocabulary 1 data not found.');
    }
    
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_what_is_for_dinner:`, err);
    res.status(500).send('Internal Server Error');
  }
});
// API endpoint for Unit 6
app.get('/api/unit/unit6_lets_go_shopping_song', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_lets_go_shopping_song" });
    
    if (!doc) {
      return res.status(404).send('Unit 6 Vocabulary 1 data not found.');
    }
    
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_lets_go_shopping_song:`, err);
    res.status(500).send('Internal Server Error');
  }
});
// API endpoint for Unit 6
app.get('/api/unit/unit6_grammar_some_any', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_grammar_some_any" });
    
    if (!doc) {
      return res.status(404).send('Unit 6 Vocabulary 1 data not found.');
    }
    
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unitunit6_grammar_some_any:`, err);
    res.status(500).send('Internal Server Error');
  }
});



// API endpoint for Unit 6
app.get('/api/unit/unit6_Vocabulary_2', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_Vocabulary_2" });
    
    if (!doc) {
      return res.status(404).send('Unit 6 Vocabulary 1 data not found.');
    }
    
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_Vocabulary_2:`, err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/unit/unit6_grammar_2', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_grammar_2" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_grammar_2:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit6_reading', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_reading" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_reading:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit6_writing', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_writing" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_writing:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit6_extended_reading', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_extended_reading" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_extended_reading:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit6_question_wheel', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('units').findOne({ slug: "unit6_question_wheel" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_question_wheel:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit6_workbook', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('Workbook').findOne({ slug: "unit6_Workbok" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_workbook:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit6_Workbook_GRAMMAR_1', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('Workbook').findOne({ slug: "unit6_Workbook_GRAMMAR_1" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_workbook:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/workbook_vocabulary2', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('Workbook').findOne({ slug: "unit6_Workbook_GRAMMAR_1" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_workbook:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/workbook_grammar2', async (req, res) => {
  try {
    const db = client.db('Unit6_What_Is_For_Dinner');
    const doc = await db.collection('Workbook').findOne({ slug: "workbook_grammar2" });
    if (!doc) {
      return res.status(404).send('Unit 6 Grammar 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit6_workbook:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit6_full_workbook', async (req, res) => {
    try {
        const db = client.db('Unit6_What_Is_For_Dinner');
        const dbOnTheMove = client.db('on_the_move'); // Assuming this is where workbook_vocabulary2 is
        
        // Correctly fetch all parts of the workbook
        const mainDoc = await db.collection('Workbook').findOne({ slug: "unit6_Workbok" });
        const grammar1Doc = await db.collection('Workbook').findOne({ slug: "unit6_Workbook_GRAMMAR_1" });
        const vocab2Doc = await dbOnTheMove.collection('Workbook').findOne({ slug: "workbook_vocabulary2" });
        const grammar2Doc = await db.collection('Workbook').findOne({ slug: "workbook_grammar2" });
        const gameLookListenDoc = await db.collection('Workbook').findOne({ slug: "unit6_Workbook_GAME_LOOK_LISTEN" });
        const readingDoc = await db.collection('Workbook').findOne({ slug: "workbook_reading" });
        const writingDoc = await db.collection('Workbook').findOne({ slug: "workbook_writing" });
        const reviewDoc = await db.collection('Workbook').findOne({ slug: "unit6_review" });

        if (!mainDoc) {
            return res.status(404).send('Unit 6 Workbook main data not found.');
        }

        // Merge sections from all documents
        const allSections = [
            ...(mainDoc?.sections || []),
            ...(grammar1Doc?.sections || []),
            ...(vocab2Doc?.sections || []),
            ...(grammar2Doc?.sections || []),
            ...(gameLookListenDoc?.sections || []),
            ...(readingDoc?.sections || []),
            ...(writingDoc?.sections || []),
            ...(reviewDoc?.sections || [])
        ];

        const mergedData = {
            slug: 'unit6_full_workbook',
            unit: mainDoc.unit,
            sections: allSections
        };

        res.json(mergedData);
    } catch (err) {
        console.error(`Error in /api/unit/unit6_full_workbook:`, err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/api/unit/unit6_vocabulary_3', (req, res) => {
    const vocabData = {
      "slug": "unit6_Vocabulary_3",
      "title": "Unit 6 – What Is For Dinner",
      "words": [
        {
          "text": "beets",
          "meaning_vn": "củ cải đường",
          "example_en": "I eat beets.",
          "example_vn": "Tớ ăn củ cải đường.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/beets-2.wav",
          "image_url": "/images/beets.jpg"
        },
        {
          "text": "work together",
          "meaning_vn": "làm việc cùng nhau",
          "example_en": "We work together.",
          "example_vn": "Chúng mình làm việc cùng nhau.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/work_together-2.wav",
          "image_url": "/images/work_together.jpg"
        },
        {
          "text": "eat together",
          "meaning_vn": "ăn cùng nhau",
          "example_en": "We eat together.",
          "example_vn": "Chúng mình ăn cùng nhau.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/eat_together-2.wav",
          "image_url": "/images/eat_together.jpg"
        },
        {
          "text": "around the world",
          "meaning_vn": "khắp nơi trên thế giới",
          "example_en": "Friends are around the world.",
          "example_vn": "Bạn bè ở khắp nơi trên thế giới.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/around_the_world-2.wav",
          "image_url": "/images/around_the_world.jpg"
        },
        {
          "text": "kinds of lunches",
          "meaning_vn": "các loại bữa trưa",
          "example_en": "I see many lunches.",
          "example_vn": "Tớ thấy nhiều bữa trưa.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/kinds_of_lunches-2.wav",
          "image_url": "/images/kinds_of_lunches.jpg"
        },
        {
          "text": "outside",
          "meaning_vn": "bên ngoài; ngoài trời",
          "example_en": "We play outside.",
          "example_vn": "Chúng mình chơi ngoài trời.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/outside-2.wav",
          "image_url": "/images/outside.jpg"
        },
        {
          "text": "lettuce",
          "meaning_vn": "rau xà lách",
          "example_en": "I like lettuce.",
          "example_vn": "Tớ thích rau xà lách.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/lettuce-2.wav",
          "image_url": "/images/lettuce.jpg"
        },
        {
          "text": "vanilla ice cream",
          "meaning_vn": "kem vani",
          "example_en": "I eat vanilla ice cream.",
          "example_vn": "Tớ ăn kem vani.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/vanilla_ice_cream-2.wav",
          "image_url": "/images/vanilla_ice_cream.jpg"
        },
        {
          "text": "chocolate sauce",
          "meaning_vn": "sốt sô-cô-la",
          "example_en": "I like chocolate sauce.",
          "example_vn": "Tớ thích sốt sô-cô-la.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/chocolate_sauce-2.wav",
          "image_url": "/images/chocolate_sauce.jpg"
        },
        {
          "text": "strawberries",
          "meaning_vn": "dâu tây",
          "example_en": "I see strawberries.",
          "example_vn": "Tớ thấy dâu tây.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/strawberries-2.wav",
          "image_url": "/images/strawberries.jpg"
        },
        {
          "text": "seaweed",
          "meaning_vn": "rong biển",
          "example_en": "We eat seaweed.",
          "example_vn": "Chúng mình ăn rong biển.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/seaweed-2.wav",
          "image_url": "/images/seaweed.jpg"
        },
        {
          "text": "filled with",
          "meaning_vn": "được lấp đầy với",
          "example_en": "The bag is filled with toys.",
          "example_vn": "Cái túi đầy đồ chơi.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/filled_with-2.wav",
          "image_url": "/images/filled_with.jpg"
        },
        {
          "text": "sausages",
          "meaning_vn": "xúc xích",
          "example_en": "I eat sausages.",
          "example_vn": "Tớ ăn xúc xích.",
          "audio_url": "/audio/english/Unit6_What_is_for_Dinner/audio/sausages-2.wav",
          "image_url": "/images/sausages.jpg"
        }
      ]
    };
    res.json(vocabData);
});
app.get('/api/unit/unit7_feeling_fit_vocab1', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "vocabulary1_feeling_fit" });
    if (!doc) {
      return res.status(404).send('Unit 7 vocabulary 1 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_feeling_fit_vocab1:`, err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/unit/unit7_feeling_fit_vocab2', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "vocabulary2_feeling_fit" });
    if (!doc) {
      return res.status(404).send('Unit 7 vocabulary 2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_feeling_fit_vocab2:`, err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/unit/unit7_feeling_fit_grammar1', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "grammar1_simple_past_yes_no" });
    if (!doc) {
      return res.status(404).send('Unit 7 grammar 1 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_feeling_fit_grammar1:`, err);
    res.status(500).send('Internal Server Error');
  }
});


 app.get( '/api/unit/unit7_question_wheel', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "unit7_question_wheel" });
    if (!doc) {
      return res.status(404).send('unit7_question_wheel data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_question_wheel:`, err);
    res.status(500).send('Internal Server Error');
  }
});

 app.get( '/api/unit/unit7_grammar2', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "unit7_grammar2" });
    if (!doc) {
      return res.status(404).send('unit7_grammar2 data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_grammar2:`, err);
    res.status(500).send('Internal Server Error');
  }
});

 app.get( '/api/unit/unit7_song', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "unit7_song" });
    if (!doc) {
      return res.status(404).send('unit7_song data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_song:`, err);
    res.status(500).send('Internal Server Error');
  }
});

 app.get( '/api/unit/unit7_reading', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "unit7_reading" });
    if (!doc) {
      return res.status(404).send('unit7_reading data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_reading:`, err);
    res.status(500).send('Internal Server Error');
  }
});
//  app.get( '/api/unit/unit7_workbook', async (req, res) => {
//   try {
//     const db = client.db('Unit7_Feeling_Fit');
//     const doc = await db.collection('Workbook').findOne({ slug: "workbook_unit7" });
//     if (!doc) {
//       return res.status(404).send('unit7_reading data not found.');
//     }
//     res.json(doc);
//   } catch (err) {
//     console.error(`Error in /api/unit/unit7_workbook:`, err);
//     res.status(500).send('Internal Server Error');
//   }
// });

 app.get( '/api/unit/unit7_writing', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const doc = await db.collection('units').findOne({ slug: "unit7_writing" });
    if (!doc) {
      return res.status(404).send('unit7_reading data not found.');
    }
    res.json(doc);
  } catch (err) {
    console.error(`Error in /api/unit/unit7_writing:`, err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/unit/unit7_review', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const data = await db.collection('units').findOne({ slug: "unit7_feeling_fit_vocabulary" });
    if (!data) {
      return res.status(404).json({ message: 'unit7_feeling_fit_vocabulary data not found' });
    }
    res.json(data);
  } catch (err) {
    console.error('Error fetching Unit 7 review data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/api/unit/workbook_unit7_vocabulary2', async (req, res) => {
  try {
    const db = client.db('Unit7_Feeling_Fit');
    const data = await db.collection('Workbook').findOne({ slug: "workbook_unit7_vocabulary2" });
    if (!data) {
      return res.status(404).json({ message: '/api/unit/workbook_unit7_vocabulary2 data not found' });
    }
    res.json(data);
  } catch (err) {
    console.error('Error fetching Unit 7 review data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/unit/workbook_unit7_grammar2', async (req, res) => {
    try {
      const db = client.db('Unit7_Feeling_Fit');
      const data = await db.collection('Workbook').findOne({ slug: "workbook_unit7_grammar2" });
      if (!data) {
        return res.status(404).json({ message: 'Unit 7 Grammar 2 workbook data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching Unit 7 Grammar 2 workbook data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/unit/workbook_unit7_gametime', async (req, res) => {
    try {
      const db = client.db('Unit7_Feeling_Fit');
      const data = await db.collection('Workbook').findOne({ slug: "workbook_unit7_gametime" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/workbook_unit7_gametime data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching /api/unit/workbook_unit7_gametime data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/unit/workbook_unit7_reading', async (req, res) => {
    try {
      const db = client.db('Unit7_Feeling_Fit');
      const data = await db.collection('Workbook').findOne({ slug: "workbook_unit7_reading" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/workbook_unit7_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching /api/unit/workbook_unit7_reading data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/unit/workbook_unit7_writing', async (req, res) => {
    try {
      const db = client.db('Unit7_Feeling_Fit');
      const data = await db.collection('Workbook').findOne({ slug: "workbook_unit7_writing" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/workbook_unit7_writing data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching /api/unit/workbook_unit7_writing data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/api/unit/workbook_vocabulary1', async (req, res) => {
    try {
      const db = client.db('Unit7_Feeling_Fit');
      const data = await db.collection('Workbook').findOne({ slug: "workbook_unit7" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/workbook_vocabulary1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching /api/unit/workbook_vocabulary1 data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/workbook_unit7_song', async (req, res) => {
    try {
      const db = client.db('Unit7_Feeling_Fit');
      const data = await db.collection('Workbook').findOne({ slug: "workbook_unit7_song" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/workbook_unit7_song data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching /api/unit/workbook_unit7_song data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/unit/workbook_unit7_review', async (req, res) => {
    try {
      const db = client.db('Unit7_Feeling_Fit');
      const data = await db.collection('Workbook').findOne({ slug: "unit7_review" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/workbook_unit7_review data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching/api/unit/workbook_unit7_review data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/workbook_unit7_grammar1', async (req, res) => {
    try {
      // As requested, update the data for Grammar 1 workbook.
      const data = {
        "slug": "workbook_grammar1",
        "title": "Workbook – Unit 7",
        "unit": "Unit 7 – Grammar 1",
        "sections": [
          {
            "slug": "grammar1_simple_past",
            "section": "Grammar 1",
            "title": "Simple past: Yes/No questions and short answers",
            "type": "Table Practice",
            "instruction": "Học cách đặt câu hỏi và trả lời ngắn với thì quá khứ đơn.",
            "tables": {
              "questions": { "header": ["Did", "Subject", "Verb", "Object"], "rows": [["Did", "you", "brush", "your teeth?"], ["Did", "he", "make", "his bed?"], ["Did", "they", "do", "their homework?"]] },
              "answers": { "header": ["Yes", "Subject", "did", "|", "No", "Subject", "didn't"], "rows": [["Yes", "I", "did", "|", "No", "I", "didn't"], ["Yes", "he", "did", "|", "No", "he", "didn't"], ["Yes", "they", "did", "|", "No", "they", "didn't"]] }
            }
          },
          {
            "slug": "listen_and_write",
            "section": "Listen and Write",
            "title": "Listen and write. Fill in the blanks.",
            "type": "Listening",
            "instruction": "Nghe và điền từ còn thiếu để hoàn thành câu.",
            "questions": [
              { "text": "__ you __ your knees? Yes, I __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q1wb.wav", "answer": "Did you bend your knees? Yes, I did." },
              { "text": "__ she __ in the park? Yes, she __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q2wb.wav", "answer": "Did she run in the park? Yes, she did." },
              { "text": "__ you __ breakfast? No, I __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q3wb.wav", "answer": "Did you eat breakfast? No, I didn’t." },
              { "text": "__ he __ his back? No, he __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q4wb.wav", "answer": "Did he stretch his back? No, he didn’t." },
              { "text": "__ they __ their homework? No, they __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q5wb.wav", "answer": "Did they do their homework? No, they didn’t." }
            ]
          },
          {
            "slug": "listen_and_match",
            "section": "Listen and Match",
            "title": "Listen and match. Draw lines.",
            "type": "Matching",
            "instruction": "Nghe và nối câu hỏi bên trái với câu trả lời bên phải.",
            "items": {
              "left": [
                { "text": "Did he walk to school?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q1_7.wav" },
                { "text": "Did you play baseball yesterday?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q2_7.wav" },
                { "text": "Did he brush his teeth after breakfast?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q3_7.wav" },
                { "text": "Did you play with friends yesterday?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q4_7.wav" }
              ],
              "right": ["Yes, I did.", "Yes, he did.", "No, I didn’t.", "No, he didn’t."]
            },
            "answers": [
              { "question": "Did he walk to school?", "answer": "No, he didn’t." },
              { "question": "Did you play baseball yesterday?", "answer": "Yes, I did." },
              { "question": "Did he brush his teeth after breakfast?", "answer": "Yes, he did." },
              { "question": "Did you play with friends yesterday?", "answer": "No, I didn’t." }
            ]
          },
          {
            "slug": "look_read_write",
            "section": "Look, read, and write",
            "title": "Look, read, and write. Use did or didn’t in your answers.",
            "type": "Writing",
            "instruction": "Nhìn tranh, đọc câu hỏi và viết câu trả lời bằng did hoặc didn’t.",
            "image": "/images/look_read_write_7.jpg",
            "questions": [
              { "text": "Did she throw the ball? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q1_7.wav", "answer": "Yes, she did." },
              { "text": "Did he catch the ball? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q2_7.wav", "answer": "No, he didn’t." },
              { "text": "Did the children ride their bikes to the park? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q3_7.wav", "answer": "Yes, they did." },
              { "text": "Did they eat the bread? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q4_7.wav", "answer": "No, they didn’t." }
            ]
          },
          {
            "slug": "write_questions_partner",
            "section": "Write Questions",
            "title": "Write questions. Then ask your partner. Write the answer.",
            "type": "Writing",
            "instruction": "Viết câu hỏi bằng Did you…? Sau đó hỏi bạn cùng học và viết câu trả lời.",
            "questions": [
              { "text": "Did you __? __", "example": "Did you play soccer yesterday?", "sample_answer": "Yes, I did." },
              { "text": "Did you __? __", "example": "Did you eat breakfast this morning?", "sample_answer": "Yes, I did." },
              { "text": "Did you __? __", "example": "Did you brush your teeth last night?", "sample_answer": "Yes, I did." },
              { "text": "Did you __? __", "example": "Did you ride your bike to school?", "sample_answer": "No, I didn’t." },
              { "text": "Did you __? __", "example": "Did you do your homework?", "sample_answer": "Yes, I did." }
            ]
          }
        ]
      };

      // Standardize section name for sorting on the frontend, which resolves the ambiguity error.
      if (data.sections) {
          data.sections.forEach(section => {
              section.section = "Grammar 1";
          });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching Unit 7 Grammar 1 workbook data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
// app.get('/api/unit/workbook_unit7_grammar1', async (req, res) => {
//     try {
//       // As requested, update the data for Grammar 1 workbook.
//       const data = {
//           "slug": "workbook_grammar1",
//           "title": "Workbook – Unit 7",
//           "unit": "Unit 7 – Grammar 1",
//           "sections": [
//               {
//                   "slug": "grammar1_simple_past",
//                   "section": "Grammar 1",
//                   "title": "Simple past: Yes/No questions and short answers",
//                   "type": "Table Practice",
//                   "instruction": "Học cách đặt câu hỏi và trả lời ngắn với thì quá khứ đơn.",
//                   "tables": {
//                       "questions": {
//                           "header": ["Did", "Subject", "Verb", "Object"],
//                           "rows": [
//                               ["Did", "you", "brush", "your teeth?"],
//                               ["Did", "he", "make", "his bed?"],
//                               ["Did", "they", "do", "their homework?"]
//                           ]
//                       },
//                       "answers": {
//                           "header": ["Yes", "Subject", "did", "|", "No", "Subject", "didn't"],
//                           "rows": [
//                               ["Yes", "I", "did", "|", "No", "I", "didn't"],
//                               ["Yes", "he", "did", "|", "No", "he", "didn't"],
//                               ["Yes", "they", "did", "|", "No", "they", "didn't"]
//                           ]
//                       }
//                   }
//               },
//               {
//                   "slug": "listen_and_write",
//                   "section": "Listen and Write",
//                   "title": "Listen and write. Fill in the blanks.",
//                   "type": "Listening",
//                   "instruction": "Nghe và điền từ còn thiếu để hoàn thành câu.",
//                   "questions": [
//                       { "text": "__ you __ your knees? Yes, I __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q1.mp3", "answer": "Did you bend your knees? Yes, I did." },
//                       { "text": "__ she __ in the park? Yes, she __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q2.mp3", "answer": "Did she run in the park? Yes, she did." },
//                       { "text": "__ you __ breakfast? No, I __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q3.wav", "answer": "Did you eat breakfast? No, I didn’t." },
//                       { "text": "__ he __ his back? No, he __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q4.wav", "answer": "Did he hurt his back? No, he didn’t." },
//                       { "text": "__ they __ their homework? No, they __.", "audio": "/audio/english/Unit7_Feeling_Fit/audio/listen_write_q5.wav", "answer": "Did they do their homework? No, they didn’t." }
//                   ]
//               },
//               {
//                   "slug": "listen_and_match",
//                   "section": "Listen and Match",
//                   "title": "Listen and match. Draw lines.",
//                   "type": "Matching",
//                   "instruction": "Nghe và nối câu hỏi bên trái với câu trả lời bên phải.",
//                   "items": {
//                       "left": [
//                           { "text": "Did he walk to school?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q1.wav" },
//                           { "text": "Did you play baseball yesterday?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q2.wav" },
//                           { "text": "Did he brush his teeth after breakfast?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q3.wav" },
//                           { "text": "Did you play with friends yesterday?", "audio": "/audio/english/Unit7_Feeling_Fit/audio/match_q4.wav" }
//                       ],
//                       "right": ["Yes, I did.", "Yes, he did.", "No, I didn’t.", "No, he didn’t."]
//                   },
//                   "answers": [
//                       { "question": "Did he walk to school?", "answer": "Yes, he did." },
//                       { "question": "Did you play baseball yesterday?", "answer": "No, I didn’t." },
//                       { "question": "Did he brush his teeth after breakfast?", "answer": "No, he didn’t." },
//                       { "question": "Did you play with friends yesterday?", "answer": "Yes, I did." }
//                   ]
//               },
//               {
//                   "slug": "look_read_write",
//                   "section": "Look, read, and write",
//                   "title": "Look, read, and write. Use did or didn’t in your answers.",
//                   "type": "Writing",
//                   "instruction": "Nhìn tranh, đọc câu hỏi và viết câu trả lời bằng did hoặc didn’t.",
//                   "image": "/images/look_read_write.jpg",
//                   "questions": [
//                       { "text": "Did she throw the ball? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q1.wav", "answer": "Yes, she did." },
//                       { "text": "Did he catch the ball? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q2.wav", "answer": "No, he didn’t." },
//                       { "text": "Did the children ride their bikes to the park? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q3.wav", "answer": "Yes, they did." },
//                       { "text": "Did they eat the bread? ___", "audio": "/audio/english/Unit7_Feeling_Fit/audio/look_read_write_q4.wav", "answer": "No, they didn’t." }
//                   ]
//               },
//               {
//                   "slug": "write_questions_partner",
//                   "section": "Write Questions",
//                   "title": "Write questions. Then ask your partner. Write the answer.",
//                   "type": "Writing",
//                   "instruction": "Viết câu hỏi bằng Did you…? Sau đó hỏi bạn cùng học và viết câu trả lời.",
//                   "questions": [
//                       { "text": "Did you __? __", "example": "Did you play soccer yesterday?", "sample_answer": "Yes, I did." },
//                       { "text": "Did you __? __", "example": "Did you eat breakfast this morning?", "sample_answer": "Yes, I did." },
//                       { "text": "Did you __? __", "example": "Did you brush your teeth last night?", "sample_answer": "Yes, I did." },
//                       { "text": "Did you __? __", "example": "Did you ride your bike to school?", "sample_answer": "No, I didn’t." },
//                       { "text": "Did you __? __", "example": "Did you do your homework?", "sample_answer": "Yes, I did." }
//                   ]
//               }
//           ]
//       };

//       // Standardize section name for sorting on the frontend, which resolves the ambiguity error.
//       if (data.sections) {
//           data.sections.forEach(section => {
//               section.section = "Grammar 1";
//           });
//       }
//       res.json(data);
//     } catch (err) {
//       console.error('Error fetching Unit 7 Grammar 1 workbook data:', err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
// });
// app.get('/api/unit/:slug', async (req, res) => {
//     try {
//         const { slug } = req.params;
//         let dbName = '';
//         let collectionName = 'units';
//         let querySlug = slug;

//         if (slug.startsWith('unit5')) {
//             dbName = 'Unit5_Animal_Habitats';
//         } else if (slug.startsWith('unit6')) {
//             dbName = 'Unit6_Whats_for_Dinner';
//         } else if (slug === 'unit7_workbook') {
//             const db = client.db('Unit7_Feeling_Fit');
//             const workbookParts = await db.collection('Workbook').find({ 
//                 slug: { $in: ['workbook_unit7', 'workbook_unit7_song', 'workbook_grammar1'] } 
//             }).sort({ slug: 1 }).toArray();

//             if (!workbookParts || workbookParts.length === 0) {
//                 return res.status(404).json({ message: `Data for slug ${slug} not found` });
//             }
            
//             const combinedSections = workbookParts.reduce((acc, part) => {
//                 return acc.concat(part.sections || []);
//             }, []);
            
//             const combinedData = {
//                 slug: 'unit7_workbook',
//                 title: 'Workbook – Unit 7',
//                 sections: combinedSections
//             };

//             return res.json(combinedData);
//         } else if (slug.startsWith('unit7')) {
//             dbName = 'Unit7_Feeling_Fit';
//         } else {
//             return res.status(404).json({ message: 'Unit not found' });
//         }

//         const db = client.db(dbName);
//         const data = await db.collection(collectionName).findOne({ slug: querySlug });

//         if (!data) {
//             return res.status(404).json({ message: `Data for slug ${slug} not found` });
//         }

//         res.json(data);
//     } catch (err) {
//         console.error(`Error in /api/unit/${req.params.slug}:`, err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });



app.get('/api/unit/unit8_vocabulary1', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('units').findOne({ slug: "unit8_vocabulary1" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/workbook_unit7_review data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching/api/unit/workbook_unit7_review data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_grammar1', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('units').findOne({ slug: "unit8_grammar1" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/unit8_grammar1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching/api/unit/unit8_grammar1 data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_vocabulary2', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('units').findOne({ slug: "unit8_vocabulary2" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/unit8_vocabulary2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching/api/unit/unit8_vocabulary2 data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_grammar2', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('units').findOne({ slug: "unit8_grammar2" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/unit8_grammar2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching/api/unit/unit8_grammar2 data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_reading', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('units').findOne({ slug: "unit8_reading" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/unit8_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching/api/unit/unit8_reading data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_writing', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('units').findOne({ slug: "unit8_writing" });
      if (!data) {
        return res.status(404).json({ message: '/api/unit/unit8_writing data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching/api/unit/unit8_writing data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_workbook_vocabulary1', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_vocabulary1" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_vocabulary1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetchingunit8_workbook_vocabulary1 data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_workbook_song', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_song" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_song data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_workbook_song data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/unit/unit8_workbook_grammar1', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_grammar1" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_grammar1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_workbook_grammar1 data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_workbook_vocabulary2', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_vocabulary2" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_vocabulary2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_workbook_vocabulary2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_workbook_grammar2', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_grammar2" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_grammar2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_workbook_grammar2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_game_time', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_game_time" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_game_time data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_game_time:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_workbook_reading', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_reading" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_workbook_reading:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_workbook_writing', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_writing" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_workbook_writing:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_workbook_review', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Workbook').findOne({ slug: "unit8_workbook_review" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_workbook_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_workbook_review:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/unit/unit8_grammar1_Scramble', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Scramble').findOne({ slug: "unit8_grammar1_Scramble" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_grammar1_Scramble data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_grammar1_Scramble:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit8_grammar2_Scramble', async (req, res) => {
    try {
      const db = client.db("Unit8_Let's_Celebrateuse");
      const data = await db.collection('Scramble').findOne({ slug: "unit8_grammar2_Scramble" });
      if (!data) {
        return res.status(404).json({ message: 'unit8_grammar2_Scramble data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit8_grammar2_Scramble:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit7_grammar1_Scramble', async (req, res) => {
    try {
      const db = client.db("Unit7_Feeling_Fit");
      const data = await db.collection('Scramble').findOne({ slug: "unit7_grammar1_Scramble" });
      if (!data) {
        return res.status(404).json({ message: 'unit7_grammar1_Scramble data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit7_grammar1_Scramble:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/unit/Unit7_Feeling_Fit_Grammar2_Scramble', async (req, res) => {
    try {
      const db = client.db("Unit7_Feeling_Fit");
      const data = await db.collection('Scramble').findOne({ slug: "Unit7_Feeling_Fit_Grammar2_Scramble" });
      if (!data) {
        return res.status(404).json({ message: 'Unit7_Feeling_Fit_Grammar2_Scramble data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching Unit7_Feeling_Fit_Grammar2_Scramble:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/Unit5_grammar1_Scramble', async (req, res) => {
    try {
      const db = client.db("Unit5_Animal_Habitats");
      const data = await db.collection('Scramble').findOne({ slug: "Unit5_grammar1_Scramble" });
      if (!data) {
        return res.status(404).json({ message: 'Unit5_grammar1_Scramble data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching Unit5_grammar1_Scramble:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/Unit5_grammar2_Scramble', async (req, res) => {
    try {
      const db = client.db("Unit5_Animal_Habitats");
      const data = await db.collection('Scramble').findOne({ slug: "Unit5_grammar2_Scramble" });
      if (!data) {
        return res.status(404).json({ message: 'Unit5_grammar2_Scramble data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching Unit5_grammar2_Scramble:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_vocabulary1', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_vocabulary1" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_vocabulary1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_vocabulary1:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_song', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_song" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_song data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_song:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_grammar1', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_grammar1" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_grammar1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_grammar1:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_vocabulary2', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_vocabulary2" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_vocabulary2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_vocabulary2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_grammar2', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_grammar2" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_grammar2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_grammar2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_reading', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_reading" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_reading:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_writing', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_writing" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_writing data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_writing:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit9_extended_reading', async (req, res) => {
    try {
      const db = client.db("Unit9_My_Weekend");
      const data = await db.collection('units').findOne({ slug: "unit9_extended_reading" });
      if (!data) {
        return res.status(404).json({ message: 'unit9_extended_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit9_extended_reading:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit2_vocabulary1', async (req, res) => {
    try {
      const db = client.db("Unit2_My_Place_in_the_World");
      const data = await db.collection('units').findOne({ slug: "unit2_vocabulary1" });
      if (!data) {
        return res.status(404).json({ message: 'unit2_vocabulary1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit2_vocabulary1:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit2_song', async (req, res) => {
    try {
      const db = client.db("Unit2_My_Place_in_the_World");
      const data = await db.collection('units').findOne({ slug: "unit2_song" });
      if (!data) {
        return res.status(404).json({ message: 'unit2_song data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit2_song:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit2_grammar1', async (req, res) => {
    try {
      const db = client.db("Unit2_My_Place_in_the_World");
      const data = await db.collection('units').findOne({ slug: "unit2_grammar1" });
      if (!data) {
        return res.status(404).json({ message: 'unit2_grammar1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit2_grammar1:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit2_vocabulary2', async (req, res) => {
    try {
      const db = client.db("Unit2_My_Place_in_the_World");
      const data = await db.collection('units').findOne({ slug: "unit2_vocabulary2" });
      if (!data) {
        return res.status(404).json({ message: 'unit2_vocabulary2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit2_vocabulary2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit2_grammar2', async (req, res) => {
    try {
      const db = client.db("Unit2_My_Place_in_the_World");
      const data = await db.collection('units').findOne({ slug: "unit2_grammar2" });
      if (!data) {
        return res.status(404).json({ message: 'unit2_grammar2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit2_grammar2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit2_reading', async (req, res) => {
    try {
      const db = client.db("Unit2_My_Place_in_the_World");
      const data = await db.collection('units').findOne({ slug: "unit2_reading" });
      if (!data) {
        return res.status(404).json({ message: 'unit2_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit2_reading:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit2_writing', async (req, res) => {
    try {
      const db = client.db("Unit2_My_Place_in_the_World");
      const data = await db.collection('units').findOne({ slug: "unit2_writing" });
      if (!data) {
        return res.status(404).json({ message: 'unit2_writing data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit2_writing:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit1_vocabulary1', async (req, res) => {
    try {
      const db = client.db("Unit1_A_Helping_Hand");
      const data = await db.collection('units').findOne({ slug: "unit1_vocabulary1" });
      if (!data) {
        return res.status(404).json({ message: 'unit1_vocabulary1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit1_vocabulary1:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit1_song', async (req, res) => {
    try {
      const db = client.db("Unit1_A_Helping_Hand");
      const data = await db.collection('units').findOne({ slug: "unit1_song" });
      if (!data) {
        return res.status(404).json({ message: 'unit1_song data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit1_song:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit1_grammar1', async (req, res) => {
    try {
      const db = client.db("Unit1_A_Helping_Hand");
      const data = await db.collection('units').findOne({ slug: "unit1_grammar1" });
      if (!data) {
        return res.status(404).json({ message: 'unit1_grammar1 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit1_grammar1:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit1_vocabulary2', async (req, res) => {
    try {
      const db = client.db("Unit1_A_Helping_Hand");
      const data = await db.collection('units').findOne({ slug: "unit1_vocabulary2" });
      if (!data) {
        return res.status(404).json({ message: 'unit1_vocabulary2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit1_vocabulary2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit1_grammar2', async (req, res) => {
    try {
      const db = client.db("Unit1_A_Helping_Hand");
      const data = await db.collection('units').findOne({ slug: "unit1_grammar2" });
      if (!data) {
        return res.status(404).json({ message: 'unit1_grammar2 data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit1_grammar2:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit1_reading', async (req, res) => {
    try {
      const db = client.db("Unit1_A_Helping_Hand");
      const data = await db.collection('units').findOne({ slug: "unit1_reading" });
      if (!data) {
        return res.status(404).json({ message: 'unit1_reading data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit1_reading:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/api/unit/unit1_writing', async (req, res) => {
    try {
      const db = client.db("Unit1_A_Helping_Hand");
      const data = await db.collection('units').findOne({ slug: "unit1_writing" });
      if (!data) {
        return res.status(404).json({ message: 'unit1_writing data not found' });
      }
      res.json(data);
    } catch (err) {
      console.error('Error fetching unit1_writing:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
// Serve static audio files + set đúng Content-Type
app.use('/recordings', express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.m4a') || filePath.endsWith('.mp4')) {
            res.setHeader('Content-Type', 'audio/mp4'); // Safari cần header này
        } else if (filePath.endsWith('.mp3')) {
            res.setHeader('Content-Type', 'audio/mpeg');
        } else if (filePath.endsWith('.wav')) {
            res.setHeader('Content-Type', 'audio/wav');
        } else if (filePath.endsWith('.webm')) {
            res.setHeader('Content-Type', 'audio/webm');
        }
    }
}));


// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        let ext = '.webm'; // mặc định
        if (file.mimetype === 'audio/mp4') ext = '.m4a'; // đổi thành m4a để Safari chơi được
        else if (file.mimetype === 'audio/mpeg') ext = '.mp3';
        else if (file.mimetype === 'audio/wav') ext = '.wav';

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});


const upload = multer({ storage });
// API upload
app.post('/upload', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({
        message: 'File uploaded successfully!',
        filePath: `/recordings/${req.file.filename}`
    });
});

// API list tất cả recordings
app.get('/recordings', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Failed to list recordings:', err);
            return res.status(500).send('Unable to retrieve recordings.');
        }
        res.json(files);
    });
});
// // --- LAN IP ---
// const nets = os.networkInterfaces();
// let lanIP = 'localhost';
// for (const name of Object.keys(nets)) {
//   for (const net of nets[name]) {
//     if (net.family === 'IPv4' && !net.internal) {
//       lanIP = net.address;
//     }
//   }
// }

// app.listen(3001, '0.0.0.0', () => { 
//   console.log(`API running on http://${lanIP}:3001`);
// });

const httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, () => {
  console.log(`🌐 HTTP server running at http://${lanIP}:${HTTP_PORT}`);
});

const httpsServer = https.createServer({
  key: fs.readFileSync(keyFile),
  cert: fs.readFileSync(certFile),
}, app);

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`🔒 HTTPS server running at https://${lanIP}:${HTTPS_PORT}`);
});
// === MongoDB disconnect on SIGINT ===
process.on('SIGINT', async () => {
  if (global.client) await global.client.close();
  console.log('MongoDB disconnected');
  process.exit(0);
});

// Sample Unit 5 data (for testing without DB)
// app.get('/api/unit/unit5_animal_habitats/sample', (req, res) => {
//   const sample = [
//   {
//     _id: "68ce25a07af33173b9cebea4",
//     slug: 'unit5_animal_habitats',
//     unit: 'Unit 5 – Animal Habitats',
//     sections: [
//       {
//         slug: 'vocabulary1',
//         section: 'Vocabulary 1',
//         title: 'Animal Habitats Vocabulary',
//         type: 'Vocabulary',
//         instruction: 'Learn these words about animal habitats. Listen, repeat, check their pronunciation, and look at the pictures.',
//         content: [
//           { word: 'wetlands', pronunciation: '/ˈwet.lændz/', meaning: 'vùng đất ngập nước', example: 'Many birds live in wetlands.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/wetlands.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/wetlands.jpg' },
//           { word: 'grasslands', pronunciation: '/ˈɡræs.lændz/', meaning: 'đồng cỏ', example: 'Grasslands are home to many herbivores.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/grasslands.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/grasslands.jpg' },
//           { word: 'a forest', pronunciation: '/ə ˈfɒr.ɪst/', meaning: 'một khu rừng', example: 'A forest provides shelter for wildlife.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/a_forest.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_forest.jpg' },
//           { word: 'a rain forest', pronunciation: '/ə ˈreɪn ˌfɒr.ɪst/', meaning: 'một khu rừng mưa', example: 'Rain forests have high biodiversity.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/a_rain_forest.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_rain_forest.jpg' },
//           { word: 'ice', pronunciation: '/aɪs/', meaning: 'băng', example: 'Polar bears live on ice.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/ice.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/ice.jpg' },
//           { word: 'a web', pronunciation: '/ə wɛb/', meaning: 'mạng nhện', example: 'Spiders spin a web to catch insects.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/a_web.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_web.jpg' },
//           { word: 'underground', pronunciation: '/ˌʌn.dəˈɡraʊnd/', meaning: 'dưới đất', example: 'Moles live underground.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/underground.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/underground.jpg' },
//           { word: 'snow', pronunciation: '/snoʊ/', meaning: 'tuyết', example: 'Penguins live in areas with snow.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/snow.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/snow.jpg' },
//           { word: 'mud', pronunciation: '/mʌd/', meaning: 'bùn', example: 'Frogs hide in mud to stay cool.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/mud.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/mud.jpg' },
//           { word: 'a hive', pronunciation: '/ə haɪv/', meaning: 'tổ ong', example: 'Bees live in a hive.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/a_hive.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_hive.jpg' },
//           { word: 'a nest', pronunciation: '/ə nɛst/', meaning: 'tổ chim', example: 'Birds build a nest to lay eggs.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/a_nest.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_nest.jpg' },
//           { word: 'an island', pronunciation: '/ən ˈaɪ.lənd/', meaning: 'một hòn đảo', example: 'Some animals live only on a specific island.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/an_island.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/an_island.jpg' },
//           { word: 'a cave', pronunciation: '/ə keɪv/', meaning: 'một hang động', example: 'Bats live in caves.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/a_cave.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_cave.jpg' },
//           { word: 'a desert', pronunciation: '/ə ˈdez.ɚt/', meaning: 'một sa mạc', example: 'Camels can survive in a desert.', audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/a_desert.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_desert.jpg' }
//         ]
//       },
//       {
//         slug: 'work_with_partner',
//         section: 'Work with a partner',
//         title: 'Ask and Answer',
//         type: 'Q&A',
//         instruction: 'Ask your partner the questions and answer using the correct habitat. Look at the picture to help.',
//         content: [
//           { question: 'Where do camels live?', answer: 'They live in the desert.', related_vocab: [ 'a desert' ], audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/where_do_camels_live.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_desert.jpg' },
//           { question: 'Where do penguins live?', answer: 'They live in areas with snow.', related_vocab: [ 'snow' ], audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/where_do_penguins_live.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/snow.jpg' },
//           { question: 'Where do bees live?', answer: 'They live in a hive.', related_vocab: [ 'a hive' ], audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/where_do_bees_live.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_hive.jpg' },
//           { question: 'Where do birds live?', answer: 'They live in a nest.', related_vocab: [ 'a nest' ], audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/where_do_birds_live.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_nest.jpg' },
//           { question: 'Where do bats live?', answer: 'They live in caves.', related_vocab: [ 'a cave' ], audio: 'https://raw.githubusercontent.com/yourusername/repo/main/audio/where_do_bats_live.wav', image: 'https://raw.githubusercontent.com/yourusername/repo/main/images/a_cave.jpg' }
//         ]
//       }
//     ]
//   }
// ];

//   res.json(sample);
// });