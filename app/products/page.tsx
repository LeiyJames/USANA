'use client';

import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories, getBodyBenefits } from '@/lib/products';
import type { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  
  const categories = getCategories();
  const bodyBenefits = getBodyBenefits();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query and selected filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.body_benefits && product.body_benefits.some((benefit: string) => 
          benefit.toLowerCase().includes(searchQuery.toLowerCase())
        ));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);

      // Body benefits filter
      const matchesBenefits = selectedBenefits.length === 0 || 
        (product.body_benefits && selectedBenefits.some((benefit: string) => 
          product.body_benefits!.includes(benefit)
        ));

      return matchesSearch && matchesCategory && matchesBenefits;
    });
  }, [products, searchQuery, selectedCategories, selectedBenefits]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleBenefitsChange = (benefits: string[]) => {
    setSelectedBenefits(benefits);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <ProductFilters 
            categories={categories} 
            bodyBenefits={bodyBenefits}
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
            selectedBenefits={selectedBenefits}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onBenefitsChange={handleBenefitsChange}
          />
        </aside>

        <main className="lg:w-3/4">
          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 