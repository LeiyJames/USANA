'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import { FadeIn, StaggerChildren, staggerItem } from '../../components/animations'
import { motion } from 'framer-motion'
import { getProductById, getProductInfo, getRecommendedProducts } from '@/lib/products'

// Add a helper function for price formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  // Find the current product
  const product = getProductById(params.id)
  const productInfo = getProductInfo(params.id)
  
  // Find recommended products
  const recommendedProducts = product ? getRecommendedProducts(params.id, product.category) : []

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
        <FadeIn>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </FadeIn>

        {/* Product Info */}
        <div>
          <FadeIn delay={0.2}>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Body Benefits */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Body Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {product.bodyBenefits.map(benefit => (
                  <span
                    key={benefit}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold block">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center w-32 border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="flex-1 text-center px-4 py-2 border-x">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full py-3 text-center"
            >
              Add to Cart
            </button>

            {/* USANA Difference */}
            {productInfo && (
              <div className="mt-12 mb-8">
                <h3 className="font-semibold mb-2">The USANA Difference</h3>
                <p className="text-gray-600">{productInfo.usanaDifference}</p>
              </div>
            )}

            {/* Health Benefits */}
            {productInfo && (
              <div>
                <h3 className="font-semibold mb-2">Health Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {productInfo.healthBenefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </FadeIn>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          </FadeIn>
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedProducts.map((rec) => (
                <motion.div
                  key={rec.id}
                  variants={staggerItem}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => router.push(`/products/${rec.id}`)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{rec.name}</h3>
                      <p className="text-gray-600 mb-2">{rec.description}</p>
                      <span className="text-lg font-bold">{formatPrice(rec.price)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </StaggerChildren>
        </div>
      )}
    </div>
  )
} 