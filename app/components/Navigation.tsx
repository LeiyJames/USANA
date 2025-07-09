'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  // Update scroll state
  scrollY.on("change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' },
  ];

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 ${
          (isHovered || isMobileMenuOpen || isScrolled) 
            ? 'bg-white/95 backdrop-blur-sm shadow-md' 
            : 'bg-transparent hover:bg-white/95 hover:backdrop-blur-sm'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-500 z-50" onClick={closeMenu}>
              USANA
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary-500 font-semibold'
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-primary-500 transition-colors duration-200"
              >
                <span className="sr-only">Cart</span>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  🛒
                </div>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Navigation Button & Cart */}
            <div className="flex items-center space-x-4 md:hidden">
              <Link
                href="/cart"
                className="relative text-gray-700 z-50"
                onClick={closeMenu}
              >
                <span className="sr-only">Cart</span>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  🛒
                </div>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 z-50 w-8 h-8 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-5">
                  <span 
                    className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 top-2' : 'rotate-0 top-0'
                    }`}
                  />
                  <span 
                    className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    } top-2`}
                  />
                  <span 
                    className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 top-2' : 'rotate-0 top-4'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <motion.div
          className={`fixed inset-0 bg-white z-40 md:hidden ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: "100%" }
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 pt-24 pb-8">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-2xl ${
                    pathname === item.href
                      ? 'text-primary-500 font-semibold'
                      : 'text-gray-700'
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Overlay backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
} 