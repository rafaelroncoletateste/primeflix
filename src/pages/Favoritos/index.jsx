import { useState } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";

export default function Favoritos() {
  const [filmes, setFilmes] = useState(() => {
    const meusFilmes = localStorage.getItem("@primeflix");
    return meusFilmes ? JSON.parse(meusFilmes) : [];

    // Usamos uma função dentro do useState; lemos o localStorage; converteu para JSON
  });

  function handleDeleteMovie(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    }); // Devolve todos os filmes sem o ID especificado

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));

    alert("Filme excluído com sucesso!");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes</h1>

      {filmes.length === 0 && <span>Você não possui filmes salvos!</span>}

      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <span>{filme.title}</span>

              <div>
                <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                <button onClick={() => handleDeleteMovie(filme.id)}>
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
