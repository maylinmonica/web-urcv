import React, { useEffect, useState } from 'react';
import { 
  HeadphonesIcon, MessageCircle, Mail, Phone, Clock, 
  Users, CheckCircle, ArrowRight, Star, 
  Shield, Zap, BookOpen, HelpCircle, MessageSquare, FileText
} from 'lucide-react';

import Header from './welcomepage/header';
import DashboardHeader from './welcomepage/HeaderDasboard';
import Footer from './welcomepage/Footer';

const Support = () => {
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

  const supportOptions = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Kirim pertanyaan detail dan dapatkan panduan lengkap melalui email",
      color: "bg-yellow-50 text-yellow-600",
      buttonColor: "bg-yellow-500",
      action: "Kirim Email",
      availability: "hello@urcv.id",
      responseTime: "< 24 jam"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telepon",
      description: "Hubungi tim support untuk bantuan langsung via telepon",
      color: "bg-green-50 text-green-600",
      buttonColor: "bg-green-600",
      action: "Hubungi Sekarang",
      availability: "08:00 - 22:00 WITA",
      responseTime: "Langsung"
    }
  ];

  const quickHelp = [
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "FAQ Umum",
      description: "Temukan jawaban cepat untuk pertanyaan yang sering diajukan",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Panduan Lengkap",
      description: "Pelajari cara menggunakan semua fitur URCV dengan mudah",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Komunitas User",
      description: "Bergabung dengan komunitas pengguna URCV untuk tips dan trik",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Keamanan Data",
      description: "Pelajari bagaimana kami melindungi data pribadi Anda",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const supportStats = [
    {
      number: "99.9%",
      label: "Uptime System",
      description: "Sistem selalu tersedia untuk Anda"
    },
    {
      number: "< 5 min",
      label: "Response Time",
      description: "Waktu respons rata-rata support"
    },
    {
      number: "24/7",
      label: "Available",
      description: "Support tersedia sepanjang waktu"
    },
    {
      number: "10K+",
      label: "Happy Users",
      description: "Pengguna yang puas dengan layanan kami"
    }
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Header berbeda tergantung user login */}
      {user ? <DashboardHeader user={user} /> : <Header />}
      
      <div className="bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 text-black text-sm font-semibold mb-6">
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Pusat Bantuan
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Butuh Bantuan?
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                  Kami Siap Membantu!
                </span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Tim support EasyCV siap membantu Anda 24/7. Dapatkan bantuan cepat melalui berbagai 
                channel komunikasi yang tersedia atau temukan jawaban di panduan lengkap kami.
              </p>
            </div>
          </div>
        </section>

        {/* Support Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportStats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-yellow-400/50 hover:bg-gray-50 transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-black mb-1">
                    {stat.label}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Bantuan Cepat
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cari jawaban cepat sebelum menghubungi support
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickHelp.map((help, index) => (
                <div key={index} className="group p-6 rounded-xl border-2 border-gray-100 hover:border-yellow-400/50 hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                  <div className={`inline-flex p-3 rounded-xl ${help.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {help.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{help.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{help.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Support Options */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Pilih Cara Terbaik Untuk Menghubungi Kami
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Berbagai channel support tersedia untuk memastikan Anda mendapatkan bantuan yang tepat
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {supportOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-400/30 transition-all duration-300 shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className={`p-4 rounded-xl ${option.color} group-hover:scale-110 transition-transform duration-300`}>
                          {option.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-black mb-2">{option.title}</h3>
                        <p className="text-gray-600 mb-4">{option.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-medium">Ketersediaan:</span>
                            <span className="ml-2">{option.availability}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Zap className="w-4 h-4 mr-2" />
                            <span className="font-medium">Response Time:</span>
                            <span className="ml-2">{option.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button className={`w-full ${option.buttonColor} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2`}>
                      <span>{option.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Atau Kirim Pesan Langsung
              </h2>
              <p className="text-lg text-gray-600">
                Isi form di bawah ini dan tim kami akan segera menghubungi Anda
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-100 shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    placeholder="Jelaskan masalah atau pertanyaan Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    placeholder="Berikan detail lengkap mengenai masalah atau pertanyaan Anda..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Kirim Pesan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Support;