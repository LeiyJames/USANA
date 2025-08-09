'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left lg:w-1/2 lg:pr-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="block text-gray-900">Fuel Your Health,</span>
            <span className="block text-primary-600">Feel the Difference</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl"
          >
            Experience the power of science-backed nutrition with USANA&apos;s premium supplements. Your journey to optimal health starts here.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Link 
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors duration-200 transform hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 lg:mt-0 lg:w-1/2"
        >
          <div className="relative w-full h-[400px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src="/images/biomega.png"
              alt="USANA Supplements"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 