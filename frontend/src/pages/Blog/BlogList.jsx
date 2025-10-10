import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Calendar, User, ArrowRight, Loader2,
  AlertCircle, BookOpen
} from 'lucide-react';
import axios from 'axios';

import Header from '../welcomepage/header';
import DashboardHeader from '../welcomepage/HeaderDasboard';
import Footer from '../welcomepage/Footer';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  // Ambil data user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('User data corrupt', e);
      }
    }
  }, []);

  // Ambil data blog dari API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
      setFilteredBlogs(response.data);
    } catch (err) {
      setError('Gagal mengambil data blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter berdasarkan search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header berbeda tergantung user login */}
      {user ? <DashboardHeader user={user} /> : <Header />}
      
      <div className="bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        {/* Hero Section - Style sama seperti FAQ */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 text-black text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                BLOG URCV
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Artikel & Tips
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                  Karier
                </span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Temukan wawasan terbaru dan tips praktis untuk mengembangkan karier Anda. 
                Dari cara membuat CV yang menarik hingga tips sukses wawancara kerja.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center space-x-2">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                  <span>Artikel Terbaru</span>
                </h2>
                <p className="text-gray-600">Temukan artikel yang sesuai dengan kebutuhan Anda</p>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-yellow-400/30 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all shadow-lg"
                />
              </div>
            </div>
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mb-4" />
                <p className="text-gray-600 text-lg">Memuat artikel...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex flex-col items-center justify-center py-16">
                <AlertCircle className="h-8 w-8 text-red-400 mb-4" />
                <p className="text-red-400 text-lg">{error}</p>
              </div>
            )}

            {/* No Results */}
            {!loading && !error && filteredBlogs.length === 0 && searchQuery && (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-100 shadow-lg">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada artikel yang ditemukan</h3>
                <p className="text-gray-500">Tidak ada artikel yang ditemukan untuk "{searchQuery}"</p>
              </div>
            )}

            {/* Blog Grid */}
            {!loading && !error && filteredBlogs.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <p className="text-gray-600">
                    {filteredBlogs.length} artikel ditemukan
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-yellow-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/20 group shadow-lg"
                    >
                      {/* Image */}
                      {blog.image_url && (
                        <div className="relative overflow-hidden">
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                          {blog.title}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {blog.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between mb-4">
                          {blog.created_at && (
                            <div className="flex items-center space-x-2 text-gray-500 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(blog.created_at)}</span>
                            </div>
                          )}
                          {blog.author && (
                            <div className="flex items-center space-x-2 text-gray-500 text-sm">
                              <User className="h-4 w-4" />
                              <span>{blog.author}</span>
                            </div>
                          )}
                        </div>

                        {/* Read More */}
                        <Link
                          to={`/blog/${blog.id}`}
                          className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors group-hover:translate-x-1 transform duration-200"
                        >
                          <span>Baca Selengkapnya</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Blogs at All */}
            {!loading && !error && blogs.length === 0 && !searchQuery && (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-100 shadow-lg">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada artikel yang tersedia</h3>
                <p className="text-gray-500">Artikel akan segera hadir untuk Anda</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BlogList;