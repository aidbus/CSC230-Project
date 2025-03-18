import React, { useState } from "react";
import "./UploadPage.css"; // Ensure styles are applied

function UploadPage() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setMessage(""); // Clear previous messages
  };

  // Drag and Drop handlers
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
    setMessage(""); // Clear previous messages
  };

  // Handle Upload to Backend
  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("http://localhost:4000/api/pdf/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Upload successful: ${data.filename}`);
        setFile(null);
        setDescription("");
      } else {
        setMessage(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Upload error, check console.");
      console.error("Upload Error:", error);
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
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="file-input" />
      </div>

      {/* Description Input */}
      <textarea
        placeholder="Enter a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>

      {/* Display Upload Message */}
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
}

export default UploadPage;

