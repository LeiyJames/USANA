'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/lib/products';
import type { Product } from '@/lib/products';

// Add price formatting helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = typeof params?.id === 'string' ? params.id : '';
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          throw new Error('Product ID not found');
        }

        const productData = await getProductById(productId);
        if (!productData) {
          throw new Error('Product not found');
        }

        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
      >
        <svg 
          className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
      </motion.button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg"
        >
            <Image
            src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
            priority
            />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
        <div>
            {product.tag && (
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
                {product.tag}
              </span>
            )}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600">{product.description}</p>
          </div>

          {product.bodyBenefits && product.bodyBenefits.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Body Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {product.bodyBenefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-b border-gray-200 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Quantity:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <span className={`text-sm ${
                product.stock > 5 ? 'text-green-600' : 
                product.stock > 0 ? 'text-orange-600' : 
                'text-red-600'
              }`}>
                {product.stock > 5 ? 'In Stock' :
                 product.stock > 0 ? `Only ${product.stock} left` :
                 'Out of Stock'}
              </span>
            </div>
          </div>

            <button
              onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-primary-600 text-white py-4 px-8 rounded-xl font-semibold
                     hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     transform transition-transform active:scale-95"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

          {/* Additional Info */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Free shipping on orders over ₱5,000</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>100% authentic products</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Fast delivery within 3-5 business days</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Product Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'benefits'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ingredients'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'usage'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                How to Use
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-3">Why Choose {product.name}?</h4>
                <ul className="space-y-3 text-gray-600">
                  {product.key_features && product.key_features.length > 0 ? (
                    product.key_features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Premium quality ingredients
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Scientifically proven formula
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Made with USANA InCelligence Technology
                      </li>
                    </>
                  )}
                </ul>
              </div>
              </div>
            )}

          {activeTab === 'benefits' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Health Benefits</h3>
              {product.body_benefits && product.body_benefits.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.body_benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                      <svg className="w-5 h-5 text-primary-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Benefits information coming soon.</p>
              )}
              </div>
            )}

          {activeTab === 'ingredients' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Key Ingredients</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-600 mb-4">
                  Our products are made with the highest quality ingredients, carefully selected and tested for purity and potency.
                </p>
                {product.ingredients && product.ingredients.length > 0 ? (
                  <ul className="space-y-3">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3"></span>
                        <p className="text-gray-700">{ingredient}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3"></span>
                      <p className="text-gray-700">All ingredients meet USANA's high quality standards</p>
        </div>
                    <div className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3"></span>
                      <p className="text-gray-700">Tested for purity and potency</p>
                    </div>
                    <div className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3"></span>
                      <p className="text-gray-700">Manufactured in FDA-registered facilities</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">How to Use</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">Recommended Usage</h4>
                  {product.usage_instructions ? (
                    <div className="text-gray-600 prose">
                      {product.usage_instructions.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-4">
                        For best results, follow the recommended dosage and usage instructions:
                      </p>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-3">1</span>
                          Take with a full glass of water
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-3">2</span>
                          Use consistently for best results
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-3">3</span>
                          Store in a cool, dry place
                        </li>
                      </ul>
                    </>
                  )}
                </div>
                
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h4>
                  {product.safety_info ? (
                    <p className="text-yellow-700">{product.safety_info}</p>
                  ) : (
                    <p className="text-yellow-700">
                      Always consult with a healthcare professional before starting any new supplement regimen.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 