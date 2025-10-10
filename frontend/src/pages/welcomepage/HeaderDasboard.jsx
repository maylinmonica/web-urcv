import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Menu, X, User, LogOut, Home, ChevronDown, Shield, BookOpen
} from 'lucide-react';

const DashboardHeader = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="bg-black border-b-2 border-yellow-400 sticky top-0 z-50 w-full shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
              URCV
            </span>
          </Link>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Artikel Link */}
            <button
              onClick={() => navigate('/blog')}
              className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Artikel
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-yellow-400/10 rounded-lg transition-colors border border-transparent hover:border-yellow-400/20"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-white">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-32">
                    {user?.email}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-black border-2 border-yellow-400/20 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-yellow-400/20">
                    <p className="text-sm font-medium text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>

                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        navigate('/admin/blogs');
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-colors w-full text-left"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </button>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-yellow-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-yellow-400/20">
          <div className="px-4 py-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center space-x-3 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 w-full p-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors border border-transparent hover:border-yellow-400/20"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* Artikel Mobile */}
            <button
              onClick={() => {
                navigate('/blog');
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full p-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Artikel</span>
            </button>

            {role === 'admin' && (
              <button
                onClick={() => {
                  navigate('/admin/blogs');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-lg transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            )}

            <div className="border-t border-yellow-400/20 pt-3 space-y-2">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default DashboardHeader;
