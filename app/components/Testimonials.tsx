'use client';

import ScrollReveal from './ScrollReveal';

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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              direction="up"
              delay={index * 0.2}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
} 