'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import ProductFilters from '@/components/ProductFilters'
import { FadeIn, StaggerChildren, staggerItem } from '../components/animations'
import { motion } from 'framer-motion'

type SortOption = 'featured' | 'best-selling' | 'price-low' | 'price-high'

// Add product type and categories
interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  bodyBenefits: string[]
  category: string
  featured: boolean
  bestSeller: boolean
}

// Update products with placeholder images
const products: Product[] = [
  {
    id: 'cellsentials',
    name: "CellSentials",
    description: "Core supplement for cellular nutrition",
    price: 59.99,
    image: "https://placehold.co/600x400/e2e8f0/1e293b?text=CellSentials",
    bodyBenefits: ['Total Body Health', 'Immune Health'],
    category: 'Nutritionals',
    featured: true,
    bestSeller: true
  },
  {
    id: 'proglucamune',
    name: "Proglucamune",
    description: "Advanced immune system support",
    price: 39.99,
    image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Proglucamune",
    bodyBenefits: ['Immune Health'],
    category: 'Nutritionals',
    featured: true,
    bestSeller: false
  },
  {
    id: 'proflavanol',
    name: "Proflavanol C100",
    description: "Grape seed extract and vitamin C",
    price: 49.99,
    image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Proflavanol",
    bodyBenefits: ['Heart Health', 'Skin Health'],
    category: 'Nutritionals',
    featured: true,
    bestSeller: true
  },
  {
    id: 'nutrimeal',
    name: "Nutrimeal",
    description: "Low-glycemic meal replacement shake",
    price: 32.99,
    image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Nutrimeal",
    bodyBenefits: ['Healthy Weight'],
    category: 'Protien, shakes, bar',
    featured: false,
    bestSeller: true
  },
  {
    id: 'celavive',
    name: "Celavive Pack",
    description: "Complete skincare regimen",
    price: 129.99,
    image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Celavive",
    bodyBenefits: ['Skin Health'],
    category: 'skin care',
    featured: true,
    bestSeller: false
  }
]

// Product Categories and Body Benefits Data
const categories = [
  'Nutritionals',
  'Protein, shakes, bar',
  'Skin care',
  'Foods',
  'Personal care'
];

const bodyBenefits = [
  'Heart Health',
  'Brain Health',
  'Immune Health',
  'Joint Health',
  'Skin Health',
  'Healthy Weight',
  'Energy',
  'Sleep & Stress'
];

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
              <h3 className="font-semibold mb-2">Product Categories</h3>
              {categories.map(category => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  <label htmlFor={category}>{category}</label>
                </motion.div>
              ))}
            </div>

            {/* Body Benefits Filter */}
            <div>
              <h3 className="font-semibold mb-2">Body Benefits</h3>
              {bodyBenefits.map(benefit => (
                <motion.div
                  key={benefit}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id={benefit}
                    checked={selectedBenefits.includes(benefit)}
                    onChange={() => handleBenefitChange(benefit)}
                    className="mr-2"
                  />
                  <label htmlFor={benefit}>{benefit}</label>
                </motion.div>
              ))}
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
                              className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">${product.price}</span>
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

      {/* Quality Guarantee */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-3 text-gray-900 mb-6">
              Our Quality Guarantee
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Every USANA supplement is manufactured in our state-of-the-art facility 
              following pharmaceutical-grade Good Manufacturing Practices (GMP). We stand 
              behind our products with a 90-day satisfaction guarantee.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600">Highest grade ingredients</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="font-semibold text-gray-900 mb-2">Science-Backed</h3>
                <p className="text-gray-600">Research-proven formulas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-semibold text-gray-900 mb-2">Pure Results</h3>
                <p className="text-gray-600">Guaranteed potency</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 