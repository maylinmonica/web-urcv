import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black border-b-2 border-yellow-400 sticky top-0 z-50 w-full shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={() => handleNavigate('/')} className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
              URCV
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-3 items-center">
            <button
              onClick={() => handleNavigate('/blog')}
              className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Artikel
            </button>
            <button
              onClick={() => handleNavigate('/login')}
              className="px-4 py-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Masuk
            </button>
            <button
              onClick={() => handleNavigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-blue-600 text-black rounded-lg hover:from-yellow-500 hover:to-blue-700 transform hover:scale-105 transition-all font-semibold"
            >
              Daftar
            </button>
          </div>

          {/* Mobile menu button */}
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
            <button
              onClick={() => handleNavigate('/blog')}
              className="flex items-center w-full text-left p-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors border border-transparent hover:border-yellow-400/20"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Artikel
            </button>

            <div className="border-t border-yellow-400/20 pt-3 space-y-2">
              <button
                onClick={() => handleNavigate('/login')}
                className="block w-full text-left p-3 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-lg transition-colors border border-transparent hover:border-yellow-400/20"
              >
                Masuk
              </button>
              <button
                onClick={() => handleNavigate('/register')}
                className="block w-full text-left p-3 bg-gradient-to-r from-yellow-400 to-blue-600 text-black rounded-lg hover:from-yellow-500 hover:to-blue-700 transition-all font-semibold"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
