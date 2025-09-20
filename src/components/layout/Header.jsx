import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { ShoppingBag, User, LogOut, Settings, Home } from 'lucide-react';
import clsx from 'clsx';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinkClass = (path) =>
    clsx(
      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all",
      location.pathname === path
        ? "bg-pink-100 text-pink-700"
        : "text-gray-700 hover:text-pink-600 hover:bg-gray-100"
    );

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
              <ShoppingBag className="h-6 w-6 text-pink-600" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Sweet Shop
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>

                {user?.role === "admin" && (
                  <Link to="/admin" className={navLinkClass("/admin")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-3 px-4 py-1 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border">
                  <div className="p-1 bg-white rounded-full">
                    <User className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
                    <div className="text-xs text-gray-500 capitalize">{user?.role || 'user'}</div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="md">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="md">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
