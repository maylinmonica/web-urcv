import React, { useEffect, useState } from 'react';

import { 
  Users, Target, Award, CheckCircle, 
  Star, Globe, Shield, Zap, 
  FileText, Download, Palette, Edit 
} from 'lucide-react';
import Header from './welcomepage/header';
import DashboardHeader from './welcomepage/HeaderDasboard';
import Footer from './welcomepage/Footer';

const About = () => {
  const [user, setUser] = useState(null);

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

  const stats = [
    { number: '50K+', label: 'CV Dibuat', icon: <FileText className="w-6 h-6" /> },
    { number: '7', label: 'Template Profesional', icon: <Palette className="w-6 h-6" /> },
    { number: '98%', label: 'Tingkat Kepuasan', icon: <Star className="w-6 h-6" /> },
    { number: '24/7', label: 'Dukungan Online', icon: <Globe className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Mudah Digunakan",
      description: "Interface yang intuitif dan user-friendly, memungkinkan siapa saja untuk membuat CV profesional tanpa keahlian desain khusus.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Kualitas Profesional",
      description: "Template yang dirancang oleh ahli HR dan desainer profesional untuk memastikan CV Anda menonjol di mata recruiter.",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gratis Selamanya",
      description: "Komitmen kami untuk memberikan layanan terbaik tanpa biaya tersembunyi. Semua fitur dasar tersedia gratis untuk semua pengguna.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cepat & Efisien",
      description: "Proses pembuatan CV yang streamlined, dari input data hingga download PDF hanya membutuhkan waktu beberapa menit saja.",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const team = [
    {
      name: "Tim Pengembang",
      role: "Full Stack Development",
      description: "Mengembangkan platform yang stabil dan inovatif"
    },
    {
      name: "Tim Desain",
      role: "UI/UX & Template Design",
      description: "Menciptakan template yang menarik dan professional"
    },
    {
      name: "Tim Customer Support",
      role: "24/7 Support Team",
      description: "Membantu pengguna dengan layanan terbaik"
    }
  ];

  return (
    <div className="w-full min-h-screen">
      {user ? <DashboardHeader user={user} /> : <Header />}

      
      <div className="bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 text-black text-sm font-semibold mb-6">
                <Users className="w-4 h-4 mr-2" />
                Tentang URCV
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Membangun Karir Impian Anda
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                  Dengan CV Profesional
                </span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                URCV adalah platform pembuat CV profesional yang dirancang untuk membantu Anda membuat 
                kesan pertama yang luar biasa. Dengan teknologi terdepan dan template yang dibuat oleh 
                para ahli, kami memastikan CV Anda menonjol di antara ribuan pelamar lainnya.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-black mb-6">
                  Cerita di Balik URCV
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    URCV lahir dari pengalaman pribadi para founder yang pernah mengalami kesulitan 
                    dalam membuat CV yang menarik dan profesional. Kami memahami betapa frustrasinya 
                    menghabiskan berjam-jam untuk mendesain CV, hanya untuk mendapat hasil yang 
                    tidak memuaskan.
                  </p>
                  <p>
                    Dengan latar belakang di bidang teknologi dan HR, kami memutuskan untuk menciptakan 
                    solusi yang memungkinkan siapa saja membuat CV berkualitas tinggi tanpa perlu 
                    keahlian desain khusus. Platform ini dikembangkan dengan focus pada kemudahan 
                    penggunaan dan hasil yang profesional.
                  </p>
                  <p>
                    Hingga saat ini, lebih dari 50,000 profesional telah mempercayai URCV untuk 
                    membantu mereka mendapatkan pekerjaan impian. Kami terus berinovasi dan 
                    mengembangkan fitur baru untuk memberikan pengalaman terbaik bagi pengguna.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-400 to-blue-600 rounded-xl p-8 text-white">
                  <div className="text-center mb-6">
                    <Award className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Visi Kami</h3>
                  </div>
                  <p className="text-center text-lg opacity-90 leading-relaxed">
                    "Menjadi platform #1 di Indonesia untuk pembuatan CV profesional, 
                    membantu setiap individu mendapatkan kesempatan kerja yang layak 
                    dengan CV yang menonjol dan berkualitas tinggi."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Nilai-Nilai Kami
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Prinsip-prinsip yang menjadi fondasi dalam mengembangkan URCV
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-xl border-2 border-gray-100 hover:border-yellow-400/50 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                  <div className={`inline-flex p-4 rounded-xl ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Tim di Balik URCV
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profesional berpengalaman yang berdedikasi untuk memberikan layanan terbaik
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default About;