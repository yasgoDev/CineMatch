import { useEffect, useState } from "react";

const STORAGE_KEY = "cinematch-tmdb-watchlist-v1";

function readSavedIds() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return [
      ...new Set(
        parsedValue.filter((id) => Number.isInteger(id))
      ),
    ];
  } catch {
    return [];
  }
}

export default function useWatchlist() {
  const [savedIds, setSavedIds] = useState(readSavedIds);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedIds)
      );

      setStorageError("");
    } catch {
      setStorageError(
        "Não foi possível salvar a lista neste navegador. As alterações permanecerão apenas nesta sessão."
      );
    }
  }, [savedIds]);

  function isSaved(movieId) {
    return savedIds.includes(movieId);
  }

  function toggleMovie(movieId) {
    setSavedIds((currentIds) => {
      if (currentIds.includes(movieId)) {
        return currentIds.filter((id) => id !== movieId);
      }

      return [...currentIds, movieId];
    });
  }

  return {
    savedIds,
    isSaved,
    toggleMovie,
    storageError,
  };
}