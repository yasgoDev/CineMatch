export async function fetchMovies({ signal } = {}) {
  const url = `${import.meta.env.BASE_URL}data/movies.json`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Não foi possível carregar o catálogo. Código HTTP: ${response.status}.`
    );
  }

  const movies = await response.json();

  if (!Array.isArray(movies)) {
    throw new Error("O catálogo precisa conter uma lista de filmes.");
  }

  const validMovies = movies.every(
    (movie) =>
      movie &&
      Number.isInteger(movie.id) &&
      typeof movie.title === "string" &&
      typeof movie.year === "number" &&
      typeof movie.genre === "string" &&
      typeof movie.rating === "number" &&
      typeof movie.overview === "string" &&
      typeof movie.posterColor === "string"
  );

  if (!validMovies) {
    throw new Error("Existem filmes com campos inválidos no catálogo.");
  }

  return movies;
}