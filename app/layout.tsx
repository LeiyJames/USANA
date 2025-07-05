import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import BackToTop from './components/BackToTop';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'USANA Health Products',
  description: 'Premium health and wellness products by USANA',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <CartProvider>
          <Navigation />
          <main className="flex-grow pt-20 md:pt-24">
            {children}
          </main>
          <footer className="bg-gray-50 py-8 mt-auto">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About USANA</h3>
                  <p className="text-gray-600 text-sm">
                    Leading the science of nutrition through research and innovation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/products" className="text-gray-600 hover:text-green-600">Products</a></li>
                    <li><a href="/about" className="text-gray-600 hover:text-green-600">About Us</a></li>
                    <li><a href="/contact" className="text-gray-600 hover:text-green-600">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <p className="text-gray-600 text-sm">
                    Email: support@usana.com<br />
                    Phone: (888) 123-4567
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
                © {new Date().getFullYear()} USANA. All rights reserved.
              </div>
            </div>
          </footer>
          <BackToTop />
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
} 