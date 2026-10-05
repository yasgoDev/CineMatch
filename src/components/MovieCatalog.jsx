import { useEffect, useState } from "react";

import { fetchMovies } from "../services/movies.js";
import MovieCard from "./MovieCard.jsx";

export default function MovieCatalog() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      setStatus("loading");
      setError("");

      try {
        const data = await fetchMovies({
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        setMovies(data);
        setStatus("success");
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro ao carregar os filmes."
        );

        setStatus("error");
      }
    }

    loadMovies();

    return () => {
      controller.abort();
    };
  }, [attempt]);

  function handleRetry() {
    setAttempt((currentAttempt) => currentAttempt + 1);
  }

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-title"
      className="pb-16"
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand">
        Explore novas histórias
      </p>

      <h2
        id="catalog-title"
        className="text-3xl font-bold sm:text-4xl"
      >
        Escolha sua próxima sessão.
      </h2>

      <p className="mt-4 max-w-2xl leading-relaxed text-stone-400">
        Catálogo de demonstração com filmes fictícios.
      </p>

      <div
        className="mt-10"
        aria-busy={status === "loading"}
      >
        {status === "loading" && (
          <p
            role="status"
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-stone-300"
          >
            Carregando filmes…
          </p>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-8">
            <p role="alert" className="text-red-200">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 rounded-full bg-brand px-5 py-3 font-bold text-stone-950 hover:bg-lime-300"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {status === "success" && movies.length === 0 && (
          <p
            role="status"
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-stone-300"
          >
            Nenhum filme disponível no momento.
          </p>
        )}

        {status === "success" && movies.length > 0 && (
          <>
            <p className="mb-5 text-sm text-stone-500">
              {movies.length} filmes disponíveis
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}