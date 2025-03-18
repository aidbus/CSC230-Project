
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

const router = express.Router();

const conn = mongoose.createConnection(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gridFSBucket;
conn.once("open", () => {
  gridFSBucket = new GridFSBucket(conn.db, { bucketName: "pdfs" });
  console.log("📁 GridFS Initialized");
});


const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📄 Upload request received:", req.file.originalname);

    
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

   
    const uploadStream = gridFSBucket.openUploadStream(req.file.originalname);
    readableStream.pipe(uploadStream);

    uploadStream.on("error", (error) => {
      console.error("❌ GridFS Upload Error:", error);
      return res.status(500).json({ error: "Upload failed" });
    });

    uploadStream.on("finish", () => {
      console.log("✅ File successfully uploaded to GridFS:", req.file.originalname);
      res.status(201).json({ message: "File uploaded successfully", filename: req.file.originalname });
    });

  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "An error occurred while uploading" });
  }
});


router.get("/pdf/:filename", async (req, res) => {
  try {
    const file = await conn.db.collection("pdfs.files").findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    
    const downloadStream = gridFSBucket.openDownloadStreamByName(req.params.filename);
    downloadStream.pipe(res);
    
    console.log(`📥 Sending file: ${req.params.filename}`);
  } catch (error) {
    console.error("❌ Retrieval Error:", error);
    res.status(500).json({ error: "An error occurred while retrieving the file" });
  }
});

export default router;