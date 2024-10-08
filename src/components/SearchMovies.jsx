import "./style.css";
import { useState, useEffect } from "react";
import GetMovies from "./GetMovies";
import axios from "axios";
import Pagination from "./Pagination";

const SearchMovies = () => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const lastIndex = currentPage * itemsPerPage;
  const firsIndex = lastIndex - itemsPerPage;

  const currentItems = movies.slice(firsIndex, lastIndex);

  const [initialMovies, setInitialMovies] = useState([]);
  const apiKey = "92c6bc6b8784698ea7f922ef581a7a74";

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            params: {
              api_key: apiKey,
            },
          }
        );
        setInitialMovies(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching the initial movies", error);
      }
    };

    fetchInitialMovies();
  }, []);

  const search = async (e) => {
    e.preventDefault();

    // `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: apiKey,
            query: searchInput,
          },
        }
      );

      setMovies(response.data.results);
      setSearchInput("");
    } catch (error) {
      console.error("Error fetching the movies", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="searchBox">
          <label htmlFor="search">
            <h1>Search Your favourite Movies</h1>
          </label>
          <form onSubmit={search}>
            <input
              type="text"
              id="search"
              placeholder="Search Movies Here"
              className="searchInputColor"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <GetMovies movies={currentItems} />
      <Pagination
        totalItems={movies.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default SearchMovies;
