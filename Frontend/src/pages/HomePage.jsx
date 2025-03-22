import React, { useState } from "react";
import RecentSubmissions from "../components/RecentSubmissions";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Function to search approved PDFs
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/pdf/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("❌ Error searching PDFs:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Academic Journal</h1>
      <p>Search for approved publications below:</p>
      
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((pdf) => (
              <li key={pdf._id}>
                <a href={`http://localhost:4000/api/pdf/view/${pdf._id}`} target="_blank" rel="noopener noreferrer">
                  {pdf.filename}
                </a>
                <p><strong>Faculty Comment:</strong> {pdf.comment || "No comments"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {/* Add the Recently Approved Section below */}
      <RecentSubmissions />
    </div>
  );
};

export default HomePage;
