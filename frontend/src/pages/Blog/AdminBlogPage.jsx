import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Grid, List, Eye, Edit, Trash2, Plus, Calendar, User, FileText, Image, X, AlertTriangle } from 'lucide-react';
import DashboardHeader from '../welcomepage/HeaderDasboard';
import { useNotification } from '../../components/NotificationContext';

const BlogCard = ({ blog, onDelete, onEdit, viewMode }) => {
  const navigate = useNavigate();
  
  const handleView = () => {
    navigate(`/blog/${blog.id}`);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {blog.image_url ? (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-yellow-100 flex items-center justify-center text-gray-500 rounded-lg border-2 border-gray-200 shadow-sm">
                <Image className="w-8 h-8" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {blog.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.created_at).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Admin</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleView}
              className="bg-green-700 text-white w-10 h-10 rounded-full hover:bg-green-800 transition-all duration-200 shadow-lg flex items-center justify-center"
              title="Lihat Artikel"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(blog)}
              className="bg-yellow-600 text-white w-10 h-10 rounded-full hover:bg-yellow-700 transition-all duration-200 shadow-lg flex items-center justify-center"
              title="Edit Artikel"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="bg-red-600 text-white w-10 h-10 rounded-full hover:bg-red-700 transition-all duration-200 shadow-lg flex items-center justify-center"
              title="Hapus Artikel"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-blue-50 via-white to-yellow-50 overflow-hidden">
        {blog.image_url ? (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Image className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 min-h-[3.5rem]">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 min-h-[4rem]">
          {blog.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(blog.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>Admin</span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleView}
            className="bg-green-700 hover:bg-green-800 text-white w-11 h-11 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group-hover:scale-105"
            title="Lihat Artikel"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(blog)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white w-11 h-11 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group-hover:scale-105"
            title="Edit Artikel"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="bg-red-600 hover:bg-red-700 text-white w-11 h-11 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group-hover:scale-105"
            title="Hapus Artikel"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const EditBlogModal = ({ blog, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title || '',
        description: blog.description || '',
        content: blog.content || '',
      });
      setPhotoFile(null);
    }
  }, [blog]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = blog.image_url;

      if (photoFile) {
        const formData = new FormData();
        formData.append('photo', photoFile);

        try {
          const uploadRes = await axios.post('/api/upload-photo', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          imageUrl = uploadRes.data.photo_url;
        } catch (uploadErr) {
          const errorMsg = uploadErr.response?.data?.error || 'Gagal upload foto';
          showNotification(errorMsg, 'error');
          setLoading(false);
          return;
        }
      }

      const payload = {
        ...form,
        image_url: imageUrl,
      };

      await axios.put(`/api/blogs/${blog.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showNotification('Artikel berhasil diperbarui', 'success');
      setTimeout(() => {
        onSave();
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Gagal memperbarui artikel', err);
      showNotification('Gagal memperbarui artikel', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({ title: '', description: '', content: '' });
    setPhotoFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Artikel</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Artikel
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Masukkan judul artikel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Singkat
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi singkat"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Isi Artikel
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Masukkan isi artikel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-40 resize-none"
                required
              />
            </div>

            {blog.image_url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Saat Ini
                </label>
                <img
                  src={blog.image_url}
                  alt="Current"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ganti Foto (Opsional)
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {photoFile && (
                <p className="text-sm text-gray-500 mt-2">
                  Foto baru dipilih: {photoFile.name}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-all duration-200 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? 'Memperbarui...' : 'Simpan Perubahan'}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-6 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
            Konfirmasi Hapus
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-6 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium disabled:cursor-not-allowed"
            >
              Batal
            </button>
            
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminBlogPage = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    content: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { showNotification } = useNotification();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');
      const blogList = Array.isArray(res.data) ? res.data : [];
      setBlogs(blogList);
    } catch (err) {
      console.error('Gagal mengambil data blog', err);
      const errorMsg = 'Gagal memuat data blog. Silakan coba lagi nanti.';
      setErrorMsg(errorMsg);
      showNotification(errorMsg, 'error');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      let imageUrl = '';

      if (photoFile) {
        const formData = new FormData();
        formData.append('photo', photoFile);

        try {
          const uploadRes = await axios.post('/api/upload-photo', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          imageUrl = uploadRes.data.photo_url;
        } catch (uploadErr) {
          const errorMsg = uploadErr.response?.data?.error || 'Gagal upload foto';
          setErrorMsg(errorMsg);
          showNotification(errorMsg, 'error');
          setLoading(false);
          return;
        }
      }

      const blogPayload = {
        ...newBlog,
        ...(imageUrl && { image_url: imageUrl }),
      };

      await axios.post('/api/blogs', blogPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const successText = 'Artikel berhasil ditambahkan';
      setSuccessMsg(successText);
      showNotification(successText, 'success');

      setNewBlog({ title: '', description: '', content: '' });
      setPhotoFile(null);
      setShowForm(false);
      fetchBlogs();

      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (err) {
      const errorText = err.response?.data?.error || 'Terjadi kesalahan saat menyimpan data';
      console.error('Gagal menyimpan blog:', err);
      setErrorMsg(errorText);
      showNotification(errorText, 'error');

      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    fetchBlogs();
    setSuccessMsg('Artikel berhasil diperbarui');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteClick = (id) => {
    setPendingDeleteId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/blogs/${pendingDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((blog) => blog.id !== pendingDeleteId));
      showNotification('Artikel berhasil dihapus', 'success');
      setSuccessMsg('Artikel berhasil dihapus');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Gagal menghapus blog', err);
      const errorMsg = 'Gagal menghapus artikel';
      setErrorMsg(errorMsg);
      showNotification(errorMsg, 'error');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setDeleteLoading(false);
      setShowConfirmDelete(false);
      setPendingDeleteId(null);
    }
  };

  const handleCreateBlog = () => {
    setShowForm(true);
    setNewBlog({ title: '', description: '', content: '' });
    setPhotoFile(null);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNewBlog({ title: '', description: '', content: '' });
    setPhotoFile(null);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader user={user} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data blog...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
       {/* Header */}
    <DashboardHeader user={user} />
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
                Admin Blog Manager
              </h1>
              <p className="text-gray-300 mt-2 text-sm md:text-base">
                Kelola artikel blog dengan mudah ({filteredBlogs.length} artikel)
              </p>
            </div>
            <button
              onClick={handleCreateBlog}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-medium transition-all duration-200 hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Buat Artikel Baru
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {showConfirmDelete && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Hapus Artikel?
      </h3>
      <p className="text-gray-600 mb-6">Apakah kamu yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.</p>
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

        {/* Create Form Section */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Buat Artikel Baru
              </h2>
              <button
                onClick={handleCancelForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Judul Artikel"
                value={newBlog.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />

              <input
                type="text"
                name="description"
                placeholder="Deskripsi Singkat"
                value={newBlog.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />

              <textarea
                name="content"
                placeholder="Isi Artikel"
                value={newBlog.content}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-40 resize-none"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Artikel (Opsional)
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                {photoFile && (
                  <p className="text-sm text-gray-500 mt-2">Foto dipilih: {photoFile.name}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? 'Memproses...' : 'Tambah Artikel'}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-6 py-3 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and View Toggle */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

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

        {/* Blog List */}
        {fetchLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Memuat data artikel...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchTerm ? 'Tidak ada artikel yang ditemukan' : 'Belum ada artikel yang dibuat'}
              </h3>
              <p className="text-gray-600 mb-8">
                {searchTerm 
                  ? `Tidak ada artikel yang cocok dengan pencarian "${searchTerm}"`
                  : 'Mulai buat artikel blog pertama Anda sekarang'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateBlog}
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-3 px-8 rounded-lg hover:from-blue-700 hover:to-yellow-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Buat Artikel Pertama
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            : "space-y-4"
          }>
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onDelete={handleDeleteClick}
                onEdit={handleEdit}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditBlogModal
        blog={editingBlog}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default AdminBlogPage;