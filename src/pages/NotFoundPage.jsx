import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, ArrowLeft, Candy } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <Candy className="h-24 w-24 text-gray-300" />
          </div>
          <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sweet Page Not Found!
          </h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for seems to have been eaten by our sweet monsters. 
            Don't worry, there are plenty of other delicious pages to explore!
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/" className="block">
            <Button size="lg" className="w-full">
              <Home className="h-5 w-5 mr-2" />
              Go Back Home
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="w-full"
          >
            <Button variant="ghost" size="lg" className="w-full">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;