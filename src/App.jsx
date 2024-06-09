import "./App.css";
import { useSearcher } from "./hooks/useSearcher";
import { Movies } from "../components/Movies";
import { useMovies } from "./hooks/useMovies";

export function App() {
  const { search, setSearch, error } = useSearcher();
  const { movies, getMovie } = useMovies({ search });

  function handleSubmite(e) {
    e.preventDefault();
    getMovie(search);
  }
  function handleCHange(event) {
    const newValue = event.target.value;
    if (newValue.startsWith(" ")) return;
    setSearch(newValue);
  }

  return (
    <>
      <header>
        <img style={{ width: "200px", height:"200px"}} src="MovieSearcher.png" alt="icon" />

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
          <div>
            <button>Search</button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </>
  );
}
