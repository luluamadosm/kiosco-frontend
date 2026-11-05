import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="card">
      <span className="tag">{product.category}</span>
      <h3>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="price">${product.price}</p>
      <button className="btn btn-primary" onClick={() => addToCart(product, 1)}>
        Agregar al carrito
      </button>
    </article>
  );
}

export default ProductCard;
