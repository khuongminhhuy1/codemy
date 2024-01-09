import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults || [];
  const navigate = useNavigate();

  return (
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center justify-center py-10">
      <div className=" bg-white w-11/12 rounded-md p-20">
        <h2 className="animate-fade-up text-xl py-8 uppercase font-black flex justify-center">
          Search Results
        </h2>
        {searchResults.map((result) => (
          <Link
            to={`/courses/${result._id}`}
            key={result._id}
            className="w-full"
          >
            <div className="w-full flex justify-evenly items-center border-2 rounded-lg border-gray-400 m-2 pt-3">
              <div className="flex flex-col">
                <h3 className="text-3xl">{result.name}</h3>
                <h3 className="text-xl">Instructor: {result.instructor}</h3>
              </div>
              <img
                className="rounded-lg md:w-[300px] lg:w-[400px] h-[225px] mr-16 ml-9 mb-5 z-0"
                src={`http://localhost:8080/images/${result.image}`}
                alt={result.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
