import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>404 – Página no encontrada</h1>
      <Link to="/" className="btn">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
