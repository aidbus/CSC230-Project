import { useState } from "react";

const SearchBar = () => {
  // State to hold search input
  const [query, setQuery] = useState("");

  // Dummy data for testing (to be replaced with database results)
  const publications = [
    "The Evolution of Criminal Law",
    "Hog 2.6 and its Broader Implications on Society",
    "Juvenile Delinquency Trends",
    "Understanding Forensic Psychology",
  ];

  // Filter publications based on user input
  const filteredPublications = publications.filter((pub) =>
    pub.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Search publications..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPublications.map((pub, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            {pub}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;