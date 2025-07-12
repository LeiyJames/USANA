'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

interface TeamCarouselProps {
  members: TeamMember[];
}

export default function TeamCarousel({ members }: TeamCarouselProps) {
  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="team-swiper"
        >
          {members.map((member) => (
            <SwiperSlide key={member.name}>
              <motion.div 
                className="group relative overflow-hidden rounded-lg bg-white shadow-lg p-6 hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
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
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-8">
        {members.map((member) => (
          <motion.div 
            key={member.name}
            className="group relative overflow-hidden rounded-lg bg-white shadow-lg p-6 hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
          >
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
          </motion.div>
        ))}
      </div>
    </>
  );
} 