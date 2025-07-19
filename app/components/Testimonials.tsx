'use client';

import ScrollReveal from './ScrollReveal';
import TestimonialsCarousel from './TestimonialsCarousel';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content: "USANA's supplements have transformed my workout recovery. I've never felt better!",
    image: "/testimonials/sarah.jpg"
  },
  {
    name: "Dr. Michael Chen",
    role: "Healthcare Professional",
    content: "As a doctor, I trust USANA's scientific approach to nutrition. The quality is unmatched.",
    image: "/testimonials/michael.jpg"
  },
  {
    name: "Emma Williams",
    role: "Busy Professional",
    content: "These supplements fit perfectly into my hectic lifestyle. I can feel the difference in my energy levels.",
    image: "/testimonials/emma.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <TestimonialsCarousel testimonials={testimonials} />
            </ScrollReveal>
      </div>
    </section>
  );
} 