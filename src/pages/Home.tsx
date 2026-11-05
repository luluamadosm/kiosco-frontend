import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <h1>¡Bienvenido a Kiosco El Rápido!</h1>
      <p>Bebidas, snacks, golosinas y mucho más, a la vuelta de tu casa.</p>
      <Link to="/products" className="btn btn-primary btn-big">
        Ver catálogo
      </Link>
    </section>
  );
}

export default Home;
