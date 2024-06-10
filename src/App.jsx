import { useCallback, useState } from "react";

import "./App.css";
import { useSearcher } from "./hooks/useSearcher";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

export function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearcher();
  const { movies, loading, getMovie } = useMovies({ search, sort });

  const debounceSearchMovie = useCallback(
    debounce((search) => {
      console.log("debounce");
      getMovie({ search });
    }, 500),
    []
  );

  function handleSubmite(e) {
    e.preventDefault();
    getMovie({ search });
  }
  function handleCHange(event) {
    const newSearch = event.target.value;
    if (newSearch.startsWith(" ")) return;
    setSearch(newSearch);
    debounceSearchMovie(newSearch);
  }
  function handleSort(params) {
    setSort(!sort);
  }
  return (
    <>
      <header>
        <img
          style={{ width: "200px", height: "200px" }}
          src="MovieSearcher.png"
          alt="icon"
        />

        <h1>Movies Searcher</h1>

        <form onSubmit={handleSubmite}>
          <input
            onChange={handleCHange}
            value={search}
            style={{
              border: "solid 3px transparent",
              borderColor: error ? "red" : "transparent",
            }}
            placeholder="Matrix, Titanic..."
          ></input>
          <p>Order By Title</p>

          <input type="checkbox" onChange={handleSort}></input>
          <div>
            <button>Search</button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </>
  );
}
