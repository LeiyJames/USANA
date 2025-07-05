'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <ScrollReveal direction="left">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Transform Your Health with USANA
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.2}>
              <p className="text-xl text-gray-600">
                Discover premium nutritional supplements backed by science for optimal health and vitality.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all hover:scale-105"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-all hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal direction="right">
            <div className="relative">
              <img
                src="/hero-image.jpg"
                alt="USANA Products"
                className="rounded-lg shadow-xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute top-20 right-20 w-64 h-64 bg-green-600 rounded-full blur-3xl"
      />
      <div
        className="absolute bottom-20 left-20 w-64 h-64 bg-green-600 rounded-full blur-3xl"
      />
    </div>
  );
} 