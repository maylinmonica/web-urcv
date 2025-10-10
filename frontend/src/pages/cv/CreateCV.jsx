import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Upload, GraduationCap, Briefcase, Brain, Users, Activity, Globe, Heart, Save, ArrowLeft, Layout } from 'lucide-react';
import API from '../../services/api';
import DashboardHeader from '../welcomepage/HeaderDasboard';
import Footer from '../welcomepage/Footer';
import { useNotification } from '../../components/NotificationContext';

export default function CreateCV() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ambil templateId dari state navigasi
  const selectedTemplateId = location.state?.templateId || '';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [templates, setTemplates] = useState([]);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    photo_url: '',
    profile_description: '',
    template_id: selectedTemplateId.toString() // Langsung set dari selectedTemplateId
  });

  const [educations, setEducations] = useState([
    {
      level: '',
      school_name: '',
      city: '',
      major: '',
      degree: '',
      gpa: '',
      start_date: '',
      end_date: '',
      description: ''
    }
  ]);

  const [experiences, setExperiences] = useState([
    {
      job_title: '',
      city: '',
      company: '',
      start_date: '',
      end_date: '',
      description: ''
    }
  ]);

  const [skills, setSkills] = useState([]);
  const [leaderships, setLeaderships] = useState([]);
  const [activities, setActivities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [interests, setInterests] = useState([]);
  const { showNotification } = useNotification();

  // Fetch user data and templates
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch user data
        const userRes = await API.get('/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);
        
        // Pre-fill form with user data
        setForm(prev => ({
          ...prev,
          first_name: userRes.data.first_name || '',
          last_name: userRes.data.last_name || '',
        }));

        // Fetch templates
        const templatesRes = await API.get('/templates', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTemplates(templatesRes.data);
        
        // Jika ada templateId dari navigasi, validasi apakah template tersebut ada
        if (selectedTemplateId) {
          const templateExists = templatesRes.data.some(t => t.id === parseInt(selectedTemplateId));
          if (!templateExists) {
            showNotification('Template yang dipilih tidak valid', 'error');
            setForm(prev => ({ ...prev, template_id: '' }));
          }
        }
        
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [navigate, selectedTemplateId]); // Tambahkan selectedTemplateId ke dependency array

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const token = localStorage.getItem('token');
      const res = await API.post('/upload-photo', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setForm({ ...form, photo_url: res.data.photo_url });
    } catch (err) {
      console.error('Photo upload failed:', err);
      showNotification('Upload foto gagal. Silakan coba lagi.');
    }
  };

  // Handler functions for each section
  const handleEducationChange = (index, e) => {
    const updated = [...educations];
    updated[index][e.target.name] = e.target.value;
    setEducations(updated);
  };

  const handleExperienceChange = (index, e) => {
    const updated = [...experiences];
    updated[index][e.target.name] = e.target.value;
    setExperiences(updated);
  };

  const handleSkillChange = (index, e) => {
    const updated = [...skills];
    updated[index][e.target.name] = e.target.value;
    setSkills(updated);
  };

  const handleLeadershipChange = (index, e) => {
    const updated = [...leaderships];
    updated[index][e.target.name] = e.target.value;
    setLeaderships(updated);
  };

  const handleActivityChange = (index, e) => {
    const updated = [...activities];
    updated[index][e.target.name] = e.target.value;
    setActivities(updated);
  };

  const handleLanguageChange = (index, e) => {
    const updated = [...languages];
    updated[index][e.target.name] = e.target.value;
    setLanguages(updated);
  };

  const handleInterestChange = (index, e) => {
    const updated = [...interests];
    updated[index][e.target.name] = e.target.value;
    setInterests(updated);
  };

  // Add new item functions
  const addEducation = () => {
    setEducations([...educations, {
      level: '',
      school_name: '',
      city: '',
      major: '',
      degree: '',
      gpa: '',
      start_date: '',
      end_date: '',
      description: ''
    }]);
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      job_title: '',
      city: '',
      company: '',
      start_date: '',
      end_date: '',
      description: ''
    }]);
  };

  const addSkill = () => {
    setSkills([...skills, { name: '', level: '', description: '' }]);
  };

  const addLeadership = () => {
    setLeaderships([...leaderships, {
      role: '',
      organization: '',
      city: '',
      start_date: '',
      end_date: '',
      description: ''
    }]);
  };

  const addActivity = () => {
    setActivities([...activities, {
      name: '',
      description: '',
      start_date: '',
      end_date: ''
    }]);
  };

  const addLanguage = () => {
    setLanguages([...languages, { name: '', proficiency: '' }]);
  };

  const addInterest = () => {
    setInterests([...interests, { description: '' }]);
  };

  // Remove item functions
  const removeEducation = (index) => {
    if (educations.length > 1) {
      setEducations(educations.filter((_, i) => i !== index));
    }
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const removeLeadership = (index) => {
    setLeaderships(leaderships.filter((_, i) => i !== index));
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Validate required fields
      if (!form.first_name || !form.last_name || !form.email || !form.phone) {
        showNotification('Mohon lengkapi semua field yang wajib diisi (*)', 'error');
        setSubmitting(false);
        return;
      }

      // Validate template selection
      if (!form.template_id) {
        showNotification('Mohon pilih template CV', 'error');
        setSubmitting(false);
        return;
      }

      // Validate at least one education entry
      const validEducations = educations.filter(edu => edu.school_name && edu.level);
      if (validEducations.length === 0) {
        showNotification('Mohon isi minimal satu riwayat pendidikan', 'error');
        setSubmitting(false);
        return;
      }

      // Clean and validate education data
      const cleanedEducations = educations
        .filter(edu => edu.school_name && edu.level)
        .map(edu => ({
          ...edu,
          gpa: edu.gpa === '' ? null : parseFloat(edu.gpa) || null
        }));

      // Clean other sections - only include non-empty entries
      const cleanedExperiences = experiences.filter(exp => exp.company && exp.job_title);
      const cleanedSkills = skills.filter(skill => skill.name);
      const cleanedLeaderships = leaderships.filter(lead => lead.organization && lead.role);
      const cleanedActivities = activities.filter(act => act.name);
      const cleanedLanguages = languages.filter(lang => lang.name);
      const cleanedInterests = interests.filter(int => int.description);

      // Prepare payload
      const payload = {
        ...form,
        template_id: parseInt(form.template_id),
        educations: cleanedEducations,
        experiences: cleanedExperiences,
        skills: cleanedSkills,
        leaderships: cleanedLeaderships,
        activities: cleanedActivities,
        languages: cleanedLanguages,
        interests: cleanedInterests
      };

      const response = await API.post('/cv', payload, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        showNotification('CV berhasil dibuat!', 'success');
        navigate('/cv');
      }
    } catch (err) {
      console.error('Failed to create CV:', err);
      
      if (err.response?.data?.message) {
        showNotification(`Error: ${err.response.data.message}`, 'error');
      } else if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        showNotification(`Validasi gagal: ${errorMessages.join(', ')}`, 'error');
      } else {
        showNotification('Gagal menyimpan CV. Silakan cek data Anda dan coba lagi.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Get selected template details
  const getSelectedTemplate = () => {
    return templates.find(template => template.id === parseInt(form.template_id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-400 mx-auto mb-4" />
            <p className="text-gray-600">Memuat halaman...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
      <DashboardHeader user={user} />

      {/* Page Title Section */}
      <div className="bg-gradient-to-r from-blue-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                Buat CV Baru
              </h1>
              <p className="text-gray-300 mt-2">
                Lengkapi informasi untuk membuat CV profesional Anda
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-medium transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-black/10 p-8 space-y-8">
          
          {/* Personal Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Informasi Pribadi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="first_name" 
                placeholder="Nama Depan *" 
                value={form.first_name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="last_name" 
                placeholder="Nama Belakang *" 
                value={form.last_name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="email" 
                placeholder="Email *" 
                type="email"
                value={form.email} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="phone" 
                placeholder="No HP *" 
                value={form.phone} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="city" 
                placeholder="Kota Domisili" 
                value={form.city} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
            </div>
            <textarea 
              name="profile_description" 
              placeholder="Deskripsi Profil Singkat" 
              rows={3} 
              value={form.profile_description} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors mt-4" 
            />

            {/* Photo Upload */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                <Upload className="w-5 h-5 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Upload Foto</label>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUpload} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {form.photo_url && (
                <img src={form.photo_url} alt="Preview" className="w-24 h-24 object-cover rounded-lg mt-3 border-2 border-gray-200" />
              )}
            </div>

            {/* Template Selection */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                <Layout className="w-5 h-5 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Pilih Template CV *</label>
              </div>
              <select 
                name="template_id" 
                value={form.template_id} 
                onChange={handleChange} 
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">-- Pilih Template --</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              
              {/* Template Preview */}
              {form.template_id && getSelectedTemplate() && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    Template terpilih: <strong>{getSelectedTemplate().name}</strong>
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={getSelectedTemplate().preview_url || `/assets/template${form.template_id}.png`}
                      alt={`Template ${getSelectedTemplate().name}`}
                      className="w-32 rounded-lg shadow-md border"
                      onError={(e) => {
                        e.target.src = `/assets/template${form.template_id}.png`;
                      }}
                    />
                    <div className="text-sm text-gray-600">
                      <p>{getSelectedTemplate().description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Education Section */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Riwayat Pendidikan</h2>
            </div>
            {educations.map((edu, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Pendidikan #{index + 1}</span>
                  {educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                <select 
                  name="level" 
                  value={edu.level} 
                  onChange={(e) => handleEducationChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">-- Jenjang Pendidikan --</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
                <input 
                  name="school_name" 
                  placeholder="Nama Sekolah/Universitas *" 
                  value={edu.school_name} 
                  onChange={(e) => handleEducationChange(index, e)} 
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="city" 
                    placeholder="Kota" 
                    value={edu.city} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="major" 
                    placeholder="Jurusan" 
                    value={edu.major} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="degree" 
                    placeholder="Gelar (contoh: S.Kom)" 
                    value={edu.degree} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="gpa" 
                    placeholder="IPK (opsional)" 
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={edu.gpa} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="start_date" 
                    type="date" 
                    value={edu.start_date} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="end_date" 
                    type="date" 
                    value={edu.end_date} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
                <textarea 
                  name="description" 
                  placeholder="Keterangan Tambahan" 
                  value={edu.description} 
                  onChange={(e) => handleEducationChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addEducation} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              + Tambah Pendidikan
            </button>
          </section>

          {/* Experience Section */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Pengalaman Kerja</h2>
            </div>
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Pengalaman #{index + 1}</span>
                  {experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                <input 
                  name="job_title" 
                  placeholder="Posisi/Jabatan" 
                  value={exp.job_title} 
                  onChange={(e) => handleExperienceChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="company" 
                    placeholder="Nama Perusahaan" 
                    value={exp.company} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="city" 
                    placeholder="Kota" 
                    value={exp.city} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="start_date" 
                    type="date" 
                    value={exp.start_date} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="end_date" 
                    type="date" 
                    value={exp.end_date} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
                <textarea 
                  name="description" 
                  placeholder="Deskripsi Pekerjaan" 
                  value={exp.description} 
                  onChange={(e) => handleExperienceChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addExperience} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              + Tambah Pengalaman
            </button>
          </section>

          {/* Skills Section */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Keahlian</h2>
            </div>
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Skill #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Hapus
                  </button>
                </div>
                <input 
                  name="name" 
                  placeholder="Nama Skill" 
                  value={skill.name} 
                  onChange={(e) => handleSkillChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <input 
                  name="level" 
                  placeholder="Tingkat Kemampuan (contoh: Menengah, Mahir)" 
                  value={skill.level} 
                  onChange={(e) => handleSkillChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <textarea 
                  name="description" 
                  placeholder="Deskripsi" 
                  value={skill.description} 
                  onChange={(e) => handleSkillChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addSkill} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              + Tambah Skill
            </button>
          </section>

          {/* Leadership Section */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Kepemimpinan</h2>
            </div>
            {leaderships.map((lead, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="role" 
                  placeholder="Peran/Jabatan *" 
                  value={lead.role} 
                  onChange={(e) => handleLeadershipChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="organization" 
                    placeholder="Organisasi *" 
                    value={lead.organization} 
                    onChange={(e) => handleLeadershipChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="city" 
                    placeholder="Kota" 
                    value={lead.city} 
                    onChange={(e) => handleLeadershipChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="start_date" 
                    type="date" 
                    value={lead.start_date} 
                    onChange={(e) => handleLeadershipChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="end_date" 
                    type="date" 
                    value={lead.end_date} 
                    onChange={(e) => handleLeadershipChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
                <textarea 
                  name="description" 
                  placeholder="Deskripsi" 
                  value={lead.description} 
                  onChange={(e) => handleLeadershipChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addLeadership} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              + Tambah Kepemimpinan
            </button>
          </section>

          {/* Activities Section */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Aktivitas</h2>
            </div>
            {activities.map((act, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="name" 
                  placeholder="Nama Aktivitas *" 
                  value={act.name} 
                  onChange={(e) => handleActivityChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <textarea 
                  name="description" 
                  placeholder="Deskripsi" 
                  value={act.description} 
                  onChange={(e) => handleActivityChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="start_date" 
                    type="date" 
                    value={act.start_date} 
                    onChange={(e) => handleActivityChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="end_date" 
                    type="date" 
                    value={act.end_date} 
                    onChange={(e) => handleActivityChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addActivity} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              + Tambah Aktivitas
            </button>
          </section>

          {/* Languages Section */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Bahasa</h2>
            </div>
            {languages.map((lang, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="name" 
                  placeholder="Nama Bahasa *" 
                  value={lang.name} 
                  onChange={(e) => handleLanguageChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <input 
                  name="proficiency" 
                  placeholder="Tingkat Kemampuan (contoh: Lancar, Dasar)" 
                  value={lang.proficiency} 
                  onChange={(e) => handleLanguageChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addLanguage} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              + Tambah Bahasa
            </button>
          </section>

          {/* Interests Section */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Minat</h2>
            </div>
            {interests.map((interest, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <textarea 
                  name="description" 
                  placeholder="Deskripsi Minat" 
                  value={interest.description} 
                  onChange={(e) => handleInterestChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addInterest} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              + Tambah Minat
            </button>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button 
              type="submit" 
              disabled={submitting}
              className={`bg-gradient-to-r from-blue-800 to-yellow-500 text-white py-4 px-8 rounded-lg hover:from-blue-900 hover:to-yellow-600 transition-all duration-200 font-semibold shadow-lg flex items-center gap-3 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Simpan CV
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
}