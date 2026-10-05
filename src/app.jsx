import MovieCatalog from "./components/MovieCatalog.jsx";

const features = [
  {
    number: "01",
    title: "Descubra novos filmes",
    description:
      "Explore filmes populares e encontre opções para sua próxima sessão.",
  },
  {
    number: "02",
    title: "Encontre seu estilo",
    description:
      "Busque por título e filtre os filmes carregados pelos gêneros que você gosta.",
  },
  {
    number: "03",
    title: "Guarde suas escolhas",
    description:
      "Monte sua lista de filmes que deseja assistir e consulte depois.",
  },
];

function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <a
          href="#inicio"
          aria-label="CineMatch — início"
          className="text-2xl font-black tracking-tight"
        >
          Cine<span className="text-brand">Match</span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="flex flex-wrap gap-6 text-sm text-stone-300"
        >
          <a
            href="#como-funciona"
            className="transition-colors hover:text-brand"
          >
            Como funciona
          </a>

          <a
            href="#catalogo"
            className="transition-colors hover:text-brand"
          >
            Explorar
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24"
    >
      <div>
        <p className="mb-5 text-sm font-bold uppercase tracking-widest text-brand">
          Sua próxima sessão começa aqui
        </p>

        <h1
          id="hero-title"
          className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Menos tempo escolhendo.

          <span className="mt-2 block text-brand">
            Mais histórias para descobrir.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-400">
          Encontre filmes, explore seus gêneros favoritos e organize
          tudo o que você quer assistir em um só lugar.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#catalogo"
            className="rounded-full bg-brand px-6 py-3 font-bold text-stone-950 transition-colors hover:bg-lime-300"
          >
            Explorar catálogo
          </a>

          <a
            href="#como-funciona"
            className="rounded-full border border-white/20 px-6 py-3 font-bold transition-colors hover:bg-white/5"
          >
            Conhecer o CineMatch
          </a>
        </div>

        <p className="mt-6 text-sm text-stone-500">
          Descubra. Escolha. Salve para depois.
        </p>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-4 rounded-3xl bg-brand/10 blur-2xl"
        />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-stone-900 shadow-2xl">
          <div className="flex aspect-[4/3] flex-col justify-end bg-gradient-to-br from-lime-900 via-stone-900 to-stone-950 p-8">
            <span className="mb-4 w-fit rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              Explore o catálogo
            </span>

            <p className="text-4xl font-black leading-tight">
              Cada filme,
              <br />
              uma nova descoberta.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-300">
              Conheça filmes populares, consulte suas sinopses e
              salve suas escolhas para assistir depois.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
            <span className="text-sm text-stone-400">
              Seu próximo favorito está por aí.
            </span>

            <span className="text-sm font-bold text-brand">
              CineMatch
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="features-title"
      className="border-t border-white/10 py-16"
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand">
        Simples de explorar
      </p>

      <h2
        id="features-title"
        className="text-3xl font-bold sm:text-4xl"
      >
        Da descoberta à sua lista.
      </h2>

      <p className="mt-4 max-w-2xl leading-relaxed text-stone-400">
        Encontre uma história que combina com você e guarde sua
        escolha para a próxima sessão.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.number}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <span className="text-sm font-bold text-brand">
              {feature.number}
            </span>

            <h3 className="mt-4 text-xl font-bold">
              {feature.title}
            </h3>

            <p className="mt-3 leading-relaxed text-stone-400">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <p className="text-sm text-stone-500">
            Cine<span className="text-brand">Match</span>
            {" "}· Projeto de portfólio
          </p>

          <p className="text-sm text-stone-500">
            Descubra o que assistir.
          </p>
        </div>

        <section
          aria-labelledby="credits-title"
          className="mt-6"
        >
          <h2
            id="credits-title"
            className="text-sm font-bold text-stone-300"
          >
            Sobre e créditos
          </h2>

          <a
            href="https://www.themoviedb.org/"
            className="mt-4 inline-block"
          >
            <img
              src={`${import.meta.env.BASE_URL}tmdb-logo.svg`}
              alt="The Movie Database"
              className="h-auto w-20"
            />
          </a>

          <p className="mt-3 text-xs leading-relaxed text-stone-400">
            This product uses the TMDB API but is not endorsed or
            certified by TMDB.
          </p>
        </section>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6">
        <Hero />
        <HowItWorks />
        <MovieCatalog />
      </main>

      <Footer />
    </>
  );
}