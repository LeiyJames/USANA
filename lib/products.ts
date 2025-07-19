import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  tag?: string;
  body_benefits?: string[];
  ingredients?: string[];
  usage_instructions?: string;
  key_features?: string[];
  safety_info?: string;
  best_seller?: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data || [];
}

export function getCategories(): string[] {
  return [
    'Nutritionals',
    'Protein, shakes, bar',
    'Skin Care',
    'Personal Care'
  ];
}

export function getBodyBenefits(): string[] {
  return [
    'Total Body Health',
    'Bone and Joint Health',
    'Skin Health',
    'Heart Health',
    'Immune Health',
    'Healthy Weight'
  ];
} 