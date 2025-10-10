import React, { useState } from 'react';
import { Sparkles, X, Eye, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Tambahkan ini

const ChooseTemplate = ({ isOpen, onClose, templates, onSelectTemplate, loading }) => {
  const navigate = useNavigate(); 
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      navigate('/cv/create', { state: { templateId: selectedTemplate.id } });
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-black text-white px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
                Pilih Template CV
              </h2>
              <p className="text-sm text-gray-300">Pilih template terbaik untuk karier Anda</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 rounded-full p-2 transition-colors">
            <X className="w-6 h-6 hover:text-yellow-400" />
          </button>
        </div>

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Memuat template...</p>
              </div>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Tidak ada template tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`relative bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-lg ${
                    selectedTemplate?.id === template.id
                      ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  {selectedTemplate?.id === template.id && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1 shadow-lg z-10">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-yellow-50 overflow-hidden relative">
                    <img
                      src={template.preview_image_url || '/assets/placeholder.png'}
                      alt={template.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback jika gambar tidak tersedia */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-yellow-100 hidden items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 font-medium">Template {template.id}</p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-3 left-3 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium shadow">
                      Template #{template.id}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(template);
                      }}
                      className="absolute top-3 left-3 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-all duration-200"
                      title="Preview Template"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {selectedTemplate
              ? `Template "${selectedTemplate.name}" dipilih`
              : 'Silakan pilih template terlebih dahulu'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedTemplate || loading}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTemplate && !loading
                  ? 'bg-gradient-to-r from-blue-700 to-yellow-500 text-white hover:from-blue-800 hover:to-yellow-600 shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memuat...
                </div>
              ) : (
                'Lanjutkan'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Preview: {previewTemplate.name}
              </h3>
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <img
                src={previewTemplate.preview_image_url || '/assets/placeholder.png'}
                alt={`Preview ${previewTemplate.name}`}
                className="w-full h-auto rounded-lg shadow"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback untuk preview */}
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-lg shadow hidden items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{previewTemplate.name}</h4>
                  <p className="text-gray-600">{previewTemplate.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseTemplate;