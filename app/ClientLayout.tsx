"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
// import emailjs from '@emailjs/browser'
// import { emailjsConfig } from '@/config/emailjs'
import { CartProvider } from '@/contexts/CartContext'
import Navigation from './components/Navigation'
import BackToTop from './components/BackToTop'
import Toast from './components/Toast'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const [showDbToast, setShowDbToast] = useState(false)

  useEffect(() => {
    // Initialize EmailJS
    // emailjs.init(emailjsConfig.publicKey)
  }, [])

  useEffect(() => {
    if (pathname === '/' || pathname?.startsWith('/products')) {
      // Reset toast state to trigger animation if it's already showing
      setShowDbToast(false);
      // Small timeout to allow state to reset before showing again
      const timer = setTimeout(() => setShowDbToast(true), 100);
      return () => clearTimeout(timer);
    }
  }, [pathname])

  if (isAdmin) {
    return (
      <CartProvider>
        <main className="min-h-screen">{children}</main>
      </CartProvider>
    )
  }

  return (
    <CartProvider>
      <Navigation />
      <main className="min-h-screen pt-16 md:pt-20">
        {children}
      </main>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About USANA</h3>
              <p className="text-gray-600">Premium nutritional supplements and skincare products for a healthier you.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/products" className="text-gray-600 hover:text-primary-500">Products</a></li>
                <li><a href="/about" className="text-gray-600 hover:text-primary-500">About Us</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-primary-500">Contact</a></li>
                <li><a href="/faq" className="text-gray-600 hover:text-primary-500">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">Email: contact@usana-demo.com</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} USANA Health Sciences. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <BackToTop />
      <Toast
        message="Notice: Database connection is paused. Showing demo data."
        type="info"
        isVisible={showDbToast}
        onClose={() => setShowDbToast(false)}
      />
    </CartProvider>
  )
} 