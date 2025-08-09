'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getTestimonials } from '@/lib/testimonials';
import Link from 'next/link';

interface DashboardStats {
  totalProducts: number;
  totalRevenue: number;
  lowStockProducts: number;
  testimonialStats: {
    total: number;
    positive: number;
    negative: number;
    recent: Array<{
      id: string;
      name: string;
      content: string;
      created_at: string;
    }>;
  };
}

// Simple sentiment analysis function
function analyzeSentiment(text: string): 'positive' | 'negative' {
  const positiveWords = ['great', 'amazing', 'excellent', 'good', 'love', 'perfect', 'best', 'wonderful', 'fantastic', 'helpful', 'effective', 'recommend', 'satisfied', 'happy', 'pleased'];
  const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'hate', 'disappointing', 'disappointed', 'waste', 'awful', 'horrible', 'useless', 'ineffective', 'unhappy', 'dissatisfied'];

  const lowercaseText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;

  positiveWords.forEach(word => {
    if (lowercaseText.includes(word)) positiveScore++;
  });

  negativeWords.forEach(word => {
    if (lowercaseText.includes(word)) negativeScore++;
  });

  return positiveScore >= negativeScore ? 'positive' : 'negative';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    testimonialStats: {
      total: 0,
      positive: 0,
      negative: 0,
      recent: [],
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products
        const { data: products, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        // Fetch testimonials
        const testimonials = await getTestimonials();
        
        // Analyze testimonials
        const testimonialStats = {
          total: testimonials.length,
          positive: 0,
          negative: 0,
          recent: testimonials.slice(0, 3).map(t => ({
            id: t.id,
            name: t.name,
            content: t.content,
            created_at: t.created_at,
          })),
        };

        testimonials.forEach(testimonial => {
          const sentiment = analyzeSentiment(testimonial.content);
          if (sentiment === 'positive') {
            testimonialStats.positive++;
          } else {
            testimonialStats.negative++;
          }
        });

        // Calculate stats
        const totalProducts = products.length;
        const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
        const lowStockProducts = products.filter(product => product.stock < 10).length;

        setStats({
          totalProducts,
          totalRevenue,
          lowStockProducts,
          testimonialStats,
        });
      } catch (error) {
        console.error('Error calculating stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen-content flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Overview of your store&apos;s performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Products */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Products
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalProducts}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Potential Revenue */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Potential Revenue
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      ₱{stats.totalRevenue.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Low Stock Products
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.lowStockProducts}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Testimonials Overview</h3>
            <Link 
              href="/admin/testimonials"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Testimonials */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">Total Testimonials</h4>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.testimonialStats.total}</p>
            </div>

            {/* Positive Testimonials */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-800">Positive Feedback</h4>
              <p className="mt-2 text-3xl font-semibold text-green-900">{stats.testimonialStats.positive}</p>
              <p className="mt-1 text-sm text-green-600">
                {((stats.testimonialStats.positive / stats.testimonialStats.total) * 100).toFixed(1)}% of total
              </p>
            </div>

            {/* Negative Testimonials */}
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-800">Needs Improvement</h4>
              <p className="mt-2 text-3xl font-semibold text-red-900">{stats.testimonialStats.negative}</p>
              <p className="mt-1 text-sm text-red-600">
                {((stats.testimonialStats.negative / stats.testimonialStats.total) * 100).toFixed(1)}% of total
              </p>
            </div>
          </div>

          {/* Recent Testimonials */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-4">Recent Testimonials</h4>
            <div className="space-y-4">
              {stats.testimonialStats.recent.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{testimonial.name}</h5>
                      <p className="mt-1 text-sm text-gray-600">{testimonial.content}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      analyzeSentiment(testimonial.content) === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {analyzeSentiment(testimonial.content) === 'positive' ? 'Positive' : 'Needs Attention'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 