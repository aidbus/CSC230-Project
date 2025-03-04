import React from "react";
import SearchBar from "../components/SearchBar"; // Import the SearchBar

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Academic Journal</h1>
      <p>Search for publications below:</p>
      <SearchBar /> {/* Add SearchBar here */}
    </div>
  );
};

export default HomePage;