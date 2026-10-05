export default function MovieCard({ movie }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
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

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-bold text-brand">
            <span aria-hidden="true">★ </span>
            Nota {movie.rating.toFixed(1)}
          </span>

          <span className="text-stone-400">
            {movie.year}
          </span>
        </div>

        <p className="mt-4 leading-relaxed text-stone-400">
          {movie.overview}
        </p>
      </div>
    </article>
  );
}