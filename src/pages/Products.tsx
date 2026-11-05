import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import { CATEGORIES, type Product } from "../types";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    getProducts(category ?? undefined)
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch(() => {
        if (!ignore) setError("No se pudieron cargar los productos. Intentá de nuevo.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [category]);

  const handleCategoryChange = (value: string) => {
    if (value === "") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <section>
      <div className="page-header">
        <h1>Productos</h1>
        <label>
          Categoría:{" "}
          <select value={category ?? ""} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p>Cargando productos...</p>}

      {!loading && error && <p className="error">{error}</p>}

      {!loading && !error && products.length === 0 && <p>No hay productos en esta categoría.</p>}

      {!loading && !error && products.length > 0 && (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
