import React from "react";
import SearchBar from "../components/SearchBar"; // Import the SearchBar
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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