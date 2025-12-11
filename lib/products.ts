// import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  tags?: string[];
  body_benefits?: string[];
  ingredients?: string[];
  usage_instructions?: string;
  key_features?: string[];
  safety_info?: string;
  best_seller?: boolean;
  created_at?: string;
  updated_at?: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "cellsentials",
    name: "USANA CellSentials",
    description: "Premium, daily multivitamin and multimineral system featuring USANA's patented InCelligence Complex†*",
    price: 1100.00,
    image: "/images/biomega.png", // Using local placeholder or existing image
    category: "Nutritional Supplements",
    stock: 100,
    featured: true,
    best_seller: true,
    tags: ["Best Seller"],
    body_benefits: ["Total Body Health", "Bone and Joint Health", "Skin Health"],
    created_at: new Date().toISOString()
  },
  {
    id: "proglucamune",
    name: "Proglucamune",
    description: "Advanced immune system support",
    price: 39.99,
    image: "/images/biomega.png",
    category: "Nutritional Supplements",
    stock: 50,
    featured: true,
    best_seller: false,
    body_benefits: ["Immune Health"],
    created_at: new Date().toISOString()
  },
  {
    id: "proflavanol",
    name: "Proflavanol C100",
    description: "Grape seed extract and vitamin C",
    price: 49.99,
    image: "/images/biomega.png",
    category: "Nutritional Supplements",
    stock: 75,
    featured: true,
    best_seller: true,
    body_benefits: ["Heart Health", "Skin Health"],
    created_at: new Date().toISOString()
  },
  {
    id: "nutrimeal",
    name: "Nutrimeal",
    description: "Low-glycemic meal replacement shake",
    price: 32.99,
    image: "/images/biomega.png",
    category: "Protein, Shakes & Bars",
    stock: 120,
    featured: false,
    best_seller: true,
    body_benefits: ["Healthy Weight"],
    created_at: new Date().toISOString()
  },
  {
    id: "celavive",
    name: "Celavive Pack",
    description: "Complete skincare regimen",
    price: 129.99,
    image: "/images/biomega.png",
    category: "Skin Care",
    stock: 30,
    featured: true,
    best_seller: false,
    body_benefits: ["Skin Health"],
    created_at: new Date().toISOString()
  }
];

export async function getProducts(): Promise<Product[]> {
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .order('created_at', { ascending: false });

  // if (error) {
  //   console.error('Error fetching products:', error);
  //   return [];
  // }

  // return data || [];
  return Promise.resolve(MOCK_PRODUCTS);
}

export async function getProductById(id: string): Promise<Product | null> {
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('id', id)
  //   .single();

  // if (error) {
  //   console.error('Error fetching product:', error);
  //   return null;
  // }

  // return data;
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  return Promise.resolve(product || null);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('category', category)
  //   .order('created_at', { ascending: false });

  // if (error) {
  //   console.error('Error fetching products by category:', error);
  //   return [];
  // }

  // return data || [];
  const products = MOCK_PRODUCTS.filter(p => p.category === category);
  return Promise.resolve(products);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('featured', true)
  //   .order('created_at', { ascending: false })
  //   .limit(6);

  // if (error) {
  //   console.error('Error fetching featured products:', error);
  //   return [];
  // }

  // return data || [];
  const products = MOCK_PRODUCTS.filter(p => p.featured).slice(0, 6);
  return Promise.resolve(products);
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  MOCK_PRODUCTS.unshift(newProduct);
  return Promise.resolve(newProduct);
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
  if (index !== -1) {
    MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...product, updated_at: new Date().toISOString() };
    return Promise.resolve(MOCK_PRODUCTS[index]);
  }
  throw new Error("Product not found");
}

export async function deleteProduct(id: string): Promise<void> {
  const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
  if (index !== -1) {
    MOCK_PRODUCTS.splice(index, 1);
  }
  return Promise.resolve();
}

export async function uploadProductImage(file: File): Promise<string> {
  return Promise.resolve(URL.createObjectURL(file));
}

export function getCategories(): string[] {
  return [
    'Shop All',
    'Nutritional Supplements',
    'Skin Care',
    'Protein, Shakes & Bars'
  ];
}

export function getBodyBenefits(): string[] {
  return [
    'Total Body Health',
    'Bone and Joint Health',
    'Brain and Nerve Health',
    'Heart Health',
    'Immune Health',
    'Digestive Health',
    'Eye Health',
    'Healthy Energy',
    'Healthy Weight',
    'Detox Support',
    'Men\'s Health',
    'Women\'s Health',
    'Skin Health',
    'Postbiotic Skincare',
    'Muscle Health',
    'Stress, Mood & Relaxation',
    'Prenatal Health',
    'Child & Teen Health',
    'Foundational Health',
    'Sleep Health'
  ];
} 