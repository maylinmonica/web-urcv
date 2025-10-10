import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../welcomepage/header';
import DashboardHeader from '../welcomepage/HeaderDasboard';
import Footer from '../welcomepage/Footer';
import { Calendar, ArrowLeft, Clock, User, BookOpen } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse user data', err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        setError('Gagal memuat artikel');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(' ').length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {user ? <DashboardHeader user={user} /> : <Header />}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {user ? <DashboardHeader user={user} /> : <Header />}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {user ? <DashboardHeader user={user} /> : <Header />}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Artikel tidak ditemukan.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {user ? <DashboardHeader user={user} /> : <Header />}

      {/* Back Button - Floating */}
      <div className="fixed top-24 left-4 z-20 md:left-8">
        <Link
          to="/blog"
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Kembali</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Hero Image with Overlay */}
        {blog.image_url && (
          <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {blog.title}
                </h1>
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                  {blog.created_at && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{estimateReadTime(blog.content)} min baca</span>
                  </div>
                  
                  {blog.author && (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for no image */}
        {!blog.image_url && (
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-white/90">
                {blog.created_at && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{estimateReadTime(blog.content)} min baca</span>
                </div>
                
                {blog.author && (
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{blog.author}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Article Header */}
          <div className="p-8 md:p-12 border-b border-gray-100">
            {/* Description */}
            {blog.description && (
              <div className="mb-8">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light italic">
                  {blog.description}
                </p>
              </div>
            )}


          </div>

          {/* Article Body */}
          <div className="p-8 md:p-12">
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Article Footer */}
          <div className="p-8 md:p-12 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <p>Artikel ini diterbitkan pada {formatDate(blog.created_at)}</p>
              </div>
              
              <Link
                to="/blog"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Artikel Lainnya</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing before footer */}
      <div className="pb-16"></div>

      <Footer />
    </div>
  );
};

export default BlogDetail;