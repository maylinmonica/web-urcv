import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  User, FileText, Plus, Clock, Eye, Edit, Trash2, 
  TrendingUp, Calendar, Award, Download
} from 'lucide-react'
import DashboardHeader from './welcomepage/HeaderDasboard'
import Footer from './welcomepage/Footer'
import ChooseTemplate from './cv/ChooseTemplate'
import PreviewModal from './cv/PreviewCV'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cvs, setCvs] = useState([])
  const [stats, setStats] = useState({ total_cvs: 0, last_activity: null })
  
  // Template popup states
  const [showTemplatePopup, setShowTemplatePopup] = useState(false)
  const [templates, setTemplates] = useState([])
  const [templatesLoading, setTemplatesLoading] = useState(false)

  // Preview modal states
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [selectedCvId, setSelectedCvId] = useState(null)

  const navigate = useNavigate()

  // Fungsi untuk refresh data CV
  const refreshCVData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const cvRes = await axios.get('/api/cv', { 
        headers: { Authorization: `Bearer ${token}` } 
      })
      
      const cvList = Array.isArray(cvRes.data) ? cvRes.data : []
      setCvs(cvList)

      // Update stats
      setStats(prev => ({
        ...prev,
        total_cvs: cvList.length,
        last_activity: cvList.length > 0 ? cvList[0].created_at : null
      }))
    } catch (err) {
      console.error('Gagal refresh CV data:', err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const [userRes, cvRes] = await Promise.all([
          axios.get('/api/me', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/cv', { headers: { Authorization: `Bearer ${token}` } })
        ])

        setUser(userRes.data)
        const cvList = Array.isArray(cvRes.data) ? cvRes.data : []
        setCvs(cvList)

        try {
          const statsRes = await axios.get('/api/dashboard-stats', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setStats(statsRes.data)
        } catch (err) {
          console.log('Stats fallback dipakai:', err)
          setStats({
            total_cvs: cvList.length,
            last_activity: cvList.length > 0 ? cvList[0].created_at : null
          })
        }
      } catch (err) {
        console.error('Gagal memuat data:', err)
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Listen untuk event refresh dari localStorage atau window
    const handleStorageChange = (e) => {
      if (e.key === 'refresh_dashboard') {
        refreshCVData()
        localStorage.removeItem('refresh_dashboard')
      }
    }

    const handleFocus = () => {
      // Refresh data ketika window kembali focus
      refreshCVData()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [navigate])

  // Fetch templates when popup opens
  const fetchTemplates = async () => {
    setTemplatesLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/templates', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTemplates(response.data)
    } catch (err) {
      console.error('Gagal memuat template:', err)
      // Fallback templates jika API gagal
      setTemplates([
        {
          id: 1,
          name: 'Template Klasik',
          description: 'Template sederhana dan profesional',
          preview_image_url: '/assets/template1.png'
        },
        {
          id: 2,
          name: 'Template Modern',
          description: 'Template dengan desain modern',
          preview_image_url: '/assets/template2.png'
        },
        {
          id: 3,
          name: 'Template Kreatif',
          description: 'Template untuk profesi kreatif',
          preview_image_url: '/assets/template3.png'
        }
      ])
    } finally {
      setTemplatesLoading(false)
    }
  }

  const handleCreateCV = async () => {
    await fetchTemplates()
    setShowTemplatePopup(true)
  }

  const handleSelectTemplate = (template) => {
    console.log('Template dipilih:', template)
    setShowTemplatePopup(false)
    // Navigasi ke halaman create CV dengan template yang dipilih
    navigate('/cv/create', { state: { selectedTemplate: template } })
  }

  // Handler untuk preview CV
  const handlePreviewCV = (cvId) => {
    setSelectedCvId(cvId)
    setShowPreviewModal(true)
  }

  // Handler untuk close preview modal
  const handleClosePreview = () => {
    setShowPreviewModal(false)
    setSelectedCvId(null)
  }

  // Handler untuk download CV
  const handleDownloadCV = async (cvId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`/api/cv/${cvId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      })
      
      // Buat URL untuk download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      
      // Cari nama file dari CV
      const cv = cvs.find(c => c.id === parseInt(cvId))
      const fileName = cv ? `CV_${cv.first_name}_${cv.last_name}.pdf` : `CV_${cvId}.pdf`
      
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Gagal download CV:', err)
      alert('Terjadi kesalahan saat mengunduh CV.')
    }
  }

  const handleDeleteCV = async (cvId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus CV ini?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/cv/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Update state lokal
      const updatedCvs = cvs.filter(cv => cv.id !== cvId)
      setCvs(updatedCvs)
      setStats(prev => ({
        ...prev,
        total_cvs: updatedCvs.length,
        last_activity: updatedCvs.length > 0 ? updatedCvs[0].created_at : null
      }))
    } catch (err) {
      console.error('Gagal menghapus CV:', err)
      alert('Terjadi kesalahan saat menghapus CV.')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getLastActivity = () => {
    if (!stats.last_activity) return 'Belum ada aktivitas'
    const diff = Math.floor((new Date() - new Date(stats.last_activity)) / (1000 * 60 * 60 * 24))
    return diff === 0 ? 'Hari ini' : diff === 1 ? 'Kemarin' : `${diff} hari yang lalu`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-400 mx-auto mb-4" />
            <p className="text-gray-600">Memuat dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
      <DashboardHeader user={user} />

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-black" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-2">
                Selamat Datang Kembali!
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                {user?.name || user?.email}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Terakhir aktif: {getLastActivity()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border-2 border-black/10 shadow-md hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total CV</p>
                <p className="text-3xl font-bold text-blue-900">{stats.total_cvs ?? 0}</p>
                <p className="text-xs text-gray-500 mt-1">CV yang telah dibuat</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black/10 shadow-md hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Template</p>
                <p className="text-3xl font-bold text-purple-900">7</p>
                <p className="text-xs text-gray-500 mt-1">Template tersedia</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black/10 shadow-md hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Aktivitas</p>
                <p className="text-3xl font-bold text-green-900">
                  {stats.last_activity ? '✓' : '—'}
                </p>
                <p className="text-xs text-gray-500 mt-1">{getLastActivity()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border-2 border-black/10 shadow-md hover:shadow-xl transition-all duration-300 p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Aksi Cepat</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleCreateCV}
              className="flex items-center gap-4 p-4 rounded-lg border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-blue-900">Buat CV Baru</h3>
                <p className="text-sm text-gray-600">Mulai dari template pilihanmu</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/cv')}
              className="flex items-center gap-4 p-4 rounded-lg border-2 border-green-100 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-green-900">Kelola CV</h3>
                <p className="text-sm text-gray-600">Lihat atau edit CV kamu</p>
              </div>
            </button>
          </div>
        </div>

        {/* CV List */}
        <div className="bg-white rounded-xl border-2 border-black/10 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-blue-900">CV Terbaru</h2>
              {cvs.length > 0 && (
                <button
                  onClick={() => navigate('/cv')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Lihat Semua
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {cvs.length > 0 ? (
              <div className="space-y-4">
                {cvs.slice(0, 5).map((cv) => (
                  <div
                    key={cv.id}
                    className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      {cv.photo_url ? (
                        <img
                          src={cv.photo_url}
                          alt="Foto Profil"
                          className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-gray-500 rounded-full text-xs">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-blue-900">{cv.first_name} {cv.last_name}</h3>
                        <div className="text-sm text-gray-600 flex gap-2 flex-wrap">
                          <span>{cv.email}</span>
                          {cv.city && <span>• {cv.city}</span>}
                          <span>• {formatDate(cv.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePreviewCV(cv.id)}
                        className="bg-green-700 text-white w-10 h-10 rounded-full hover:bg-green-800 transition-all duration-200 shadow-lg flex items-center justify-center"
                        title="Preview CV"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/cv/edit/${cv.id}`)}
                        className="bg-yellow-600 text-white w-10 h-10 rounded-full hover:bg-yellow-700 transition-all duration-200 shadow-lg flex items-center justify-center"
                        title="Edit CV"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCV(cv.id)}
                        className="bg-red-600 text-white w-10 h-10 rounded-full hover:bg-red-700 transition-all duration-200 shadow-lg flex items-center justify-center"
                        title="Hapus CV"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Belum ada CV</h3>
                <p className="text-gray-600 mb-6">Mulai membuat CV profesional pertama kamu</p>
                <button
                  onClick={handleCreateCV}
                  className="bg-gradient-to-r from-blue-800 to-yellow-500 text-white py-3 px-6 rounded-lg hover:from-blue-900 hover:to-yellow-600 transition-all duration-200 font-semibold shadow-md"
                >
                  Buat CV Pertama
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Template Selection Popup */}
      <ChooseTemplate
        isOpen={showTemplatePopup}
        onClose={() => setShowTemplatePopup(false)}
        templates={templates}
        onSelectTemplate={handleSelectTemplate}
        loading={templatesLoading}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreviewModal}
        onClose={handleClosePreview}
        cvId={selectedCvId}
        onDownload={handleDownloadCV}
      />

      <Footer />
    </div>
  )
}

export default Dashboard