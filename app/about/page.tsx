'use client';

import ScrollReveal from '../components/ScrollReveal';
import Image from 'next/image'
import Link from 'next/link'

const milestones = [
  {
    year: '1992',
    title: 'Foundation',
    description: 'USANA Health Sciences was founded by Dr. Myron Wentz with a vision to create the healthiest family on earth.'
  },
  {
    year: '1995',
    title: 'International Expansion',
    description: 'Expanded operations globally, bringing cellular nutrition to international markets.'
  },
  {
    year: '2002',
    title: 'Scientific Innovation',
    description: 'Launched groundbreaking cellular nutrition technology with Cellsentials™.'
  },
  {
    year: '2010',
    title: 'Research Excellence',
    description: 'Established state-of-the-art research facility for continuous product innovation.'
  },
  {
    year: '2018',
    title: 'Global Recognition',
    description: 'Recognized worldwide for premium quality supplements and scientific research.'
  },
  {
    year: '2023',
    title: 'Future Forward',
    description: 'Continuing to lead innovation in nutritional science and cellular health.'
  }
]

const values = [
  {
    icon: '🔬',
    title: 'Scientific Excellence',
    description: 'We invest in research and development to create cutting-edge nutritional products.'
  },
  {
    icon: '🌿',
    title: 'Quality First',
    description: 'Every ingredient is tested for purity and potency to ensure premium quality.'
  },
  {
    icon: '❤️',
    title: 'Customer Health',
    description: 'Your health and satisfaction are our top priorities in everything we do.'
  },
  {
    icon: '🌍',
    title: 'Global Impact',
    description: "We're committed to improving health and wellness worldwide."
  }
]

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
                  To develop and provide the highest quality, science-based nutrition and wellness products, distributed internationally through direct sales, creating a rewarding opportunity for our independent distributors, shareholders, and employees.
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
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&h=1000&fit=crop"
                  alt="USANA Research Facility"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">Rigorous testing and quality control measures ensure the highest standards.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Innovation</h3>
              <p className="text-gray-600">Cutting-edge research and development for optimal nutritional solutions.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Efficiency</h3>
              <p className="text-gray-600">Fast processing and delivery to get you started on your health journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
              <p className="text-lg text-gray-600">
                Meet the visionaries leading USANA's mission to create the healthiest family on earth through science-based nutrition.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Kevin Guest",
                role: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
                description: "Leading USANA's global vision and strategy"
              },
              {
                name: "Jim Brown",
                role: "President",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
                description: "Driving operational excellence"
              },
              {
                name: "Walter Noot",
                role: "Chief Operating Officer",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
                description: "Optimizing global operations"
              },
              {
                name: "Dr. Rob Sinnott",
                role: "Chief Scientific Officer",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
                description: "Leading product innovation"
              }
            ].map((member, index) => (
              <ScrollReveal key={member.name} direction="up" delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-primary-500 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From our founding to today, we've been dedicated to advancing the science 
              of nutrition and improving lives around the world.
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-200" />
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-end' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                    <div className="card">
                      <span className="text-primary-500 font-bold text-lg">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full" />
                </div>
              ))}
            </div>
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