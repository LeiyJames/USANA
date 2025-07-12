'use client';

import ScrollReveal from './ScrollReveal';
import ProductCarousel from './ProductCarousel';
import { useCart } from '@/contexts/CartContext';
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

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

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

        <ScrollReveal>
          <ProductCarousel 
            products={featuredProducts}
            onAddToCart={handleAddToCart}
            formatPrice={formatPrice}
          />
        </ScrollReveal>
      </div>
    </section>
  );
} 