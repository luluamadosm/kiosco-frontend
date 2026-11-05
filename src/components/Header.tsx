import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          Kiosco El Rápido
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/products">Productos</NavLink>
          <NavLink to="/cart">Carrito ({totalItems})</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
