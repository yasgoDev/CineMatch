export default function MovieCard({
  movie,
  onDetails,
  onToggleWatchlist,
  isSaved,
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div
        className="flex aspect-[2/3] flex-col justify-between p-6"
        style={{
          background: `linear-gradient(
            145deg,
            ${movie.posterColor},
            #101312
          )`,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {movie.genre}
          </span>

          {isSaved && (
            <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-stone-950">
              Na sua lista
            </span>
          )}
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-white/60">
            CineMatch · Filme fictício
          </p>

          <h3 className="text-3xl font-black leading-tight text-white">
            {movie.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-bold text-brand">
            <span aria-hidden="true">★ </span>
            Nota {movie.rating.toFixed(1)}
          </span>

          <span className="text-stone-400">
            {movie.year}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 leading-relaxed text-stone-400">
          {movie.overview}
        </p>

        <div className="mt-auto space-y-3 pt-5">
          <button
            type="button"
            onClick={() => onDetails(movie)}
            aria-label={`Ver detalhes de ${movie.title}`}
            className="w-full rounded-xl border border-white/20 px-4 py-3 font-bold transition-colors hover:bg-white/5"
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
                ? "w-full rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 font-bold text-brand transition-colors hover:bg-brand/20"
                : "w-full rounded-xl bg-brand px-4 py-3 font-bold text-stone-950 transition-colors hover:bg-lime-300"
            }
          >
            {isSaved ? "✓ Remover da lista" : "+ Quero assistir"}
          </button>
        </div>
      </div>
    </article>
  );
}