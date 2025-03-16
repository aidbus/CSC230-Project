import Pdf from "../Models/PdfModel.js";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadPdf = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file_url = req.file.path;

    console.log("Uploading PDF with the following details:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("File URL:", file_url);
    console.log("User ID:", req.user.id);

    const pdf = new Pdf({
      user_id: req.user.id,
      title,
      description,
      file_url,
    });

    await pdf.save();
    console.log("PDF uploaded successfully:", pdf);
    res.status(201).json({ message: "PDF uploaded successfully", pdf });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({ user_id: req.user.id });
    console.log("Retrieved PDFs for user ID:", req.user.id, pdfs);
    res.status(200).json(pdfs);
  } catch (error) {
    console.error("Error retrieving PDFs:", error);
    res.status(500).json({ error: error.message });
  }
};

export const uploadMiddleware = (req, res, next) => {
  console.log("Upload middleware called");
  upload.single("pdf")(req, res, next);
};