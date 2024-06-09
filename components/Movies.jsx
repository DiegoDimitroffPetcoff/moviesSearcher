function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies?.map((movie) => (
        <li className="movie" key={movie.imdbID}>
          <h1>{movie.title}</h1>
          <h3>
            {movie.type} - {movie.year}
          </h3>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}
function NoMoviesResoult() {
  return <p className="movie">"Movie not Found"</p>;
}
export function Movies({ movies }) {

  const hasMovies = movies?.length > 0;
  return (
    <> {hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResoult />}</>
  );
}
