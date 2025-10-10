import { useEffect, useState } from 'react';
import { X, Download, Edit, User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Star, Award, Users, Heart, Globe, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

export default function PreviewModal({ isOpen, onClose, cvId, onDownload }) {
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && cvId) {
      fetchCV();
    }
  }, [isOpen, cvId]);

  const fetchCV = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/cv`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data.find((item) => item.id === parseInt(cvId));
      if (!data) {
        setError('CV tidak ditemukan.');
      } else {
        setCV(data);
      }
    } catch (err) {
      console.error('Gagal memuat CV:', err);
      setError('Gagal memuat data CV.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    onDownload(cvId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-900 to-black text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Preview CV</h2>
              <p className="text-gray-300 text-sm">Lihat tampilan CV Anda</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cv && (
              <>
                <button
                  onClick={handleDownload}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                  title="Download CV"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <Link
                  to={`/cv/edit/${cvId}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                  title="Edit CV"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
              </>
            )}
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors duration-200 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Modal */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat preview CV...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-red-600 text-lg font-medium">{error}</p>
              </div>
            </div>
          ) : cv ? (
            <div className="p-8">
              {/* Header Profile */}
              <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <div className="relative inline-block mb-4">
                  {cv.photo_url ? (
                    <img
                      src={cv.photo_url}
                      alt="Foto Profil"
                      className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-100 to-yellow-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {cv.first_name} {cv.last_name}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{cv.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{cv.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{cv.city || 'Tidak diketahui'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(cv.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              {cv.about && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Tentang Saya</h2>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">{cv.about}</p>
                  </div>
                </section>
              )}

              {/* Experience Section */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Pengalaman Kerja</h2>
                </div>
                {cv.experiences?.length > 0 ? (
                  <div className="space-y-6">
                    {cv.experiences.map((exp, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{exp.job_title}</h3>
                            <p className="text-blue-600 font-medium">{exp.company_name}</p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            {exp.start_date} - {exp.end_date}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Belum ada pengalaman kerja</p>
                  </div>
                )}
              </section>

              {/* Education Section */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Pendidikan</h2>
                </div>
                {cv.educations?.length > 0 ? (
                  <div className="space-y-6">
                    {cv.educations.map((edu, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                            <p className="text-purple-600 font-medium">{edu.school_name}</p>
                          </div>
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                            {edu.start_date} - {edu.end_date}
                          </span>
                        </div>
                        {edu.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Belum ada data pendidikan</p>
                  </div>
                )}
              </section>

              {/* Skills Section */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Keahlian</h2>
                </div>
                {cv.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {cv.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Belum ada keahlian</p>
                  </div>
                )}
              </section>

              {/* Languages Section */}
              {cv.languages?.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Bahasa</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cv.languages.map((lang, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                        <p className="font-medium text-gray-800">{lang.name}</p>
                        <p className="text-sm text-gray-600">{lang.level}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Awards Section */}
              {cv.awards?.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Penghargaan</h2>
                  </div>
                  <div className="space-y-4">
                    {cv.awards.map((award, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800">{award.title}</h3>
                        <p className="text-orange-600 font-medium">{award.organization}</p>
                        <p className="text-sm text-gray-600">{award.date}</p>
                        {award.description && (
                          <p className="text-gray-600 text-sm mt-2">{award.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Leadership Section */}
              {cv.leadership?.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Kepemimpinan</h2>
                  </div>
                  <div className="space-y-4">
                    {cv.leadership.map((leader, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{leader.position}</h3>
                            <p className="text-indigo-600 font-medium">{leader.organization}</p>
                          </div>
                          <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                            {leader.start_date} - {leader.end_date}
                          </span>
                        </div>
                        {leader.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">{leader.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Interests Section */}
              {cv.interests?.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-pink-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Minat & Hobi</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cv.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                      >
                        {interest.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}