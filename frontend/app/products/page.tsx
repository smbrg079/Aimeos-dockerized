// app/products/page.tsx
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  const products: Product[] = await getProducts({
    limit: 12,
    include: ["media", "price"],
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
              Image
            </div>
            <h2 className="font-semibold text-lg">
              {product.attributes["product.label"]}
            </h2>
            <p className="text-sm text-gray-600">
              Rating: {product.attributes["product.rating"]} ({product.attributes["product.ratings"]})
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
