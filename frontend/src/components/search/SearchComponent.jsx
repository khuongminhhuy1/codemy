// components/CourseSearchComponent.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?q=${searchTerm}`);
      const searchResults = response.data;

      // Navigate to the search results page with the search results
      navigate("/search", { state: { searchResults } });
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border w-[300px] rounded-s-lg pl-3"
      />
      <button
        onClick={handleSearch}
        className="border rounded-e-lg h-[26px] px-4 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
      >
        Search
      </button>
    </div>
  );
};

export default CourseSearchComponent;
