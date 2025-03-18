import React, { useEffect, useState } from "react";
import "./ReviewPage.css"; // Ensure styles are applied

function ReviewPage() {
  const [submissions, setSubmissions] = useState([]);

  // Fetch all uploaded PDFs (Faculty only)
  useEffect(() => {
    fetch("http://localhost:4000/api/pdf/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedSubmissions = data.map(pdf => ({
          id: pdf._id,
          title: pdf.filename,
          description: "Student-submitted research paper.",
          status: "Pending"
        }));
        setSubmissions(formattedSubmissions);
      })
      .catch((err) => console.error("Error fetching PDFs:", err));
  }, []);

  // Handle Approve/Reject Actions
  const handleAction = (id, newStatus) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status: newStatus } : sub
    ));
  };

  return (
    <div className="review-container">
      <h2>Review Submissions</h2>
      
      {submissions.length === 0 ? <p>No submissions found.</p> : (
        submissions.map((submission) => (
          <div key={submission.id} className="review-card">
            <h3>{submission.title}</h3>
            <p>{submission.description}</p>
            <p>Status: <span className={`status ${submission.status.toLowerCase()}`}>{submission.status}</span></p>

            <div className="button-group">
              <a
                href={`http://localhost:4000/api/pdf/view/${submission.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
              >
                View PDF
              </a>
              <button className="approve-btn" onClick={() => handleAction(submission.id, "Approved")}>Approve</button>
              <button className="reject-btn" onClick={() => handleAction(submission.id, "Rejected")}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewPage;

