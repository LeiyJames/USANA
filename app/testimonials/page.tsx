'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Fitness Instructor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    content: 'USANA Cellsentials has been a game-changer for my energy levels and overall health. As a fitness instructor, I need to be at my best, and these supplements help me maintain peak performance.',
    product: 'Cellsentials™'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Executive',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    content: "The quality of USANA products is unmatched. I've tried many supplements, but none have made such a noticeable difference in my daily energy and focus as Proflavanol C100.",
    product: 'Proflavanol® C100'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Healthcare Professional',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    rating: 5,
    content: "As a healthcare professional, I'm very particular about the supplements I take. USANA's commitment to quality and research-backed formulas is why I trust and recommend their products.",
    product: 'BiOmega™'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Athlete',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    content: 'BiOmega has been essential for my joint health and recovery. The quality is exceptional, and I feel the difference in my training and performance.',
    product: 'BiOmega™'
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    role: 'Wellness Coach',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    content: 'I recommend USANA products to all my clients. The results speak for themselves - improved energy, better sleep, and overall wellness. The science behind these products is impressive.',
    product: 'Cellsentials™'
  }
]

const faqs = [
  {
    id: 'fda',
    question: 'Are USANA supplements FDA approved?',
    answer: 'While dietary supplements are not subject to FDA approval, USANA follows FDA guidelines and Good Manufacturing Practices (GMP). Our facility is NSF certified, ensuring the highest quality standards in supplement manufacturing.'
  },
  {
    id: 'daily',
    question: 'Can I take these supplements daily?',
    answer: 'Yes, USANA supplements are designed for daily use. Our products are formulated to provide optimal nutrition when taken as directed. Always follow the recommended dosage on the product label.'
  },
  {
    id: 'effects',
    question: 'Are there any side effects?',
    answer: 'USANA supplements are made with high-quality, pure ingredients and are generally well-tolerated. However, as with any supplement, some individuals may experience mild effects as their body adjusts. Consult your healthcare provider before starting any supplement regimen.'
  },
  {
    id: 'quality',
    question: 'How does USANA ensure product quality?',
    answer: 'USANA maintains strict quality control measures throughout our manufacturing process. We test raw materials and finished products for purity and potency, and our facility follows pharmaceutical-grade GMP standards.'
  },
  {
    id: 'results',
    question: 'How long until I see results?',
    answer: 'Individual results vary, but many customers report noticeable improvements in energy and well-being within 2-4 weeks of consistent use. For optimal results, we recommend taking supplements as directed for at least 90 days.'
  },
  {
    id: 'guarantee',
    question: 'What is your satisfaction guarantee?',
    answer: "USANA offers a 90-day satisfaction guarantee on all products. If you're not completely satisfied, you can return the unused portion for a full refund or product exchange."
  },
  {
    id: 'ingredients',
    question: 'Are your supplements made with natural ingredients?',
    answer: 'USANA uses a combination of natural and scientifically formulated ingredients to create optimal nutritional supplements. All ingredients are carefully selected for purity, potency, and bioavailability.'
  },
  {
    id: 'shipping',
    question: 'What are your shipping options?',
    answer: 'We offer standard and express shipping options. Standard shipping typically takes 3-5 business days, while express shipping delivers within 1-2 business days. Free shipping is available for orders over $100.'
  }
]

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((current) => (current + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const toggleFAQ = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ScrollReveal direction="up">
        <section className="bg-white border-b">
          <div className="container py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="heading-2 text-gray-900 mb-4">
                Customer Success Stories
              </h1>
              <p className="text-xl text-gray-600">
                Discover how USANA supplements have helped thousands of people achieve their 
                health and wellness goals. Read their stories and experiences below.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Testimonial Carousel */}
      <ScrollReveal direction="up">
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Testimonial Card */}
                <div className="card">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-2xl">★</span>
                        ))}
                      </div>
                      <blockquote className="text-xl text-gray-600 italic mb-6">
                        "{testimonials[activeIndex].content}"
                      </blockquote>
                      <div>
                        <p className="font-bold text-gray-900">{testimonials[activeIndex].name}</p>
                        <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                        <p className="text-green-600 mt-2">Product: {testimonials[activeIndex].product}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                  <button
                    onClick={prevTestimonial}
                    className="pointer-events-auto -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="pointer-events-auto translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonial Grid */}
      <ScrollReveal direction="up">
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="card">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">{testimonial.content}</p>
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        <p className="text-green-600 text-sm mt-2">
                          Product: {testimonial.product}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal direction="up">
        <section id="faq" className="section bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-2 text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Find answers to common questions about USANA supplements, quality standards, 
                and our satisfaction guarantee.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="card hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <button
                      className="w-full flex items-center justify-between text-left"
                      aria-expanded={openFaqId === faq.id}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      <span className="ml-6 flex-shrink-0">
                        {openFaqId === faq.id ? (
                          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                    </button>
                    {openFaqId === faq.id && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <section className="section bg-green-600 text-white">
        <div className="container text-center">
          <h2 className="heading-2 mb-6">Experience the Difference</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their health with 
            USANA's premium supplements. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary bg-white text-green-600 hover:bg-gray-100">
              Shop Now
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-green-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 