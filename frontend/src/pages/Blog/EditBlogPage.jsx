import React, { useEffect, useState } from 'react';
import { X, Upload, Image, Save, AlertCircle, CheckCircle } from 'lucide-react';

const EditBlogModal = ({ blog, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title || '',
        description: blog.description || '',
        content: blog.content || '',
      });
      setPhotoFile(null);
      setPhotoPreview(null);
      setErrorMsg('');
      setSuccessMsg('');
      setIsChanged(false);
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setIsChanged(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

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
          setErrorMsg(uploadErr.response?.data?.error || 'Gagal upload foto');
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

      setSuccessMsg('Artikel berhasil diperbarui');
      setIsChanged(false);
      
      setTimeout(() => {
        onSave();
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Gagal memperbarui artikel', err);
      setErrorMsg(err.response?.data?.error || 'Gagal memperbarui artikel');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (isChanged && !window.confirm('Anda memiliki perubahan yang belum disimpan. Yakin ingin menutup?')) {
      return;
    }
    
    setForm({ title: '', description: '', content: '' });
    setPhotoFile(null);
    setPhotoPreview(null);
    setErrorMsg('');
    setSuccessMsg('');
    setIsChanged(false);
    onClose();
  };

  const removeNewPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setIsChanged(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Save className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Artikel</h2>
              <p className="text-sm text-gray-600">#{blog?.id}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Success/Error Messages */}
          {successMsg && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-600 font-medium">{successMsg}</p>
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-600 font-medium">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Masukkan judul artikel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                    required
                  />
                </div>

                {/* Description Input */}
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Isi Artikel *
                  </label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Masukkan isi artikel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-48 resize-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Right Column - Image Management */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gambar Artikel
                  </label>
                  
                  {/* Current Image or New Photo Preview */}
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="New Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                        <button
                          type="button"
                          onClick={removeNewPhoto}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Gambar Baru
                      </div>
                    </div>
                  ) : blog?.image_url ? (
                    <div className="relative">
                      <img
                        src={blog.image_url}
                        alt="Current"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                      <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Gambar Saat Ini
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Tidak ada gambar</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {blog?.image_url ? 'Ganti Gambar' : 'Upload Gambar'}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                    >
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">
                        {photoFile ? photoFile.name : 'Pilih file gambar'}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Format yang didukung: JPG, PNG, GIF (Max: 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading || !isChanged}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  loading || !isChanged
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Memperbarui...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </>
                )}
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

// Demo component to show the modal
const DemoEditModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [blog] = useState({
    id: 1,
    title: 'Judul Artikel Demo',
    description: 'Deskripsi singkat artikel demo',
    content: 'Ini adalah konten artikel demo yang cukup panjang untuk mendemonstrasikan textarea...',
    image_url: 'https://via.placeholder.com/400x300',
    created_at: new Date().toISOString()
  });

  const handleSave = () => {
    console.log('Artikel berhasil disimpan');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Demo Edit Modal</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h2>
              <p className="text-gray-600">{blog.description}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Artikel
            </button>
          </div>
          
          {blog.image_url && (
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          
          <p className="text-gray-700">{blog.content}</p>
        </div>
      </div>

      <EditBlogModal
        blog={blog}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default DemoEditModal;