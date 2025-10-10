import React, { useEffect, useState } from 'react';
import { 
  Instagram, Linkedin, 
  Users, Heart, MessageCircle, Share2, 
  Star, Zap, Globe, ArrowRight, ExternalLink,
  Camera, Video, BookOpen, TrendingUp
} from 'lucide-react';

import Header from './welcomepage/header';
import DashboardHeader from './welcomepage/HeaderDasboard';
import Footer from './welcomepage/Footer';

const Social = () => {
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

  const socialPlatforms = [
    {
      name: 'Instagram',
      username: '@urcv.id',
      link: 'https://instagram.com/urcv.id',
      icon: <Instagram className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
      hoverColor: 'hover:from-purple-700 hover:to-pink-700',
      description: 'Tips karier harian, template CV menarik, dan inspirasi desain profesional',
      followers: '15K+',
      contentType: 'Visual Content & Stories',
      postFrequency: 'Harian'
    },
    {
      name: 'LinkedIn',
      username: 'URCV Indonesia',
      link: 'https://linkedin.com/company/urcv',
      icon: <Linkedin className="w-8 h-8" />,
      color: 'bg-gradient-to-r from-blue-700 to-blue-800',
      hoverColor: 'hover:from-blue-800 hover:to-blue-900',
      description: 'Artikel mendalam tentang karier, networking, dan perkembangan industri',
      followers: '12K+',
      contentType: 'Professional Articles',
      postFrequency: '2-3x/minggu'
    }
  ];

  const socialStats = [
    {
      number: "27K+",
      label: "Total Followers",
      description: "Across all platforms",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "300+",
      label: "Posts per Month",
      description: "Fresh content daily",
      icon: <Camera className="w-6 h-6" />
    },
    {
      number: "95%",
      label: "Engagement Rate",
      description: "Active community",
      icon: <Heart className="w-6 h-6" />
    },
    {
      number: "24/7",
      label: "Community Support",
      description: "Always here for you",
      icon: <MessageCircle className="w-6 h-6" />
    }
  ];

  const contentHighlights = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Tips Karier Harian",
      description: "Konten edukatif seputar pengembangan karier dan skill profesional",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Template CV Premium",
      description: "Desain CV terbaru yang menarik perhatian HRD dan recruiter",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Tutorial Lengkap",
      description: "Video step-by-step membuat CV profesional dan tips interview",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Trend Industri",
      description: "Update terbaru tentang tren hiring dan perkembangan dunia kerja",
      color: "bg-purple-50 text-purple-600"
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
                <Share2 className="w-4 h-4 mr-2" />
                Sosial Media
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Temui Kami di
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                  Sosial Media
                </span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Bergabunglah dengan komunitas EasyCV di berbagai platform sosial media. 
                Dapatkan tips karier, update produk terbaru, dan inspirasi seputar CV profesional.
              </p>
            </div>
          </div>
        </section>

        {/* Social Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialStats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-yellow-400/50 hover:bg-gray-50 transition-all duration-300">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-blue-600 text-white mb-4">
                    {stat.icon}
                  </div>
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

        {/* Content Highlights */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Konten yang Kami Bagikan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Berbagai jenis konten edukatif dan inspiratif untuk mendukung perjalanan karier Anda
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contentHighlights.map((content, index) => (
                <div key={index} className="group p-6 rounded-xl border-2 border-gray-100 hover:border-yellow-400/50 hover:bg-gray-50 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl ${content.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {content.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{content.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{content.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Platforms */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Platform Sosial Media Kami
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow kami di berbagai platform untuk mendapatkan konten terbaik sesuai preferensi Anda
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {socialPlatforms.map((platform, index) => (
                <div key={index} className="bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-400/30 transition-all duration-300 shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className={`p-4 rounded-xl ${platform.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                          {platform.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-black mb-1">{platform.name}</h3>
                        <p className="text-gray-500 font-medium mb-3">{platform.username}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{platform.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-black">{platform.followers}</div>
                        <div className="text-xs text-gray-500">Followers</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs font-semibold text-black">{platform.contentType}</div>
                        <div className="text-xs text-gray-500">Content Type</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs font-semibold text-black">{platform.postFrequency}</div>
                        <div className="text-xs text-gray-500">Post Frequency</div>
                      </div>
                    </div>
                    
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${platform.color} ${platform.hoverColor} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2`}
                    >
                      <span>Follow {platform.name}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 text-black text-sm font-semibold mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Join Our Community
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Bergabunglah dengan
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                27K+ Professionals
              </span>
            </h2>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              Ikuti semua platform sosial media kami untuk mendapatkan update terlengkap 
              dan menjadi bagian dari komunitas profesional yang terus berkembang.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialPlatforms.map((platform, index) => (
                <a
                  key={index}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${platform.color} ${platform.hoverColor} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 hover:scale-105`}
                >
                  {platform.icon}
                  <span>Follow</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Social;