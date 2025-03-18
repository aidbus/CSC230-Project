import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
import { Readable } from "stream";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();

const router = express.Router();
router.use(cookieParser()); // Ensure cookies can be read

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

// Middleware to verify user authentication
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await User.findById(data.id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = user; // Store user info in request
      next();
    });
  } catch (error) {
    console.error("❌ Authentication Error:", error);
    res.status(500).json({ error: "Server error during authentication" });
  }
};

// Upload PDF with user ownership tracking
router.post("/upload-pdf", authenticateUser, upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📄 Upload request received:", req.file.originalname);

    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = gridFSBucket.openUploadStream(req.file.originalname, {
      metadata: { uploadedBy: req.user._id }, // Store user ID in metadata
    });

    readableStream.pipe(uploadStream);

    uploadStream.on("error", (error) => {
      console.error("❌ GridFS Upload Error:", error);
      return res.status(500).json({ error: "Upload failed" });
    });

    uploadStream.on("finish", () => {
      console.log("✅ File successfully uploaded:", req.file.originalname);
      res.status(201).json({
        message: "File uploaded successfully",
        filename: req.file.originalname,
      });
    });

  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "An error occurred while uploading" });
  }
});

// Fetch all PDFs (Faculty Only)
router.get("/all", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "faculty") {
      return res.status(403).json({ error: "Access denied. Faculty only." });
    }

    const files = await conn.db.collection("pdfs.files").find().toArray();
    res.json(files);
  } catch (error) {
    console.error("❌ Error retrieving all PDFs:", error);
    res.status(500).json({ error: "Server error retrieving PDFs" });
  }
});

// Fetch PDFs uploaded by the logged-in student
router.get("/my-pdfs", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Access denied. Students only." });
    }

    const files = await conn.db.collection("pdfs.files").find({ "metadata.uploadedBy": req.user._id }).toArray();
    res.json(files);
  } catch (error) {
    console.error("❌ Error retrieving student PDFs:", error);
    res.status(500).json({ error: "Server error retrieving PDFs" });
  }
});

// Stream a specific PDF by file ID
router.get("/view/:fileId", authenticateUser, async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const file = await conn.db.collection("pdfs.files").findOne({ _id: fileId });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Ensure students can only view their own PDFs
    if (req.user.role === "student" && file.metadata.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Access denied. You can only view your own PDFs." });
    }

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `inline; filename="${file.filename}"`);

    const downloadStream = gridFSBucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (error) {
    console.error("❌ Error streaming file:", error);
    res.status(500).json({ error: "An error occurred while retrieving the file" });
  }
});

export default router;
