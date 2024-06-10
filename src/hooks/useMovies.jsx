import { useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovie = async () => {
    try {
      setError(null);
      setLoading(true);
      const newMovie = await searchMovies({ search });
      setMovies(newMovie);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { movies,loading, getMovie };
}
