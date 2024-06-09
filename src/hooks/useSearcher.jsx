import { React, useEffect, useRef, useState } from "react";
export function useSearcher() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const firstRender = useRef(true);
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = search === "";
        return;
      }
      if (search === "") {
        setError("Write a movie... ");
        return;
      }
      if (search.length < 3) {
        setError("Search with more than 3 workds");
        return;
      }
      setError(null);
    }, [search]);
    return { search, setSearch, error };
  }