import { useState } from "react";
import withResults from "../mocks/moviesFound.json";
import withoutResults from "../mocks/moviesNotFound.json";

export function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState([]);

  const movies = responseMovies.Search;
  const moviesMapped = movies?.map((movie) => ({
    title: movie.Title,
    type: movie.Type,
    poster: movie.Poster,
    year: movie.Year,
    imdbID: movie.imdbID
  }));
  const getMovie = () => {
    if (search) {
      /* setResponseMovies(withResults); */
      fetch(`https://www.omdbapi.com/?apikey=61d70b58&s=${search}`)
        .then((resp) => resp.json())
        .then((data) => setResponseMovies(data));
    } else {
      setResponseMovies(withoutResults);
    }
  };
  return { movies: moviesMapped, getMovie };
}
