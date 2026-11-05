import type { Order, OrderItemInput, Product } from "../types";

const API_URL = "http://localhost:8000/api";

async function request(url: string, options?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error("No se pudo conectar con el servidor.");
  }
}

async function readJson<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data?.detail;
    if (typeof detail === "string") throw new Error(detail);
    if (Array.isArray(detail)) throw new Error(detail.map((e: { msg: string }) => e.msg).join(". "));
    throw new Error(`Error ${response.status}`);
  }

  return data as T;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
  const response = await request(url);
  return readJson<Product[]>(response);
}

export async function getProductById(id: number): Promise<Product | null> {
  const response = await request(`${API_URL}/products/${id}`);
  if (response.status === 404) return null;
  return readJson<Product>(response);
}

export async function createOrder(items: OrderItemInput[]): Promise<Order> {
  const response = await request(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  return readJson<Order>(response);
}
