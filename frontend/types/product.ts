// types/product.ts

export interface ProductAttributes {
  "product.id": string;
  "product.code": string;
  "product.label": string;
  "product.url": string;
  "product.type": string;
  "product.status": number;
  "product.rating": string;
  "product.ratings": number;
  "product.datestart"?: string | null;
  "product.dateend"?: string | null;
  "product.config"?: Record<string, any>;
  "product.scale"?: number;
  "product.target"?: string;
  "product.ctime"?: string;
  "product.instock"?: number;
  "product.boost"?: number;
}

export interface ProductLinks {
  self: {
    href: string;
    allow: string[];
  };
  "basket.product"?: {
    href: string;
    allow: string[];
  };
}

export interface Product {
  id: string;
  type: "product";
  attributes: ProductAttributes;
  links: ProductLinks;
}

export interface MediaAttributes {
  "media.id": string;
  "media.url": string;
  "media.preview"?: string;
  "media.type"?: string;
  "media.mimetype"?: string;
}

export interface PriceAttributes {
  "price.id": string;
  "price.value": string;
  "price.currencyid": string;
  "price.quantity"?: number;
  "price.costs"?: string;
}

export interface ProductsResponse {
  data: Product[];
  included?: Array<{
    id: string;
    type: "media" | "price" | "text";
    attributes: MediaAttributes | PriceAttributes | Record<string, any>;
  }>;
  meta?: {
    total?: number;
  };
  links?: {
    self: string;
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
}

export interface ProductResponse {
  data: Product;
  included?: Array<{
    id: string;
    type: "media" | "price" | "text";
    attributes: MediaAttributes | PriceAttributes | Record<string, any>;
  }>;
}
