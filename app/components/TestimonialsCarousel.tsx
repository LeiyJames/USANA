'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const TestimonialCard = ({ testimonial, index = 0 }: { testimonial: Testimonial; index?: number }) => (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow h-full"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-primary-100">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-grow">
          <p className="text-gray-700 text-lg mb-6 italic">
            &quot;{testimonial.content}&quot;
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {testimonial.name}
          </h3>
          <p className="text-primary-600 font-medium mt-1">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={`${testimonial.name}-${index}`}>
              <TestimonialCard testimonial={testimonial} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={`${testimonial.name}-${index}`} 
            testimonial={testimonial} 
            index={index} 
          />
        ))}
      </div>
    </>
  );
} 