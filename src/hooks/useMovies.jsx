import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previousSearch = useRef(search);

  const getMovie = useCallback(async ({ search }) => {
    console.log("useCallback");
    if (search === previousSearch.current) return;
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
  },[]);

  const sortedMovies = useMemo(() => {
    console.log("usememo");
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, loading, getMovie };
}
