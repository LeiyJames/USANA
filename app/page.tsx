'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from './components/ScrollReveal'
import FeaturedProducts from './components/FeaturedProducts'
import { getFeaturedProducts } from '@/lib/products'
import { motion } from 'framer-motion'

const benefits = [
  {
    id: 'science',
    title: 'Science-Based',
    description: 'Formulated by scientists and nutritionists using cutting-edge research.',
    icon: '🔬'
  },
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'NSF-certified manufacturing facility with rigorous quality control',
    icon: '⭐'
  },
  {
    id: 'pure',
    title: 'Pure Ingredients',
    description: 'Carefully selected, tested ingredients for maximum potency',
    icon: '🌿'
  },
  {
    id: 'guarantee',
    title: '90-Day Guarantee',
    description: 'Try our products risk-free with our satisfaction guarantee',
    icon: '🛡️'
  }
]

const trustIndicators = [
  {
    id: 'customers',
    icon: '⭐',
    title: 'Trusted by Thousands',
    description: 'Join over 100,000+ satisfied customers worldwide',
    stat: '100,000+'
  },
  {
    id: 'awards',
    icon: '🏆',
    title: 'Award-Winning Products',
    description: 'Recognized for excellence in nutritional science',
    stat: '30+ Years'
  }
]

const featuredProduct = getFeaturedProducts()[0];

export default function HomePage() {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      image: featuredProduct.image
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent"></div>
        </div>
        <div className="relative container section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                  Fuel Your Health,
                  <br />
                  <span className="text-primary-500">Feel the Difference</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Experience the power of science-backed nutrition with USANA's premium supplements. 
                  Your journey to optimal health starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link 
                    href="/products" 
                    className="btn-primary text-lg px-8 py-4"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/50 rounded-full blur-2xl"></div>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={featuredProduct.image}
                    alt="USANA Supplements"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-xl"
                  />
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-primary-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Why Choose USANA Section */}
      <section id="why-usana" className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose USANA?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're committed to providing the highest quality nutritional supplements through science and innovation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.id} delay={index * 0.1}>
                <motion.div 
                  className="text-center p-6 rounded-xl hover:bg-primary-50 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trustIndicators.map((indicator, index) => (
              <ScrollReveal key={indicator.id} delay={index * 0.1}>
                <motion.div 
                  className="flex items-center gap-6 bg-primary-50 rounded-2xl p-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-5xl">{indicator.icon}</div>
                  <div>
                    <div className="text-3xl font-bold text-primary-500 mb-2">
                      {indicator.stat}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {indicator.title}
                    </h3>
                    <p className="text-gray-600">
                      {indicator.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* CTA Section */}
      <section className="section bg-primary-500 text-white">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands who have experienced the difference with USANA's premium supplements.
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-white text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Products
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
} 