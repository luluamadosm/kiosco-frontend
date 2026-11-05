import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/api";
import type { Product } from "../types";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");
    setQuantity(1);

    getProductById(Number(id))
      .then((data) => {
        if (!ignore) setProduct(data);
      })
      .catch(() => {
        if (!ignore) setError("No se pudo cargar el producto. Intentá de nuevo.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return (
      <section>
        <p className="error">{error}</p>
        <Link to="/products" className="btn">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (!product) {
    return (
      <section>
        <h1>Producto no encontrado</h1>
        <Link to="/products" className="btn">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="detail">
      <h1>{product.name}</h1>
      <p>
        <strong>Categoría:</strong> {product.category}
      </p>
      <p>
        <strong>Precio:</strong> ${product.price}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <p>{product.description}</p>

      <div className="add-form">
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.min(Math.max(Number(e.target.value), 1), product.stock))}
        />
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product, quantity)}
          disabled={product.stock === 0}
        >
          Agregar al carrito
        </button>
      </div>

      <Link to="/products" className="btn">
        Volver al catálogo
      </Link>
    </section>
  );
}

export default ProductDetail;
