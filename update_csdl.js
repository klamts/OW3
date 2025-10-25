import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const audioBase = "https://raw.githubusercontent.com/klamts/Unit6_What_Is_For_Dinner/main";
const imageBase = "https://raw.githubusercontent.com/klamts/images/main";

// --- Hàm thay thế audio ---
const fixAudio = (path) => {
  if (!path || typeof path !== "string") return path;
  const filename = path.split("/").pop();
  if (path.startsWith(audioBase)) return path; // tránh cập nhật lại lần 2
  return `${audioBase}/${filename}`;
};

// --- Hàm thay thế image ---
const fixImage = (path) => {
  if (!path || typeof path !== "string") return path;
  const filename = path.split("/").pop();
  if (path.startsWith(imageBase)) return path;
  return `${imageBase}/${filename}`;
};

// --- Hàm đệ quy để duyệt toàn bộ object ---
function traverseAndFix(obj) {
  let changed = false;

  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      if (traverseAndFix(item)) changed = true;
    });
  } else if (obj && typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (key === "audio") {
        const oldValue = value;
        obj[key] = fixAudio(value);
        if (obj[key] !== oldValue) changed = true;
      }

      if (key === "image") {
        const oldValue = value;
        obj[key] = fixImage(value);
        if (obj[key] !== oldValue) changed = true;
      }

      // Duyệt sâu hơn nếu giá trị là object hoặc array
      if (value && typeof value === "object") {
        if (traverseAndFix(value)) changed = true;
      }
    }
  }

  return changed;
}

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("Unit6_What_Is_For_Dinner");
    const collection = db.collection("Workbook");

    const docs = await collection.find({}).toArray();
    console.log(`📄 Found ${docs.length} documents.`);

    let totalUpdated = 0;

    for (const doc of docs) {
      const changed = traverseAndFix(doc);

      if (changed) {
        await collection.updateOne({ _id: doc._id }, { $set: doc });
        totalUpdated++;
        console.log(`✅ Updated: ${doc.slug}`);
      }
    }

    console.log(`🎯 Done! Updated ${totalUpdated} / ${docs.length} documents.`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();
