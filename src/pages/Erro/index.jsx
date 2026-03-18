import { Link } from "react-router-dom";

import "./erro.css";

export default function Erro() {
  return (
    <div className="not-found">
      <h1>Página não encontrada!</h1>

      <Link to="/">Veja Todos os Filmes</Link>
    </div>
  );
}
