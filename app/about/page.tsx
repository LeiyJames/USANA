'use client';

import ScrollReveal from '../components/ScrollReveal';
import Image from 'next/image'
import Link from 'next/link'





export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h1 className="text-5xl font-bold text-center text-gray-900 mb-6">
              About USANA
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              Leading the science of nutrition for over 30 years, delivering premium supplements for optimal health.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-lg text-gray-600">
                  The USANA Foundation's mission is to develop a network of communities built on long-lasting, sustainable, and nutritious food.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                      <span className="text-xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Quality First</h3>
                      <p className="text-gray-600">Premium ingredients, rigorous testing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                      <span className="text-xl">🔬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Science-Based</h3>
                      <p className="text-gray-600">Research-driven formulations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                      <span className="text-xl">🌍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Global Impact</h3>
                      <p className="text-gray-600">Improving lives worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative h-[380px] sm:h-[480px] md:h-[560px] lg:h-[640px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80"
                  alt="USANA Research Facility"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>





      {/* CTA Section */}
      <section className="section bg-primary-500 text-white">
        <div className="container text-center">
          <h2 className="heading-2 mb-6">Join Our Mission</h2>
          <p className="text-xl text-primary-50 mb-8 max-w-3xl mx-auto">
            Experience the difference of science-based nutrition and join thousands who have 
            transformed their health with USANA supplements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary bg-white text-primary-500 hover:bg-gray-100">
              View Products
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-500">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 