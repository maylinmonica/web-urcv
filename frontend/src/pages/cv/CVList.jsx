import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Grid, List, Eye, Edit, Trash2, Download, Calendar, User, Mail, Phone, MapPin, Plus, SortAsc, SortDesc, FileText} from 'lucide-react';
import DashboardHeader from '../welcomepage/HeaderDasboard';
import ChooseTemplate from './ChooseTemplate';
import PreviewModal from './PreviewCV';

const CVCard = ({ cv, onDelete, onDownload, onPreview, viewMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {cv.photo_url ? (
              <img
                src={cv.photo_url}
                alt="Foto Profil"
                className="w-16 h-16 object-cover rounded-full border-3 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-yellow-100 flex items-center justify-center text-gray-500 rounded-full border-3 border-white shadow-lg">
                <User className="w-8 h-8" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {cv.first_name} {cv.last_name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{cv.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{cv.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{cv.city || 'Tidak diketahui'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(cv.created_at).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
              CV #{cv.id}
            </span>
            <button
              onClick={() => onPreview(cv.id)}
              className="bg-green-700 text-white w-10 h-10 rounded-full hover:bg-green-800 transition-all duration-200 shadow-lg flex items-center justify-center"
              title="Preview CV"
            >
              <Eye className="w-4 h-4" />
            </button>
            <Link
              to={`/cv/edit/${cv.id}`}
              className="bg-yellow-600 text-white w-10 h-10 rounded-full hover:bg-yellow-700 transition-all duration-200 shadow-lg flex items-center justify-center"
              title="Edit CV"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDownload(cv.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full transition-all duration-200 shadow-lg hover:shadow-lg flex items-center justify-center"
              title="Download CV"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(cv.id)}
              className="bg-red-600 text-white w-10 h-10 rounded-full hover:bg-red-700 transition-all duration-200 shadow-lg flex items-center justify-center"
              title="Hapus CV"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Section */}
      <div className="relative h-36 bg-gradient-to-br from-blue-50 via-white to-yellow-50 overflow-hidden">
      
        <div className="absolute bottom-4 left-4">
          {cv.photo_url ? (
            <img
              src={cv.photo_url}
              alt="Foto Profil"
              className="w-18 h-18 object-cover rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-18 h-18 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 rounded-full border-4 border-white shadow-lg text-xs font-medium">
              <User className="w-8 h-8" />
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
          {cv.first_name} {cv.last_name}
        </h3>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <p className="text-gray-600 text-sm truncate">{cv.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <p className="text-gray-600 text-sm truncate">{cv.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <p className="text-gray-600 text-sm truncate">{cv.city || 'Tidak diketahui'}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <p className="text-gray-600 text-sm">
              {new Date(cv.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onPreview(cv.id)}
            className="bg-green-700 hover:bg-green-800 text-white w-11 h-11 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group-hover:scale-105"
            title="Preview CV"
          >
            <Eye className="w-5 h-5" />
          </button>
          <Link
            to={`/cv/edit/${cv.id}`}
            className="bg-yellow-600 hover:bg-yellow-700 text-white w-11 h-11 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group-hover:scale-105"
            title="Edit CV"
          >
            <Edit className="w-5 h-5" />
          </Link>
          <button
            onClick={() => onDownload(cv.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-11 h-11 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group-hover:scale-105"
            title="Download CV"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(cv.id)}
            className="bg-red-600 hover:bg-red-700 text-white w-11 h-11 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group-hover:scale-105"
            title="Hapus CV"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CVList() {
  const [cvs, setCVs] = useState([]);
  const [filteredCVs, setFilteredCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  // Template popup states
  const [showTemplatePopup, setShowTemplatePopup] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  // Preview modal states
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCVId, setPreviewCVId] = useState(null);

  // Delete confirmation states
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const navigate = useNavigate();

  const fetchCVs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await axios.get('/api/cv', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const cvList = Array.isArray(res.data) ? res.data : [];
      setCVs(cvList);
      setFilteredCVs(cvList);
    } catch (err) {
      console.error('Gagal mengambil data CV:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setErrorMsg('Gagal memuat data CV. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('Gagal mengambil data user:', err);
      setUser({ name: 'User', email: 'user@example.com' });
    }
  };

  // Fetch templates when popup opens
  const fetchTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/templates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTemplates(response.data);
    } catch (err) {
      console.error('Gagal memuat template:', err);
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
      ]);
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleCreateCV = async () => {
    await fetchTemplates();
    setShowTemplatePopup(true);
  };

  const handleSelectTemplate = (template) => {
    console.log('Template dipilih:', template);
    // Navigasi ke halaman create CV dengan template yang dipilih
    navigate('/cv/create', { state: { selectedTemplate: template } });
  };

  // Handle preview CV
  const handlePreview = (cvId) => {
    setPreviewCVId(cvId);
    setShowPreviewModal(true);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setPreviewCVId(null);
  };

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/cv/${pendingDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCVs((prev) => prev.filter((cv) => cv.id !== pendingDeleteId));
      setFilteredCVs((prev) => prev.filter((cv) => cv.id !== pendingDeleteId));
    } catch (err) {
      console.error('Gagal menghapus CV:', err);
      alert('Terjadi kesalahan saat menghapus CV.');
    } finally {
      setShowConfirmDelete(false);
      setPendingDeleteId(null);
    }
  };

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/cv/${id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const file = new Blob([res.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = `cv-${id}.pdf`;
      link.click();
    } catch (err) {
      console.error('Gagal mendownload CV:', err);
      alert('Gagal mendownload CV.');
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterAndSortCVs(term, sortBy, filterBy);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    filterAndSortCVs(searchTerm, sortType, filterBy);
  };

  const handleFilter = (filterType) => {
    setFilterBy(filterType);
    filterAndSortCVs(searchTerm, sortBy, filterType);
  };

  const filterAndSortCVs = (search, sort, filter) => {
    let filtered = [...cvs];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(cv => 
        cv.first_name.toLowerCase().includes(search.toLowerCase()) ||
        cv.last_name.toLowerCase().includes(search.toLowerCase()) ||
        cv.email.toLowerCase().includes(search.toLowerCase()) ||
        (cv.city && cv.city.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply date filter
    if (filter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(cv => new Date(cv.created_at) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(cv => new Date(cv.created_at) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(cv => new Date(cv.created_at) >= filterDate);
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'name':
          return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

    setFilteredCVs(filtered);
  };

  useEffect(() => {
    fetchCVs();
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
      <DashboardHeader user={user} />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
                Daftar CV Saya
              </h1>
              <p className="text-gray-300 mt-2 text-sm md:text-base">
                Kelola dan akses semua CV yang telah Anda buat ({filteredCVs.length} CV)
              </p>
            </div>
            <button
              onClick={handleCreateCV}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-medium transition-all duration-200 hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Buat CV Baru
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, email, atau kota..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center gap-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => handleFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                >
                  <option value="all">Semua Waktu</option>
                  <option value="today">Hari Ini</option>
                  <option value="week">Minggu Ini</option>
                  <option value="month">Bulan Ini</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="name">Nama A-Z</option>
                  <option value="email">Email A-Z</option>
                </select>
                <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Memuat data CV...</p>
          </div>
        ) : errorMsg ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 text-lg">{errorMsg}</p>
            </div>
          </div>
        ) : filteredCVs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchTerm ? 'Tidak ada CV yang ditemukan' : 'Belum ada CV yang dibuat'}
              </h3>
              <p className="text-gray-600 mb-8">
                {searchTerm 
                  ? `Tidak ada CV yang cocok dengan pencarian "${searchTerm}"`
                  : 'Mulai buat CV profesional pertama Anda sekarang'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateCV}
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-3 px-8 rounded-lg hover:from-blue-700 hover:to-yellow-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Buat CV Pertama Anda
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            : "space-y-4"
          }>
            {filteredCVs.map((cv, index) => (
              <CVCard
                key={cv.id}
                cv={{ ...cv, number: index + 1 }}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onPreview={handlePreview}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Hapus CV?
            </h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus CV ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => {
                  setShowConfirmDelete(false);
                  setPendingDeleteId(null);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

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
        cvId={previewCVId}
        onDownload={handleDownload}
      />
    </div>
  );
}