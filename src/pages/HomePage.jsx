import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import logo from '../assets/logo.jpeg';

import { 
  ShoppingBag, 
  Star, 
  Users, 
  Candy,
  ArrowRight,
  CheckCircle,
  Heart,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Candy className="h-8 w-8 text-pink-600" />,
      title: "Premium Sweets",
      description: "Curated collection of the finest sweets from around the world"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
      title: "Easy Shopping",
      description: "Simple and secure purchasing with real-time inventory updates"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Admin Management",
      description: "Powerful admin tools for inventory management and analytics"
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Secure & Safe",
      description: "Your data and transactions are protected with enterprise-grade security"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Optimized performance for the best shopping experience"
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      title: "Global Reach",
      description: "Serving sweet lovers worldwide with international shipping"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sweet Lover",
      content: "The best online sweet shop! Amazing variety and quality. I order here every month!",
      rating: 5,
      avatar: "https://i.pravatar.cc/64?img=19",
    //   avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Shop Owner",
      content: "The admin panel makes managing inventory so easy and efficient. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      role: "Regular Customer",
      content: "Fast delivery and the sweets are always fresh and delicious! Customer service is top-notch.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Sweet Varieties" },
    { number: "50+", label: "Countries Served" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-300 via-white to-purple-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full">
                {/* <ShoppingBag className="h-16 w-16 text-pink-600" /> */}
                {/* Logo */}
                <img className=' size-32 shrink-0 rounded-full' src={logo} alt="Sweet Shop" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Sweet Shop
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover a world of delicious treats! From premium chocolates to colorful candies, 
              we have everything to satisfy your sweet tooth. Experience the sweetest shopping journey!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 py-4 text-lg">
                    Browse Sweets
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="px-8 py-4 text-lg">
                      Get Started Free
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="ghost" size="lg" className="px-8 py-4 text-lg border border-gray-300">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sweet Shop?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best in online sweet shopping with our premium features and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Satisfy Your Sweet Tooth?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and start your sweet journey today. 
            Premium quality, fast delivery, and exceptional service guaranteed!
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg bg-white text-pink-600 hover:bg-gray-100"
                >
                  Start Shopping Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="px-8 py-4 text-lg text-white border-white hover:bg-white hover:text-pink-600"
                >
                  I Already Have an Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;