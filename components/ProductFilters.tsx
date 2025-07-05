'use client'

import { useState } from 'react'

type SortOption = 'featured' | 'best-selling' | 'price-low' | 'price-high'

interface ProductFiltersProps {
  onSortChange: (sort: SortOption) => void
  onBodyBenefitChange: (benefit: string) => void
  onCategoryChange: (category: string) => void
  onSearch: (query: string) => void
}

const bodyBenefits = [
  'All',
  'Total Body Health',
  'Bone and Joint Health',
  'Heart Health',
  'Immune Health',
  'Digestive Health',
  'Eye Health',
  'Healthy Energy',
  'Healthy Weight',
  'Detox Support',
  "Men's Health",
  'Skin Health',
]

const categories = [
  'All',
  'Nutritionals',
  'Protien, shakes, bar',
  'healthy living',
  'skin care',
]

export default function ProductFilters({
  onSortChange,
  onBodyBenefitChange,
  onCategoryChange,
  onSearch,
}: ProductFiltersProps) {
  const [selectedBenefit, setSelectedBenefit] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md">
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="featured">Featured</option>
          <option value="best-selling">Best Selling</option>
          <option value="price-low">Lowest Price</option>
          <option value="price-high">Highest Price</option>
        </select>
      </div>

      {/* Body Benefits */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Shop By Body Benefit</h3>
        <div className="space-y-2">
          {bodyBenefits.map((benefit) => (
            <label
              key={benefit}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="body-benefit"
                value={benefit}
                checked={selectedBenefit === benefit}
                onChange={(e) => {
                  setSelectedBenefit(e.target.value)
                  onBodyBenefitChange(e.target.value)
                }}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 group-hover:text-blue-600">
                {benefit}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Shop By Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  onCategoryChange(e.target.value)
                }}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 group-hover:text-blue-600">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
} 