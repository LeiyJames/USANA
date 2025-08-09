'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
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
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          
          {product.body_benefits && (
            <div className="flex flex-wrap gap-2 mb-3">
              {product.body_benefits.map(benefit => (
                <span
                  key={benefit}
                  className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.best_seller && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Best Seller
              </span>
            )}
          </div>
          {product.stock <= 5 && (
            <p className="text-red-600 text-sm mt-2">
              {product.stock === 0 ? 'Out of stock' : `Only ${product.stock} left`}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
} 