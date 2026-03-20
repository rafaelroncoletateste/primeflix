import { useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";

export default function Favoritos() {
  const [filmes, setFilmes] = useState(() => {
    const meusFilmes = localStorage.getItem("@primeflix");
    return meusFilmes ? JSON.parse(meusFilmes) : [];

    // Usamos uma função dentro do useState; lemos o localStorage; converteu para JSON
  });

  return (
    <div className="meus-filmes">
      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <span>{filme.title}</span>

              <div>
                <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                <button>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
