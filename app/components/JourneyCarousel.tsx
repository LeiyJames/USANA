'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface JourneyCarouselProps {
  milestones: Milestone[];
}

export default function JourneyCarousel({ milestones }: JourneyCarouselProps) {
  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="journey-swiper"
        >
          {milestones.map((milestone) => (
            <SwiperSlide key={milestone.year}>
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary-500">{milestone.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-200" />
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={milestone.year}
              className={`flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600">
                  {milestone.description}
                </p>
              </div>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center relative z-10">
                <span className="text-xl font-bold text-primary-500">{milestone.year}</span>
              </div>
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
} 