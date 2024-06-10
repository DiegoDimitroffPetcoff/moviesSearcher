const API_KEY = "61d70b58";

export function searchMovies({ search }) {
  if (search === "") return;
  if (search) {
    return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
      .then((resp) => resp.json())
      .then((data) => {
        const movies = data.Search;

        const moviesMapped = movies?.map((movie) => ({
          title: movie.Title,
          type: movie.Type,
          poster: movie.Poster,
          year: movie.Year,
          imdbID: movie.imdbID,
        }));

        return moviesMapped;
      });
  } else {
    throw new Error("Error searching movies");
  }
}
