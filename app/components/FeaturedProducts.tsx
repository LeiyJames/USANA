'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import ScrollReveal from './ScrollReveal';
import { getFeaturedProducts } from '@/lib/products';

// Add price formatting helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

const featuredProducts = getFeaturedProducts();

export default function FeaturedProducts() {
  const { addItem } = useCart();

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="heading-2 text-gray-900 mb-4">
              Featured Products
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-600">
              Discover our most popular supplements for optimal health
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={0.2 * (index + 1)}>
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
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                    <span className="text-2xl font-bold text-primary-500">
                      {formatPrice(product.price)}
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
      </div>
    </section>
  );
} 