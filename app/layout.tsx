import './globals.css';
import { Inter } from 'next/font/google';
import ClientLayout from './ClientLayout';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'USANA Health Sciences',
  description: 'Premium nutritional supplements and skincare products.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pageType = headersList.get('x-page-type');

  return (
    <html lang="en">
      <body className={inter.className}>
        {pageType === 'admin' ? (
          children
        ) : (
          <ClientLayout>{children}</ClientLayout>
        )}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
} 