import { useEffect, useState } from "react";

import api from "../../services/api";

export default function Home() {
  const [filmes, setFilmes] = useState([]);

  const chaveAPI = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function loadMovies() {
      await api.get("movie/now_playing", {
        params: {
          api_key: chaveAPI,
          language: "pt-BR",
          page: 1,
        },
      });
    }

    loadMovies();
  }, []);

  return (
    <div>
      <h1>Página Home</h1>
    </div>
  );
}
