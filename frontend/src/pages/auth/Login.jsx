import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import Header from '../welcomepage/header';
import Footer from '../welcomepage/Footer';
import { useNotification } from '../../components/NotificationContext'; 

const Login = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post('/login', formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);

      showNotification('Berhasil masuk!', 'success'); // Notifikasi sukses
      navigate('/dashboard');
    } catch (error) {
      showNotification(error.response?.data?.msg || 'Login gagal, silakan coba lagi.', 'error'); // Notifikasi error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 relative flex items-center justify-center px-4">
        {/* Background decor */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl z-0"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-1/2 w-24 h-24 bg-yellow-400/8 rounded-full blur-xl z-0"></div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 border-2 border-yellow-400/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-2">
              Masuk ke URCV
            </h2>
            <p className="text-sm text-gray-400">Masukkan email dan kata sandi Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 text-sm pr-12 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 hover:from-yellow-500 hover:to-blue-700 text-black font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-600">
            <p className="text-sm text-gray-400">
              Belum punya akun?{' '}
              <Link
                to="/register"
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
