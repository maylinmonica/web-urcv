import React, { useState, useEffect } from 'react';
import { 
  FileText, Users, Calendar, BookOpen, Play, 
  Star, ArrowRight, Edit, Download, Award, CheckCircle, 
  Zap, Palette, Globe, Shield, Home, Info, Phone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
const handleNavigate = (path) => {
    navigate(`/${path}`);
  };

  const heroSlides = [
    {
      title: "CV Profesional",
      subtitle: "Buat CV yang menarik dalam hitungan menit",
      icon: <FileText className="w-20 h-20" />,
      color: "from-blue-600 to-black"
    },
    {
      title: "7 Template Pilihan",
      subtitle: "Pilih dari 7 template profesional yang tersedia",
      icon: <Palette className="w-20 h-20" />,
      color: "from-yellow-400 to-blue-600"
    },
    {
      title: "Download Instan",
      subtitle: "Download CV siap pakai dalam format PDF",
      icon: <Download className="w-20 h-20" />,
      color: "from-black to-yellow-400"
    }
  ];

  const features = [
    {
      icon: <Edit className="w-8 h-8" />,
      title: "Form Editor Mudah",
      description: "Interface yang user-friendly untuk mengisi data CV Anda dengan mudah dan cepat",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Preview Real-time",
      description: "Lihat hasil CV Anda secara langsung saat mengisi form tanpa perlu menunggu",
      color: "bg-yellow-50 text-yellow-600",
      hoverColor: "hover:bg-yellow-100"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download PDF",
      description: "Unduh CV dalam format PDF berkualitas tinggi siap untuk dikirim ke HRD",
      color: "bg-black/5 text-black",
      hoverColor: "hover:bg-black/10"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "7 Template Profesional",
      description: "Pilihan template yang beragam dan sesuai dengan berbagai industri profesional",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100"
    }
  ];



  
  return (
    <div className="w-full min-h-screen">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="space-y-6 text-left">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 text-white text-sm font-semibold shadow-lg">
                    <Award className="w-4 h-4 mr-2" />
                    Platform #1 untuk Membuat CV Profesional
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-left">
                    <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                      URCV
                    </span>
                    <br />
                    <span className="text-black">Buat CV</span>
                    <br />
                    <span className="text-black">Dalam Menit</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-lg text-left leading-relaxed">
                    Platform pembuat CV profesional yang mudah digunakan. 
                    Buat, edit, dan download CV Anda dalam format PDF berkualitas tinggi dengan template pilihan!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleNavigate('register')}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-800 to-yellow-500 text-white rounded-lg font-semibold hover:from-blue-900 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-center"
                  >
                    Buat CV Sekarang
                    <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
               
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-left">
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">50K+</div>
                    <div className="text-sm text-gray-600">CV Dibuat</div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">7</div>
                    <div className="text-sm text-gray-600">Template</div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">98%</div>
                    <div className="text-sm text-gray-600">Puas</div>
                  </div>
                </div>
              </div>

              <div className="relative w-full">
                <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden border-2 border-yellow-400/20 shadow-xl">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      }`}
                    >
                      <div className={`h-full bg-gradient-to-br ${slide.color} rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center p-8">
                          <div className="mb-6 text-white/90 flex justify-center items-center">{slide.icon}</div>

                          <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                          <p className="text-lg opacity-90 max-w-sm">{slide.subtitle}</p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6 space-x-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-gray-300 w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Fitur Lengkap untuk CV Profesional
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Semua yang Anda butuhkan untuk membuat CV yang menarik dan profesional dalam satu platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-8 rounded-xl border-2 border-black/10 ${feature.hoverColor} hover:shadow-xl hover:border-yellow-400/50 transition-all duration-300 cursor-pointer`}
                >
                  <div className={`inline-flex p-4 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-yellow-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Cara Kerja URCV
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hanya 4 langkah sederhana untuk membuat CV profesional Anda
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Daftar Akun",
                  description: "Buat akun gratis di URCV untuk memulai perjalanan karir Anda",
                  icon: <Users className="w-8 h-8" />
                },
                {
                  step: "2", 
                  title: "Pilih Template",
                  description: "Pilih template profesional yang sesuai dengan industri Anda",
                  icon: <Palette className="w-8 h-8" />
                },
                {
                  step: "3",
                  title: "Isi Data CV",
                  description: "Lengkapi form dengan data pribadi, pengalaman, dan skill Anda",
                  icon: <Edit className="w-8 h-8" />
                },
                {
                  step: "4",
                  title: "Download PDF",
                  description: "Preview dan download CV dalam format PDF siap kirim ke HRD",
                  icon: <Download className="w-8 h-8" />
                }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-black text-white w-full">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Siap Membuat CV Profesional?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                Bergabunglah dengan 50,000+ profesional yang sudah membuat CV menggunakan URCV. 
                Mulai gratis sekarang dan dapatkan pekerjaan impian Anda!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={() => handleNavigate('register')}
                className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-blue-600 text-black rounded-lg font-semibold hover:from-yellow-500 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Buat CV Sekarang - 100% Gratis!
                <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => handleNavigate('login')}
                className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                Sudah Punya Akun? Login
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Template Profesional</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>100% Gratis</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default Welcome;