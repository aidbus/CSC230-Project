import React, { useState } from "react";
import "./ReviewPage.css"; // Ensure styles are applied

function ReviewPage() {
  const [submissions, setSubmissions] = useState([
    { id: 1, title: "Crime Analysis Report", description: "Detailed study on crime rates.", status: "Pending" },
    { id: 2, title: "Forensic Psychology", description: "Analysis of criminal behavior.", status: "Reviewed" }
  ]);

  const handleAction = (id, newStatus) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
  };

  return (
    <div className="review-container">
      <h2>Review Submissions</h2>
      
      {submissions.map((submission) => (
        <div key={submission.id} className="review-card">
          <h3>{submission.title}</h3>
          <p>{submission.description}</p>
          <p>Status: <span className={`status ${submission.status.toLowerCase()}`}>{submission.status}</span></p>
          
          <div className="button-group">
            <button className="approve-btn" onClick={() => handleAction(submission.id, "Approved")}>Approve</button>
            <button className="reject-btn" onClick={() => handleAction(submission.id, "Rejected")}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewPage;
