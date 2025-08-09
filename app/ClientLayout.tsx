"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '@/config/emailjs'
import { CartProvider } from '@/contexts/CartContext'
import Navigation from './components/Navigation'
import BackToTop from './components/BackToTop'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(emailjsConfig.publicKey)
  }, [])

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
              <p className="text-gray-600">Email: agy_2873@yahoo.com.ph</p>
              <p className="text-gray-600">Phone: 09162690185</p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} USANA Health Sciences. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </CartProvider>
  )
} 