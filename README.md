# USANA E-Commerce Platform

A modern, responsive e-commerce platform built with Next.js 13, TypeScript, and Supabase for USANA health and wellness products.

## 🚀 Features

### Customer-Facing Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Catalog**: Browse products with search and filtering
- **Product Details**: Comprehensive product information with tabs
- **Shopping Cart**: Persistent cart with localStorage
- **Checkout Process**: Streamlined checkout experience
- **Testimonials**: Customer reviews and feedback
- **Contact Form**: Customer support integration
- **About & FAQ**: Company information and common questions

### Admin Dashboard
- **Product Management**: Full CRUD operations for products
- **Testimonial Management**: Add, edit, and delete customer testimonials
- **Dashboard Analytics**: 
  - Total products and potential revenue
  - Low stock alerts
  - Testimonial sentiment analysis (positive/negative)
  - Recent testimonials overview
- **Image Upload**: Local image upload with Supabase storage
- **Authentication**: Secure admin access with Supabase Auth

### Technical Features
- **Next.js 13**: App directory with server and client components
- **TypeScript**: Full type safety throughout the application
- **Supabase**: Backend as a service (database, auth, storage)
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Works on all device sizes
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd usana-funnel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL commands from `lib/schema.sql` in your Supabase SQL editor
   - Configure Row Level Security (RLS) policies
   - Set up storage buckets for images

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Products Table
```sql
- id (uuid, primary key)
- name (text)
- description (text)
- price (numeric)
- image (text)
- category (text)
- stock (integer)
- featured (boolean)
- body_benefits (text[])
- ingredients (text[])
- usage_instructions (text)
- key_features (text[])
- safety_info (text)
- best_seller (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

### Testimonials Table
```sql
- id (uuid, primary key)
- name (text)
- role (text)
- content (text)
- image_url (text)
- created_at (timestamp)
```

### Users Table
```sql
- id (uuid, primary key)
- email (text)
- role (text)
- created_at (timestamp)
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable Row Level Security (RLS)
3. Create storage buckets for product and testimonial images
4. Set up authentication policies
5. Configure CORS settings for image uploads

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations

## 📱 Pages & Routes

### Customer Pages
- `/` - Homepage with hero section and featured products
- `/products` - Product catalog with search and filters
- `/products/[id]` - Individual product details
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/testimonials` - Customer testimonials
- `/about` - About Us page
- `/contact` - Contact form
- `/thankyou` - Order confirmation

### Admin Pages
- `/admin` - Dashboard with analytics
- `/admin/products` - Product management
- `/admin/testimonials` - Testimonial management
- `/admin/login` - Admin authentication

## 🎨 Components

### Core Components
- `Navigation` - Responsive navigation with mobile menu
- `Hero` - Homepage hero section
- `ProductCard` - Product display card
- `ProductFilters` - Search and filter functionality
- `FeaturedProducts` - Homepage product showcase
- `Testimonials` - Customer feedback display
- `CartContext` - Shopping cart state management

### Admin Components
- `AdminLayout` - Admin dashboard layout
- `ProductModal` - Product creation/editing modal
- `TestimonialModal` - Testimonial management modal

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Authentication**: Supabase Auth integration
- **Input Validation**: Form validation and sanitization
- **Image Upload Security**: Secure file upload with validation
- **Admin Access Control**: Role-based access control

## 📊 Analytics & Insights

### Dashboard Metrics
- Total products count
- Potential revenue calculation
- Low stock product alerts
- Testimonial sentiment analysis
- Recent customer feedback

### Sentiment Analysis
- Automated positive/negative testimonial categorization
- Keyword-based sentiment scoring
- Visual indicators for feedback quality

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Structure
```
usana-funnel/
├── app/                    # Next.js 13 app directory
│   ├── admin/             # Admin pages
│   ├── products/          # Product pages
│   ├── components/        # Shared components
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utility functions and services
├── contexts/              # React contexts
├── data/                  # Static data files
└── public/                # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `/docs` folder

## 🔄 Updates & Maintenance

### Regular Maintenance Tasks
- Update dependencies regularly
- Monitor Supabase usage and costs
- Backup database regularly
- Review and update security policies
- Monitor performance metrics

### Future Enhancements
- Payment gateway integration (Stripe, PayPal)
- Email marketing integration
- Advanced analytics dashboard
- Multi-language support
- Mobile app development
- Advanced inventory management
- Customer review system
- Loyalty program integration

---

**Built with ❤️ for USANA Health Sciences** 