'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import ScrollReveal from './ScrollReveal';

const featuredProducts = [
  {
    id: 'cellsentials',
    name: 'USANA CellSentials™',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop',
    description: 'Core cellular nutrition package with vitamins, minerals, and antioxidants.',
    tag: 'Best Seller'
  },
  {
    id: 'proflavanol',
    name: 'Proflavanol® C100',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop',
    description: 'Powerful antioxidant complex combining grape seed extract and vitamin C.',
    tag: 'Popular'
  },
  {
    id: 'biomega',
    name: 'BiOmega™',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&h=500&fit=crop',
    description: 'Ultra-pure fish oil supplement rich in EPA and DHA omega-3 fatty acids.',
    tag: 'Essential'
  }
];

export default function FeaturedProducts() {
  const { addItem } = useCart();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Most Popular Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our best-selling supplements trusted by thousands for optimal health and wellness.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.2}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.tag}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <a href="/products" className="btn-outline inline-flex items-center">
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
} 