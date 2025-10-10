import React, { useEffect, useState } from 'react';
import { 
  BookOpen, FileText, Download, Edit, Play, 
  Users, CheckCircle, ArrowRight, Star, 
  Palette, Globe, Shield, Zap, MessageCircle, Phone, Mail
} from 'lucide-react';

import Header from './welcomepage/header';
import DashboardHeader from './welcomepage/HeaderDasboard';
import Footer from './welcomepage/Footer';

const Help = () => {
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

  const helpSections = [
    {
      title: "Memulai dengan URCV",
      icon: <Play className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "Langkah pertama untuk memulai perjalanan membuat CV profesional",
      steps: [
        "Klik tombol 'Buat CV Sekarang' di halaman utama",
        "Daftar akun gratis dengan email Anda",
        "Verifikasi email untuk mengaktifkan akun",
        "Login ke dashboard dan mulai membuat CV pertama Anda"
      ]
    },
    {
      title: "Membuat CV Baru",
      icon: <FileText className="w-8 h-8" />,
      color: "bg-yellow-50 text-yellow-600",
      description: "Panduan lengkap untuk membuat CV dari awal hingga selesai",
      steps: [
        "Pilih template CV yang sesuai dengan industri Anda",
        "Isi form data pribadi dengan lengkap dan akurat",
        "Tambahkan pengalaman kerja dari yang terbaru",
        "Masukkan pendidikan dan skill yang relevan",
        "Preview CV sebelum melanjutkan ke langkah berikutnya"
      ]
    },
    {
      title: "Mengedit CV",
      icon: <Edit className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      description: "Cara mudah untuk memperbarui dan mengedit CV yang sudah ada",
      steps: [
        "Masuk ke dashboard dan pilih CV yang ingin diedit",
        "Klik tombol 'Edit' pada CV yang dipilih",
        "Ubah informasi yang diperlukan pada form",
        "Gunakan fitur preview untuk melihat perubahan",
        "Simpan perubahan setelah selesai mengedit"
      ]
    },
    {
      title: "Mengunduh CV",
      icon: <Download className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
      description: "Proses akhir untuk mendapatkan CV dalam format PDF siap pakai",
      steps: [
        "Pastikan semua data CV sudah lengkap dan benar",
        "Klik tombol 'Download PDF' pada CV yang diinginkan",
        "Tunggu proses generate PDF selesai",
        "File PDF akan otomatis terunduh ke perangkat Anda",
        "CV siap untuk dikirim ke HRD atau recruiter"
      ]
    }
  ];

  const quickTips = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Tips Membuat CV Menarik",
      description: "Gunakan template yang sesuai dengan industri Anda dan pastikan informasi singkat namun lengkap",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Pilih Template yang Tepat",
      description: "Setiap template dirancang untuk industri tertentu, pilih yang paling sesuai dengan bidang Anda",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Aman & Terlindungi",
      description: "Semua data pribadi Anda tersimpan dengan aman dan tidak akan dibagikan kepada pihak ketiga",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Proses Cepat & Mudah",
      description: "Dari mendaftar hingga download CV hanya membutuhkan waktu kurang dari 10 menit",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat langsung dengan tim support kami",
      action: "Mulai Chat",
      color: "bg-blue-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Kirim pertanyaan detail melalui email",
      action: "Kirim Email",
      color: "bg-yellow-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon",
      description: "Hubungi tim support via telepon",
      action: "Hubungi Sekarang",
      color: "bg-green-600"
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
                <BookOpen className="w-4 h-4 mr-2" />
                Panduan URCV
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Panduan Lengkap
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                  Membuat CV Profesional
                </span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Pelajari langkah-langkah lengkap untuk membuat CV profesional yang memikat HRD. 
                Dari pendaftaran hingga download PDF, semua dijelaskan secara detail dan mudah dipahami.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Tips & Trik Cepat
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Beberapa tips penting untuk memaksimalkan penggunaan URCV
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickTips.map((tip, index) => (
                <div key={index} className="group p-6 rounded-xl border-2 border-gray-100 hover:border-yellow-400/50 hover:bg-gray-50 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl ${tip.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {tip.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Help Sections */}
        <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Panduan Langkah Demi Langkah
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ikuti panduan lengkap ini untuk membuat CV profesional dengan mudah dan cepat
              </p>
            </div>

            <div className="space-y-12">
              {helpSections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-400/30 transition-all duration-300 shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className={`p-4 rounded-xl ${section.color} group-hover:scale-110 transition-transform duration-300`}>
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-2">{section.title}</h3>
                        <p className="text-gray-600">{section.description}</p>
                      </div>
                      <div className="flex-shrink-0 ml-auto">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {section.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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

export default Help;