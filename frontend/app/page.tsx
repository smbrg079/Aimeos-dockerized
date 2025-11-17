import { getProducts } from "../lib/api";

export default async function HomePage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>get some products buddy</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.attributes.name} — ${product.attributes.price}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
