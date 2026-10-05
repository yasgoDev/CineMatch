export default function MovieCard({ movie, onDetails }) {
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
        <span className="w-fit rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
          {movie.genre}
        </span>

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

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onDetails(movie)}
            aria-label={`Ver detalhes de ${movie.title}`}
            className="w-full rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 font-bold text-brand transition-colors hover:bg-brand/20"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
}