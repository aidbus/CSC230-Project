import mongoose from "mongoose";

const pdfReviewSchema = new mongoose.Schema({
  fileId: mongoose.Schema.Types.ObjectId,  // Reference to GridFS file _id
  filename: String,  // Store for convenience
  reviewed: { 
    type: Boolean, 
    default: false 
},  // False until reviewed
  status: { type: String, 
    enum: ["pending", "approved", "denied"], 
    default: "pending" 
},
  reviewedBy: String,  // Store reviewer’s name or ID
  reviewedAt: Date,  // Timestamp of review
  comments: String,  // Optional: Reviewer comments
});

const PdfReview = mongoose.model("PdfReview", pdfReviewSchema);

export default PdfReview;
