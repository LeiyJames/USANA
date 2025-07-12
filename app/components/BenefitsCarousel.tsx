'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface BenefitsCarouselProps {
  benefits: Benefit[];
}

export default function BenefitsCarousel({ benefits }: BenefitsCarouselProps) {
  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="benefits-swiper"
        >
          {benefits.map((benefit) => (
            <SwiperSlide key={benefit.id}>
              <motion.div 
                className="text-center p-6 rounded-xl bg-white shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={benefit.id}
            className="text-center p-6 rounded-xl hover:bg-primary-50 transition-colors"
            whileHover={{ y: -5 }}
          >
            <div className="text-5xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-600">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
} 