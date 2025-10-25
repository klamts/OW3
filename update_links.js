import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const audioBase = "https://raw.githubusercontent.com/klamts/Unit9_My_Weekend/main";
const imageBase = "https://raw.githubusercontent.com/klamts/images/main";

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("Unit9_My_Weekend");
    const collection = db.collection("units");

    const doc = await collection.findOne({ slug: "unit9_vocabulary1" });
    if (!doc) {
      console.error("❌ Không tìm thấy document có slug = unit9_vocabulary1");
      return;
    }

    // 🧩 Hàm helper để chuẩn hóa audio link
    const fixAudio = (path) => {
      if (!path) return path;
      const filename = path.split("/").pop(); // lấy phần cuối cùng sau dấu /
      return `${audioBase}/${filename}`;
    };

    // 🧩 Hàm helper cho ảnh
    const fixImage = (path) => {
      if (!path) return path;
      const filename = path.split("/").pop();
      return `${imageBase}/${filename}`;
    };

    // ----- Cập nhật tất cả các section -----
    doc.sections.forEach(section => {
      if (section.words) {
        section.words.forEach(w => {
          if (w.audio) w.audio = fixAudio(w.audio);
          if (w.image) w.image = fixImage(w.image);
        });
      }
      if (section.examples) {
        section.examples.forEach(ex => {
          ex.dialogue.forEach(line => {
            if (line.audio) line.audio = fixAudio(line.audio);
          });
        });
      }
    });

    // ----- Ghi ngược lại MongoDB -----
    const result = await collection.updateOne(
      { slug: "unit9_vocabulary1" },
      { $set: doc }
    );

    console.log(`✅ Updated ${result.modifiedCount} document(s).`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();
