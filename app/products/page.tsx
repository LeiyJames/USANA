'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import ProductFilters from '@/components/ProductFilters'
import { FadeIn, StaggerChildren, staggerItem } from '../components/animations'
import { motion } from 'framer-motion'
import { Product, getAllProducts, getCategories, getBodyBenefits } from '@/lib/products'

// Add price formatting helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

type SortOption = 'featured' | 'best-selling' | 'price-low' | 'price-high'

// Get products from centralized data
const products = getAllProducts();
const categories = getCategories();
const bodyBenefits = getBodyBenefits();

export default function ProductsPage() {
  const { addItem } = useCart()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>('featured')
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBenefitChange = (benefit: string) => {
    setSelectedBenefits(prev =>
      prev.includes(benefit)
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter and sort products
  const filteredAndSortedProducts = [...products]
    // First apply search filter
    .filter(product => {
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const benefitsMatch = selectedBenefits.length === 0 || 
        product.bodyBenefits.some(benefit => selectedBenefits.includes(benefit));
      return searchMatch && categoryMatch && benefitsMatch;
    })
    // Then apply sorting
    .sort((a, b) => {
      switch (sortOption) {
        case 'bestSelling':
          return Number(b.bestSeller) - Number(a.bestSeller);
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        default: // featured
          return Number(b.featured) - Number(a.featured);
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      </FadeIn>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <FadeIn delay={0.2}>
          <div className="md:w-64 space-y-6">
            {/* Search Bar */}
            <div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="font-semibold mb-2">Sort By</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="bestSelling">Best Selling</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Body Benefits Filter */}
            <div>
              <h3 className="font-semibold mb-2">Body Benefits</h3>
              <div className="space-y-2">
                {bodyBenefits.map((benefit) => (
                  <label key={benefit} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBenefits.includes(benefit)}
                      onChange={() => handleBenefitChange(benefit)}
                      className="mr-2"
                    />
                    {benefit}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Products Grid */}
        <div className="flex-1">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.length === 0 ? (
                <motion.div
                  variants={staggerItem}
                  className="col-span-full text-center py-8 text-gray-500"
                >
                  No products found matching your criteria
                </motion.div>
              ) : (
                filteredAndSortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={staggerItem}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.bodyBenefits.map(benefit => (
                            <span
                              key={benefit}
                              className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                          {product.bestSeller && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                              Best Seller
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </StaggerChildren>
        </div>
      </div>
    </div>
  )
} 