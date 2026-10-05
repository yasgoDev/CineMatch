import http from "node:http";

const PORT = 3001;
const TMDB_TOKEN = process.env.TMDB_TOKEN;

async function requestTMDB(endpoint) {
  const url = new URL(
    `https://api.themoviedb.org/3/${endpoint}`
  );

  url.searchParams.set("language", "pt-BR");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Token inválido. Confira o TMDB_TOKEN e reinicie o servidor."
      );
    }

    throw new Error(
      `O TMDB respondeu com erro HTTP ${response.status}.`
    );
  }

  return response.json();
}

function sendJSON(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(data));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(
    request.url,
    `http://localhost:${PORT}`
  );

  if (
    request.method !== "GET" ||
    url.pathname !== "/api/movies"
  ) {
    sendJSON(response, 404, {
      error: "Rota não encontrada.",
    });

    return;
  }

  if (!TMDB_TOKEN) {
    sendJSON(response, 503, {
      error:
        "Configure TMDB_TOKEN no arquivo .env e reinicie o servidor.",
    });

    return;
  }

  try {
    const [catalog, genreData] = await Promise.all([
      requestTMDB("movie/popular"),
      requestTMDB("genre/movie/list"),
    ]);

    const genreNames = new Map(
      genreData.genres.map((genre) => [
        genre.id,
        genre.name,
      ])
    );

    const movies = catalog.results
      .filter((movie) => !movie.adult)
      .map((movie) => {
        const parsedYear = Number(
          movie.release_date?.slice(0, 4)
        );

        return {
          id: movie.id,
          title: movie.title || movie.original_title,
          year: parsedYear || "Não informado",
          genre:
            genreNames.get(movie.genre_ids?.[0]) ||
            "Sem gênero",
          rating: Number(movie.vote_average) || 0,
          overview:
            movie.overview || "Sinopse indisponível.",
          posterColor: "#233b27",
          posterUrl: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
        };
      });

    sendJSON(response, 200, movies);
  } catch (error) {
    console.error("Falha na consulta ao TMDB:", error.message);

    sendJSON(response, 502, {
      error:
        error.name === "TimeoutError"
          ? "O TMDB demorou para responder. Tente novamente."
          : "Não foi possível consultar o TMDB. Confira o terminal do servidor.",
    });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(
    `Servidor CineMatch: http://localhost:${PORT}`
  );
});