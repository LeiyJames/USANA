import productsData from '../data/products.json';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  bodyBenefits: string[];
  category: string;
  featured: boolean;
  bestSeller: boolean;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  tag: string;
}

export interface ProductInfo {
  usanaDifference: string;
  healthBenefits: string[];
}

export interface ProductData {
  products: Product[];
  featuredProducts: FeaturedProduct[];
  productInformation: Record<string, ProductInfo>;
}

const typedProductsData = productsData as ProductData;

export const getAllProducts = (): Product[] => {
  return typedProductsData.products;
};

export const getFeaturedProducts = (): FeaturedProduct[] => {
  return typedProductsData.featuredProducts;
};

export const getProductById = (id: string): Product | undefined => {
  return typedProductsData.products.find(p => p.id === id);
};

export const getProductInfo = (id: string): ProductInfo | undefined => {
  return typedProductsData.productInformation[id];
};

export const getRecommendedProducts = (currentProductId: string, category: string): Product[] => {
  return typedProductsData.products
    .filter(p => p.id !== currentProductId && p.category === category)
    .slice(0, 3);
};

export const getCategories = (): string[] => {
  return Array.from(new Set(typedProductsData.products.map(p => p.category)));
};

export const getBodyBenefits = (): string[] => {
  return Array.from(new Set(typedProductsData.products.flatMap(p => p.bodyBenefits)));
}; 