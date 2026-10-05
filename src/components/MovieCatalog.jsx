import { useEffect, useState } from "react";

import { fetchMovies } from "../services/movies.js";
import useWatchlist from "../hooks/useWatchlist.js";

import MovieCard from "./MovieCard.jsx";
import MovieModal from "./MovieModal.jsx";

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export default function MovieCatalog() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [view, setView] = useState("catalog");

  const {
    savedIds,
    isSaved,
    toggleMovie,
    storageError,
  } = useWatchlist();

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

  const genres = [...new Set(movies.map((movie) => movie.genre))]
    .sort((first, second) => first.localeCompare(second, "pt-BR"));

  const savedMovies = movies.filter((movie) =>
    savedIds.includes(movie.id)
  );

  const showingWatchlist = view === "watchlist";

  const currentMovies = showingWatchlist
    ? savedMovies
    : movies;

  const normalizedSearch = normalizeText(search);

  const filteredMovies = currentMovies.filter((movie) => {
    const matchesTitle = normalizeText(movie.title)
      .includes(normalizedSearch);

    const matchesGenre =
      selectedGenre === "" || movie.genre === selectedGenre;

    return matchesTitle && matchesGenre;
  });

  const hasFilters =
    normalizedSearch !== "" || selectedGenre !== "";

  function handleRetry() {
    setAttempt((currentAttempt) => currentAttempt + 1);
  }

  function handleClearFilters() {
    setSearch("");
    setSelectedGenre("");
  }

  function handleChangeView(nextView) {
    setView(nextView);
    handleClearFilters();
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  const activeViewClass =
    "rounded-full bg-brand px-5 py-3 text-sm font-bold text-stone-950";

  const inactiveViewClass =
    "rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-stone-300 transition-colors hover:bg-white/5";

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-title"
      className="pb-16"
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand">
        {showingWatchlist
          ? "Suas próximas histórias"
          : "Explore novas histórias"}
      </p>

      <h2
        id="catalog-title"
        className="text-3xl font-bold sm:text-4xl"
      >
        {showingWatchlist
          ? "Sua lista: Quero assistir."
          : "Escolha sua próxima sessão."}
      </h2>

      <p className="mt-4 max-w-2xl leading-relaxed text-stone-400">
        {showingWatchlist
          ? "Os filmes que você salvou para assistir depois."
          : "Busque um título ou explore os filmes pelo seu gênero favorito."}
      </p>

      <p className="mt-2 text-sm text-stone-500">
        Catálogo de demonstração com filmes fictícios.
      </p>

      {status === "success" && (
        <div
          role="group"
          aria-label="Escolher visualização"
          className="mt-8 flex flex-wrap gap-3"
        >
          <button
            type="button"
            onClick={() => handleChangeView("catalog")}
            aria-pressed={!showingWatchlist}
            className={
              !showingWatchlist
                ? activeViewClass
                : inactiveViewClass
            }
          >
            Todos os filmes
          </button>

          <button
            type="button"
            onClick={() => handleChangeView("watchlist")}
            aria-pressed={showingWatchlist}
            className={
              showingWatchlist
                ? activeViewClass
                : inactiveViewClass
            }
          >
            Quero assistir ({savedMovies.length})
          </button>
        </div>
      )}

      {storageError && (
        <p
          role="status"
          className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-200"
        >
          {storageError}
        </p>
      )}

      {status === "success" && currentMovies.length > 0 && (
        <div className="mt-8 grid items-end gap-4 md:grid-cols-[1fr_220px_auto]">
          <div>
            <label
              htmlFor="movie-search"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Buscar por título
            </label>

            <input
              id="movie-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex.: Além das Estrelas"
              className="w-full rounded-xl border border-white/20 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500"
            />
          </div>

          <div>
            <label
              htmlFor="movie-genre"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Gênero
            </label>

            <select
              id="movie-genre"
              value={selectedGenre}
              onChange={(event) =>
                setSelectedGenre(event.target.value)
              }
              className="w-full rounded-xl border border-white/20 bg-stone-900 px-4 py-3 text-white"
            >
              <option value="">Todos os gêneros</option>

              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            disabled={!hasFilters && search === ""}
            className="rounded-xl border border-white/20 px-5 py-3 font-medium transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Limpar filtros
          </button>
        </div>
      )}

      <div
        className="mt-8"
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

        {status === "success" && currentMovies.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
            <h3 className="text-xl font-bold">
              {showingWatchlist
                ? "Sua lista ainda está vazia."
                : "Nenhum filme disponível no momento."}
            </h3>

            {showingWatchlist && (
              <>
                <p className="mt-3 text-stone-400">
                  Explore o catálogo e adicione os filmes que deseja
                  assistir.
                </p>

                <button
                  type="button"
                  onClick={() => handleChangeView("catalog")}
                  className="mt-5 rounded-full bg-brand px-5 py-3 font-bold text-stone-950 hover:bg-lime-300"
                >
                  Explorar filmes
                </button>
              </>
            )}
          </div>
        )}

        {status === "success" && currentMovies.length > 0 && (
          <>
            <p
              role="status"
              className="mb-5 text-sm text-stone-400"
            >
              {filteredMovies.length === 1
                ? "1 filme encontrado"
                : `${filteredMovies.length} filmes encontrados`}
            </p>

            {filteredMovies.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onDetails={setSelectedMovie}
                    onToggleWatchlist={toggleMovie}
                    isSaved={isSaved(movie.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <h3 className="text-xl font-bold">
                  Nenhum filme corresponde à sua busca.
                </h3>

                <p className="mt-3 text-stone-400">
                  Experimente outro título ou selecione outro gênero.
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-5 rounded-full bg-brand px-5 py-3 font-bold text-stone-950 hover:bg-lime-300"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <MovieModal
        movie={selectedMovie}
        onClose={handleCloseModal}
      />
    </section>
  );
}