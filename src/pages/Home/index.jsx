import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./home.css";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  const chaveAPI = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: chaveAPI,
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10)); // Pega os dez primeiros filmes
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Filmes, por favor aguarde!</h2>
      </div>
    );
  }

  return (
    <main className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`} target="_blank">
                Acessar
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
