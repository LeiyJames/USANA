'use client'

import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your order has been successfully placed. You will receive a confirmation email shortly with your order details.
          </p>
          <div className="bg-primary-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">What&apos;s Next?</h3>
            <p className="text-sm text-gray-700">
              Your USANA Cellsentials™ will be shipped within 2-3 business days. 
              You&apos;ll receive tracking information via email once your order ships.
            </p>
          </div>
          <Link
            href="/"
            className="btn-primary w-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
} 