import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const conn = mongoose.createConnection(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gridFSBucket;
conn.once("open", () => {
  gridFSBucket = new GridFSBucket(conn.db, { bucketName: "pdfs" });
  console.log("📁 GridFS Initialized");
});

export { conn, gridFSBucket };
