export type Category = "bebidas" | "snacks" | "golosinas" | "varios";

export const CATEGORIES: Category[] = ["bebidas", "snacks", "golosinas", "varios"];

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  description: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItemInput {
  product_id: number;
  quantity: number;
}

export interface Order {
  id: number;
  created_at: string;
  total: number;
  items: {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
}
