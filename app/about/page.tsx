'use client';

import ScrollReveal from '../components/ScrollReveal';
import TeamCarousel from '../components/TeamCarousel';
import JourneyCarousel from '../components/JourneyCarousel';
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

const teamMembers = [
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
];

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
          <ScrollReveal>
            <TeamCarousel members={teamMembers} />
          </ScrollReveal>
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
          <ScrollReveal>
            <JourneyCarousel milestones={milestones} />
          </ScrollReveal>
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