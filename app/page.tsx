'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from './components/ScrollReveal'
import FeaturedProducts from './components/FeaturedProducts'
import TrustSignals from './components/TrustSignals'

const benefits = [
  {
    id: 'science',
    title: 'Science-Backed Formula',
    description: 'Our supplements are developed by a team of scientists and nutritionists using cutting-edge research.',
    icon: '🔬'
  },
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'Every ingredient is tested for purity and potency, ensuring you get the highest quality supplements.',
    icon: '⭐'
  },
  {
    id: 'results',
    title: 'Proven Results',
    description: 'Thousands of satisfied customers have experienced improved health and vitality.',
    icon: '📈'
  },
  {
    id: 'trust',
    title: 'Trusted Brand',
    description: 'Over 30 years of experience in developing premium nutritional supplements.',
    icon: '🛡️'
  }
]

const featuredProduct = {
  id: 'cellsentials',
  name: 'USANA Cellsentials™',
  price: 59.99,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
  description: 'Advanced cellular nutrition supplement designed to support your body at the cellular level.'
}

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
      <ScrollReveal direction="up">
        <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent"></div>
          </div>
          <div className="relative container section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="heading-1 text-gray-900 mb-6">
                  Fuel Your Health,
                  <br />
                  <span className="text-green-600">Feel the Difference</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Experience the power of science-backed nutrition with USANA's premium supplements. 
                  Your journey to optimal health starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products" className="btn-primary">
                    Shop Now
                  </Link>
                  <Link href="/about" className="btn-outline">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-white/50 rounded-full blur-2xl"></div>
                <div className="relative">
                  <Image
                    src={featuredProduct.image}
                    alt="USANA Supplements"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Trust Signals */}
      <TrustSignals />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Benefits Section */}
      <ScrollReveal>
        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="heading-2 text-gray-900 mb-4">
                Transform Your Health with USANA
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the difference of science-backed nutrition with our premium supplements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="card text-center group hover:bg-green-50">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="section bg-green-600 text-white">
          <div className="container text-center">
            <h2 className="heading-2 mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Join thousands who have experienced the difference with USANA's premium supplements. 
              Take the first step towards optimal health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary bg-white text-green-600 hover:bg-gray-100">
                Browse Products
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-green-600">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
} 