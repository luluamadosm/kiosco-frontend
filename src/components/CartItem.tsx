import type { CartItem as CartItemType } from "../types";
import { useCart } from "../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <li className="cart-item">
      <div>
        <strong>{product.name}</strong>
        <p className="muted">${product.price} c/u</p>
      </div>
      <input
        type="number"
        min={1}
        max={product.stock}
        value={quantity}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 1) updateQuantity(product.id, value);
        }}
      />
      <strong>${product.price * quantity}</strong>
      <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default CartItem;
