import React, { useEffect, useState } from 'react';
import {
  HelpCircle, ChevronDown, ChevronUp, Search,
  Star, Users, FileText, Shield, CreditCard, Download,
  BookOpen, MessageCircle, Phone, Mail, Zap
} from 'lucide-react';

import Header from './welcomepage/header';
import DashboardHeader from './welcomepage/HeaderDasboard';
import Footer from './welcomepage/Footer';

const FAQ = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

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

  const faqCategories = [
    { id: 'all', label: 'Semua', icon: <HelpCircle className="w-4 h-4" />, color: 'bg-blue-50 text-blue-600' },
    { id: 'general', label: 'Umum', icon: <Users className="w-4 h-4" />, color: 'bg-green-50 text-green-600' },
    { id: 'account', label: 'Akun', icon: <Shield className="w-4 h-4" />, color: 'bg-purple-50 text-purple-600' },
    { id: 'cv', label: 'CV', icon: <FileText className="w-4 h-4" />, color: 'bg-yellow-50 text-yellow-600' },
    { id: 'payment', label: 'Pembayaran', icon: <CreditCard className="w-4 h-4" />, color: 'bg-red-50 text-red-600' },
    { id: 'technical', label: 'Teknis', icon: <Download className="w-4 h-4" />, color: 'bg-indigo-50 text-indigo-600' }
  ];

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'Apa itu URCV dan bagaimana cara kerjanya?',
      answer: 'URCV adalah platform online untuk membuat CV profesional dengan mudah. Anda dapat memilih template, mengisi data pribadi, dan mendapatkan CV dalam format PDF yang siap untuk dikirim ke HRD atau recruiter.',
      popular: true
    },
    {
      id: 2,
      category: 'general',
      question: 'Apakah URCV gratis untuk digunakan?',
      answer: 'Ya, URCV menyediakan layanan gratis dengan fitur dasar yang sudah sangat lengkap. Anda dapat membuat hingga 3 CV dengan template premium dan download dalam format PDF.',
      popular: true
    },
    {
      id: 3,
      category: 'account',
      question: 'Bagaimana cara mendaftar akun di URCV?',
      answer: 'Klik tombol "Daftar" di halaman utama, isi email dan password, lalu verifikasi email Anda. Setelah verifikasi, akun Anda langsung aktif dan siap digunakan.',
      popular: false
    },
    {
      id: 4,
      category: 'account',
      question: 'Lupa password, bagaimana cara reset?',
      answer: 'Klik "Lupa Password" di halaman login, masukkan email Anda, dan ikuti instruksi yang dikirim ke email. Anda akan mendapatkan link untuk membuat password baru.',
      popular: false
    },
    {
      id: 5,
      category: 'cv',
      question: 'Berapa banyak CV yang bisa saya buat?',
      answer: 'Pengguna gratis dapat membuat hingga 3 CV dengan template yang berbeda. Jika Anda membutuhkan lebih banyak CV, Anda dapat upgrade ke paket premium.',
      popular: true
    },
    {
      id: 6,
      category: 'cv',
      question: 'Apakah saya bisa mengedit CV yang sudah dibuat?',
      answer: 'Tentu! Anda bisa mengedit CV kapan saja melalui dashboard. Semua perubahan akan tersimpan otomatis dan Anda dapat download ulang CV yang sudah diperbarui.',
      popular: true
    },
    {
      id: 8,
      category: 'technical',
      question: 'Format apa saja yang bisa diunduh?',
      answer: 'Saat ini URCV mendukung download dalam format PDF dengan kualitas tinggi. Format PDF dipilih karena kompatibel dengan semua perangkat dan mudah dibaca oleh sistem ATS.',
      popular: false
    }
  ];

  const quickTips = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "FAQ Populer",
      description: "Pertanyaan yang paling sering ditanyakan oleh pengguna URCV",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Pencarian Cepat",
      description: "Gunakan fitur pencarian untuk menemukan jawaban dengan mudah",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Dukungan Live Chat",
      description: "Tim support siap membantu Anda 24/7 melalui live chat",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Respons Cepat",
      description: "Pertanyaan Anda akan dijawab dalam hitungan menit",
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

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
    setExpandedItems(newExpanded);
  };

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQ = faqData.filter(item => item.popular);

  return (
    <div className="w-full min-h-screen">
      {user ? <DashboardHeader user={user} /> : <Header />}
      
      <div className="bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 text-black text-sm font-semibold mb-6">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ URCV
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Frequently Asked
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Temukan jawaban dari pertanyaan yang sering diajukan seputar penggunaan URCV. 
                Dari cara mendaftar hingga tips membuat CV yang menarik, semua ada di sini.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Tips Menggunakan FAQ
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cara efektif untuk menemukan jawaban yang Anda butuhkan
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

        {/* Search + Filter Section */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-400/30 transition-all duration-300 shadow-lg p-8 mb-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black mb-2">Cari Pertanyaan</h2>
                <p className="text-gray-600">Gunakan pencarian atau filter kategori untuk menemukan jawaban</p>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan atau kata kunci..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-3 rounded-lg font-medium transition-all duration-200 flex flex-col items-center space-y-2 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-yellow-400 to-blue-600 text-black shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeCategory === category.id ? 'bg-white/20' : category.color}`}>
                      {category.icon}
                    </div>
                    <span className="text-sm">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Popular Questions */}
              {activeCategory === 'all' && searchTerm === '' && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center space-x-2">
                      <Star className="h-8 w-8 text-yellow-400" />
                      <span>Pertanyaan Populer</span>
                    </h2>
                    <p className="text-gray-600">Pertanyaan yang paling sering ditanyakan oleh pengguna</p>
                  </div>
                  <div className="space-y-4">
                    {popularFAQ.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-400/30 transition-all duration-300 shadow-lg overflow-hidden">
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-gray-900">{item.question}</span>
                          </div>
                          <div className="flex-shrink-0">
                            {expandedItems.has(item.id) ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        {expandedItems.has(item.id) && (
                          <div className="px-6 pb-4 bg-gray-50">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All or filtered questions */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center space-x-2">
                    <HelpCircle className="h-8 w-8 text-yellow-400" />
                    <span>
                      {activeCategory === 'all'
                        ? 'Semua Pertanyaan'
                        : faqCategories.find(cat => cat.id === activeCategory)?.label || 'Pertanyaan'}
                    </span>
                  </h2>
                  <p className="text-gray-600">
                    {filteredFAQ.length} pertanyaan ditemukan
                  </p>
                </div>

                {filteredFAQ.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-100 shadow-lg">
                    <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada pertanyaan yang ditemukan</h3>
                    <p className="text-gray-500">Coba ubah kata kunci pencarian atau pilih kategori lain</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQ.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-400/30 transition-all duration-300 shadow-lg overflow-hidden">
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className={`p-2 rounded-lg ${faqCategories.find(cat => cat.id === item.category)?.color || 'bg-gray-100'}`}>
                                {faqCategories.find(cat => cat.id === item.category)?.icon}
                              </div>
                            </div>
                            <span className="font-semibold text-gray-900">{item.question}</span>
                          </div>
                          <div className="flex-shrink-0">
                            {expandedItems.has(item.id) ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        {expandedItems.has(item.id) && (
                          <div className="px-6 pb-4 bg-gray-50">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;