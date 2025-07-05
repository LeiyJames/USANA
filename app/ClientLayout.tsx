'use client'

import { useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '@/config/emailjs'
import { CartProvider } from '@/contexts/CartContext'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(emailjsConfig.publicKey)
  }, [])

  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
} 