'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { CartItem } from '@/contexts/CartContext'

type PaymentMethod = 'cod' | 'gcash';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const [isClearing, setIsClearing] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cod')

  const subtotal = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 250 // Updated shipping threshold for PHP
  const total = subtotal + shipping

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
    }, 500)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6">
        <div className="container py-8 sm:py-16">
          <div className="card text-center py-12 sm:py-16">
            <h1 className="heading-2 text-gray-900 mb-4 sm:mb-6">Your Cart is Empty</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/products" className="btn-primary inline-block">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <h1 className="heading-2 text-gray-900 mb-6 sm:mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <div key={item.id} className="card p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
                        {item.name}
                      </h3>
                      <p className="text-primary-500 font-semibold mb-4 sm:mb-0">
                        ₱{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 sm:px-3 sm:py-1 text-gray-600 hover:text-primary-500"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 sm:px-3 sm:py-1 text-gray-600 hover:text-primary-500"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 p-2"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="btn-secondary w-full sm:w-auto"
              >
                {isClearing ? 'Clearing...' : 'Clear Cart'}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-primary-500 font-medium">Free</span>
                  ) : (
                    <span className="font-medium">₱{shipping.toLocaleString()}</span>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Add ₱{(5000 - subtotal).toLocaleString()} more to qualify for free shipping
                    </p>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={selectedPayment === 'cod'}
                        onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                        className="form-radio text-blue-400 h-5 w-5 focus:ring-blue-400 border-gray-300 checked:bg-blue-400 checked:hover:bg-blue-400"
                      />
                      <span className="text-gray-900">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center space-x-3 p-2 rounded-lg cursor-not-allowed opacity-50">
                      <input
                        type="radio"
                        name="payment"
                        value="gcash"
                        disabled
                        className="form-radio text-blue-400 h-5 w-5 focus:ring-blue-400 border-gray-300 checked:bg-blue-400 checked:hover:bg-blue-400"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">GCash</span>
                        <span className="text-xs text-primary-500 bg-primary-50 px-2 py-1 rounded-full">Coming Soon</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  href="/checkout" 
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 