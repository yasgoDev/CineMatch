import { useState } from "react";

export default function MovieCard({
  movie,
  onDetails,
  onToggleWatchlist,
  isSaved,
}) {
  const [posterFailed, setPosterFailed] = useState(false);

  const showPoster = movie.posterUrl && !posterFailed;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="relative">
        {showPoster ? (
          <img
            src={movie.posterUrl}
            alt={`Pôster de ${movie.title}`}
            loading="lazy"
            onError={() => setPosterFailed(true)}
            className="aspect-[2/3] w-full object-cover"
          />
        ) : (
          <div
            className="flex aspect-[2/3] items-center justify-center p-6"
            style={{
              background: `linear-gradient(
                145deg,
                ${movie.posterColor},
                #101312
              )`,
            }}
          >
            <p className="text-center text-3xl font-black">
              {movie.title}
            </p>
          </div>
        )}

        {isSaved && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-stone-950">
            Na sua lista
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold">
          {movie.title}
        </h3>

        <p className="mt-2 text-sm text-stone-400">
          {movie.genre} · {movie.year}
        </p>

        <p className="mt-3 text-sm font-bold text-brand">
          <span aria-hidden="true">★ </span>
          Nota {movie.rating.toFixed(1)}
        </p>

        <p className="mt-4 line-clamp-3 leading-relaxed text-stone-400">
          {movie.overview}
        </p>

        <div className="mt-auto space-y-3 pt-5">
          <button
            type="button"
            onClick={() => onDetails(movie)}
            aria-label={`Ver detalhes de ${movie.title}`}
            className="w-full rounded-xl border border-white/20 px-4 py-3 font-bold hover:bg-white/5"
          >
            Ver detalhes
          </button>

          <button
            type="button"
            onClick={() => onToggleWatchlist(movie.id)}
            aria-pressed={isSaved}
            aria-label={
              isSaved
                ? `Remover ${movie.title} da lista Quero assistir`
                : `Adicionar ${movie.title} à lista Quero assistir`
            }
            className={
              isSaved
                ? "w-full rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 font-bold text-brand hover:bg-brand/20"
                : "w-full rounded-xl bg-brand px-4 py-3 font-bold text-stone-950 hover:bg-lime-300"
            }
          >
            {isSaved
              ? "✓ Remover da lista"
              : "+ Quero assistir"}
          </button>
        </div>
      </div>
    </article>
  );
}