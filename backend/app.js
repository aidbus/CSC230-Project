import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/AuthRoute.js";
import pdfRoutes from "./Routes/PdfRoute.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pdfs", pdfRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;