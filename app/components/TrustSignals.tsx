'use client';

import ScrollReveal from './ScrollReveal';

const trustSignals = [
  {
    icon: '🔬',
    title: 'Science-Based',
    description: 'Formulated by scientists and nutritionists using cutting-edge research'
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'NSF-certified manufacturing facility with rigorous quality control'
  },
  {
    icon: '🌿',
    title: 'Pure Ingredients',
    description: 'Carefully selected, tested ingredients for maximum potency'
  },
  {
    icon: '🛡️',
    title: '90-Day Guarantee',
    description: 'Try our products risk-free with our satisfaction guarantee'
  }
];

export default function TrustSignals() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose USANA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the highest quality nutritional supplements 
              through science and innovation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-8">
          {trustSignals.map((signal, index) => (
            <ScrollReveal key={signal.title} delay={index * 0.1}>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 text-3xl flex items-center justify-center bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                  {signal.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {signal.title}
                </h3>
                <p className="text-gray-600">
                  {signal.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-16 p-8 bg-green-50 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="text-4xl">⭐</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    Trusted by Thousands
                  </h4>
                  <p className="text-gray-600">
                    Join over 100,000+ satisfied customers worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-4xl">🏆</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    Award-Winning Products
                  </h4>
                  <p className="text-gray-600">
                    Recognized for excellence in nutritional science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
} 