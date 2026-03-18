import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

export default function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  const chaveAPI = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: chaveAPI,
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    loadMovie();
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Acessando Filme!</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <p>{filme.overview}</p>

      <strong>Avaliação: {filme.vote_average} / 10</strong>
    </div>
  );
}
