"use client";
import { searchGifs } from "./giphy";
import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "./page.css";
import { useRouter } from "next/navigation";
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

const GiphySearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [gifs, setGifs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gifsPerPage = 4;
  const route = useRouter();

  // Debouncing effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Debounce delay of 500ms

    return () => clearTimeout(timer); // Cleanup the timer on query change
  }, [query]);

  // Fetch GIFs when the debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleSearch = async (searchQuery) => {
    try {
      const result = await searchGifs(searchQuery);
      setGifs(result);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching for GIFs:", error);
    }
  };

  const indexOfLastGif = currentPage * gifsPerPage;
  const indexOfFirstGif = indexOfLastGif - gifsPerPage;
  const currentGifs = gifs.slice(indexOfFirstGif, indexOfLastGif);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(gifs.length / gifsPerPage);
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const logout = () => {
    route.push('/');
  };

  return (
    <div>
      <div className="bar">
        <TextField
          className="giphy"
          type="text"
          placeholder="Search for GIFs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="btn" variant="contained" endIcon={<SendIcon />} onClick={() => handleSearch(query)}>
          Search
        </Button>
        <Button className="btn" variant="contained" endIcon={<LogoutIcon />} color="error" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="gifs">
        {currentGifs.map((gif) => (
          <div key={gif.id}>
            <img
              className="limit"
              src={gif.images.fixed_height.url}
              alt={gif.title}
            />
            <p className="titl">
              {gif.title}
            </p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Button variant="contained" onClick={handlePrevPage} color="error" disabled={currentPage === 1}>
          Prev
        </Button>
        {Array.from({ length: Math.ceil(gifs.length / gifsPerPage) }).map(
          (_, index) => (
            <Button variant="contained"
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </Button>
          )
        )}
        <Button variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(gifs.length / gifsPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GiphySearch;
