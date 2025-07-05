'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import { FadeIn, SlideIn, FadeInScale } from '../../components/animations'

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-gray-600">(4.5)</span>
    </div>
  )
}

// Product Type from products page
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

// Add this type at the top with other interfaces
interface ProductInfo {
  usanaDifference: string;
  healthBenefits: string[];
}

// Add the product information map after the products array
const productInformation: Record<string, ProductInfo> = {
  biomega: {
    usanaDifference: "Omega-3 fatty acids play an important part in many body systems that contribute to optimal health. BiOmega offers a convenient way to get these valuable nutrients when you're not eating fish at least twice a week. Plus, this unique formula includes a high amount of vitamin D and lemon oil to eliminate fishy aftertaste.",
    healthBenefits: [
      "Supports sound cardiovascular, immune, and joint health",
      "Provides advanced and sufficient levels of EPA and DHA—two long-chain omega-3 fatty acids important for memory and learning",
      "Plays a role in many important cellular processes that support the body"
    ]
  },
  cellsentials: {
    usanaDifference: "USANA CellSentials™ Pack features a unique InCelligence Technology® that supports your cells' natural ability to protect and renew themselves. This innovative formula goes beyond regular supplements by targeting cellular health at the molecular level.",
    healthBenefits: [
      "Provides optimal nourishment for cellular health",
      "Supports healthy cell division and DNA integrity",
      "Promotes natural cellular repair and renewal processes",
      "Offers comprehensive antioxidant protection"
    ]
  },
  proglucamune: {
    usanaDifference: "ProGlucamune™ combines baker's yeast beta glucans and zinc into one powerful immune-supporting supplement. This unique formula helps prime your natural immune response for better health all year round.",
    healthBenefits: [
      "Supports year-round immune system function",
      "Promotes natural immune cell activity",
      "Provides zinc and antioxidant support",
      "Helps maintain immune strength during seasonal changes"
    ]
  },
  proflavanol: {
    usanaDifference: "Proflavanol® C100 combines grape-seed extract with high-potency vitamin C for advanced antioxidant protection. This powerful duo supports multiple aspects of health while promoting radiant, healthy-looking skin.",
    healthBenefits: [
      "Provides powerful antioxidant protection",
      "Supports cardiovascular and circulatory health",
      "Promotes healthy, radiant skin",
      "Maintains immune system strength"
    ]
  },
  nutrimeal: {
    usanaDifference: "USANA Nutrimeal™ is a nutritious meal replacement shake that's low glycemic and protein-rich. Each serving provides a balanced ratio of macronutrients to help you maintain healthy weight and energy levels.",
    healthBenefits: [
      "Supports healthy weight management",
      "Provides balanced nutrition with protein, fiber, and healthy fats",
      "Helps maintain steady energy levels",
      "Promotes feeling of fullness and satisfaction"
    ]
  },
  celavive: {
    usanaDifference: "Celavive® skincare combines USANA InCelligence Technology® with powerful peptides and botanicals. This comprehensive system is designed to address individual skin needs while supporting your skin's natural beauty-preserving functions.",
    healthBenefits: [
      "Supports natural skin renewal processes",
      "Helps maintain skin hydration and elasticity",
      "Promotes youthful, radiant complexion",
      "Provides targeted solutions for various skin concerns"
    ]
  }
};

// Mock products data (same as in products page)
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

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  // Find the current product
  const product = products.find(p => p.id === params.id)
  
  // Find recommended products (excluding current product)
  const recommendedProducts = products
    .filter(p => p.id !== params.id && p.category === product?.category)
    .slice(0, 3)

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <FadeIn>
        <button
          onClick={() => router.push('/products')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>
      </FadeIn>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <SlideIn direction="left">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </SlideIn>

        {/* Product Info */}
        <SlideIn direction="right">
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {product.name}
            </motion.h1>
            <StarRating rating={4.5} />
            
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            </motion.div>

            <motion.p 
              className="mt-6 text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {product.description}
            </motion.p>

            {/* Body Benefits */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-3">Body Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {product.bodyBenefits.map((benefit, index) => (
                  <motion.span
                    key={benefit}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {benefit}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </motion.button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border border-gray-300 rounded-md"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </motion.button>
              </div>
            </motion.div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-green-600 text-white py-4 px-8 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </motion.button>
          </div>
        </SlideIn>
      </div>

      {/* More Information */}
      <FadeInScale delay={0.4}>
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">More Information</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">The USANA Difference</h3>
                <p className="text-gray-700 leading-relaxed">
                  {productInformation[params.id]?.usanaDifference || "Product information coming soon."}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Health Benefits</h3>
                <ul className="list-disc pl-6 space-y-3">
                  {productInformation[params.id]?.healthBenefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  )) || <li>Benefits information coming soon.</li>}
                </ul>
              </div>
              
              <p className="mt-6 text-sm italic text-gray-600">*No approved therapeutic claims</p>
            </div>
          </div>
        </div>
      </FadeInScale>

      {/* Recommended Products */}
      <FadeIn delay={0.6}>
        <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProducts.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link href={`/products/${rec.id}`}>
                <div className="relative h-48">
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{rec.name}</h3>
                  <p className="text-gray-600 mt-1">${rec.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
} 