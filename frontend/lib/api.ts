// lib/api.ts
import { Product, ProductsResponse, ProductResponse } from "@/types/product";

interface GetProductsOptions {
  limit?: number;
  offset?: number;
  include?: string[];
  filter?: Record<string, string>;
  sort?: string;
}

// Resolve base URL: prefer env, fall back to sensible defaults for SSR/CSR
function getBaseUrl(): string {
  const envBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envBase) return envBase.replace(/\/$/, "");
  return typeof window === "undefined"
    ? "http://aimeos_app:8000" // SSR inside Docker network
    : "http://localhost:8000";  // Browser on host
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.api+json",
  };
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

function toQuery(params: GetProductsOptions = {}): string {
  const usp = new URLSearchParams();
  const { limit, offset, include, filter, sort } = params;
  if (typeof limit === "number") usp.append("page[limit]", String(limit));
  if (typeof offset === "number") usp.append("page[offset]", String(offset));
  if (Array.isArray(include) && include.length) usp.append("include", include.join(","));
  if (filter && typeof filter === "object") {
    Object.entries(filter).forEach(([k, v]) => {
      if (v != null && v !== "") usp.append(`filter[${k}]`, String(v));
    });
  }
  if (typeof sort === "string" && sort.length) usp.append("sort", sort);
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  const base = getBaseUrl();
  const qs = toQuery(options);
  const res = await fetch(`${base}/jsonapi/product${qs}`, {
    headers: buildHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }
  const json: ProductsResponse = await res.json();
  return json.data || [];
}

export async function getProduct(id: string, options: GetProductsOptions = {}): Promise<Product> {
  if (!id) throw new Error("getProduct: 'id' is required");
  const base = getBaseUrl();
  const qs = toQuery(options);
  const res = await fetch(`${base}/jsonapi/product/${encodeURIComponent(id)}${qs}`, {
    headers: buildHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
  }
  const json: ProductResponse = await res.json();
  return json.data;
}
