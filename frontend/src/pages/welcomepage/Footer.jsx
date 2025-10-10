import React, { useEffect, useState } from 'react';
import { FileText, Instagram, Linkedin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [articles, setArticles] = useState([]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Fungsi untuk mengecek apakah path sedang aktif
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Fungsi untuk mengecek apakah artikel blog sedang aktif
  const isActiveBlog = (articleId) => {
    return location.pathname === `/blog/${articleId}`;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/blogs?limit=3');
        setArticles(response.data || []);
      } catch (err) {
        console.error('Gagal memuat artikel:', err);
      }
    };

    fetchArticles();
  }, []);

  return (
    <footer className="bg-black text-white py-12 w-full border-t-2 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                URCV
              </span>
            </div>
            <p className="text-gray-400">
              Platform terdepan untuk membuat CV profesional secara instan dan mudah.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Blog & Tips</h3>
            <ul className="space-y-2 text-gray-400">
              {articles.length > 0 ? (
                articles.slice(0, 3).map((article) => (
                  <li key={article.id}>
                    <button
                      onClick={() => handleNavigate(`/blog/${article.id}`)}
                      className={`transition-colors text-left p-1 rounded-none focus:outline-none ${
                        isActiveBlog(article.id)
                          ? 'text-yellow-400 font-medium'
                          : 'hover:text-yellow-400'
                      }`}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      {article.title}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm italic">Belum ada artikel</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Bantuan</h3>
            <ul className="space-y-2 text-gray-400">
              {['/help', '/faq', '/support', '/about'].map((path) => {
                const labelMap = {
                  '/help': 'Panduan',
                  '/faq': 'FAQ',
                  '/support': 'Support',
                  '/about': 'Tentang Kami',
                };
                return (
                  <li key={path}>
                    <button
                      onClick={() => handleNavigate(path)}
                      className={`transition-colors text-left p-1 rounded-none focus:outline-none ${
                        isActivePath(path)
                          ? 'text-yellow-400 font-medium'
                          : 'hover:text-yellow-400'
                      }`}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      {labelMap[path]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Kontak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>hello@urcv.id</li>
              <li>+62 812-3456-7890</li>
              <li>Singaraja, Indonesia</li>
              <li className="pt-2">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleNavigate('/social')}
                    className={`transition-colors rounded-lg p-2 focus:outline-none ${
                      isActivePath('/social')
                        ? 'text-yellow-400'
                        : 'text-gray-400 hover:text-yellow-400'
                    }`}
                    style={{ backgroundColor: 'transparent' }}
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleNavigate('/social')}
                    className={`transition-colors rounded-lg p-2 focus:outline-none ${
                      isActivePath('/social')
                        ? 'text-yellow-400'
                        : 'text-gray-400 hover:text-yellow-400'
                    }`}
                    style={{ backgroundColor: 'transparent' }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-400/20 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 URCV. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
