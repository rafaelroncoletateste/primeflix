import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./filme.css";
import { toast } from "react-toastify";

export default function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        .catch(() => {
          navigate("/", { replace: true }); // Navega o usuário para a página inicial caso não encontre o filme
          return;
        });
    }

    loadMovie();
  }, [navigate, id]);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Acessando Filme!</h1>
      </div>
    );
  }

  function saveMovie() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const temFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id,
    );

    if (temFilme) {
      toast.warn("Esse filme já está na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));

    toast.success("Filme salvo com sucesso!");
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

      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
            target="_blank"
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
