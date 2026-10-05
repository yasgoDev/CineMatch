export async function fetchMovies({ signal } = {}) {
  let response;

  try {
    response = await fetch("/api/movies", { signal });
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    throw new Error(
      "Não foi possível conectar. Confira se o Vite e o servidor Node estão rodando."
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error ||
        "Não foi possível carregar os filmes. Confira o servidor Node."
    );
  }

  if (!Array.isArray(data)) {
    throw new Error(
      "O servidor retornou um catálogo inválido."
    );
  }

  return data;
}