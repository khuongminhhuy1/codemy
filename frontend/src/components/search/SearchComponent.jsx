// components/CourseSearchComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CourseSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?q=${searchTerm}`);
      const searchResults = response.data;
      
      // Navigate to the search results page with the search results
      navigate('/search', { state: { searchResults } });
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CourseSearchComponent;



