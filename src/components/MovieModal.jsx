import { useEffect, useRef } from "react";

export default function MovieModal({ movie, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (movie && !dialog.open) {
      dialog.showModal();
    }

    if (!movie && dialog.open) {
      dialog.close();
    }
  }, [movie]);

  function handleCancel(event) {
    event.preventDefault();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="movie-modal-title"
      onCancel={handleCancel}
      onClose={onClose}
      className="movie-modal"
    >
      {movie && (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                Detalhes do filme
              </p>

              <h2
                id="movie-modal-title"
                className="mt-3 text-3xl font-black"
              >
                {movie.title}
              </h2>
            </div>

            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Fechar detalhes do filme"
              className="shrink-0 rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
            >
              Fechar ×
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1">
              {movie.genre}
            </span>

            <span className="rounded-full bg-white/10 px-3 py-1">
              Ano: {movie.year}
            </span>

            <span className="rounded-full bg-brand/10 px-3 py-1 font-bold text-brand">
              <span aria-hidden="true">★ </span>
              Nota: {movie.rating.toFixed(1)}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold">
              Sinopse
            </h3>

            <p className="mt-3 leading-relaxed text-stone-300">
              {movie.overview}
            </p>
          </div>

          <p className="mt-8 border-t border-white/10 pt-4 text-xs text-stone-500">
            Filme fictício usado para demonstração do CineMatch.
          </p>
        </div>
      )}
    </dialog>
  );
}