import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UploadPage.css"; // Ensure styles are applied

function UploadPage() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.warn("⚠️ Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("description", description);

    try {
      const response = await axios.post("/api/pdfs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", response.data);
      toast.success("✅ File uploaded successfully!");
      setFile(null);
      setDescription("");
    } catch (error) {
      console.error("Error uploading file", error);
      toast.error("❌ Error uploading file");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Publication</h2>

      {/* Drag and Drop Upload Box */}
      <div 
        className={`upload-box ${dragging ? "dragging" : ""}`} 
        onDragOver={handleDragOver} 
        onDragLeave={handleDragLeave} 
        onDrop={handleDrop}
      >
        {file ? (
          <p>📄 {file.name}</p>
        ) : (
          <p>Drag & Drop a file here or <label className="file-label">Click to select</label></p>
        )}
        <input type="file" onChange={handleFileChange} className="file-input" />
      </div>

      {/* Description Input */}
      <textarea
        placeholder="Enter a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button onClick={handleSubmit} disabled={!file}>
        Upload
      </button>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default UploadPage;
