import { Router } from "express";
import { uploadPdf, getPdfs, uploadMiddleware } from "../Controllers/PdfController.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const router = Router();

router.post("/upload", userVerification, uploadMiddleware, uploadPdf);
router.get("/", userVerification, getPdfs);

export default router;