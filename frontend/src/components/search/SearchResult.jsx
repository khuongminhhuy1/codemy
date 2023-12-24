// components/SearchResultsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults || [];

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.map((result) => (
        <div key={result._id}>
          <h3>{result.name}</h3>
            <img
          className="rounded-lg md:w-[300px] lg:w-[400px] h-[225px] mr-16 ml-9 mb-5 z-0 "
          src={`http://localhost:8080/images/${result.image}`}
          alt={result.name}
        />

        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
