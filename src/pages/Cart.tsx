import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/api";

function Cart() {
  const { items, totalPrice, clearCart } = useCart();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setSending(true);
    setMessage("");
    setError("");

    try {
      const order = await createOrder(
        items.map((item) => ({ product_id: item.product.id, quantity: item.quantity }))
      );
      clearCart();
      setMessage(`¡Pedido #${order.id} realizado con éxito! Total: $${order.total}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo finalizar el pedido.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section>
      <h1>Carrito</h1>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">No se pudo finalizar el pedido: {error}</p>}

      {items.length === 0 ? (
        <p>
          Tu carrito está vacío. <Link to="/products">Ver productos</Link>
        </p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </ul>

          <p className="total">Total: ${totalPrice}</p>

          <div className="actions">
            <button className="btn" onClick={clearCart} disabled={sending}>
              Vaciar carrito
            </button>
            <button className="btn btn-primary" onClick={handleCheckout} disabled={sending}>
              {sending ? "Enviando pedido..." : "Finalizar pedido"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
