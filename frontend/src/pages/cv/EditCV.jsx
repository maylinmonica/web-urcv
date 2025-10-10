import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Upload, GraduationCap, Briefcase, Brain, Users, Activity, Globe, Heart, Save, ArrowLeft, Layout } from 'lucide-react';
import API from '../../services/api';
import DashboardHeader from '../welcomepage/HeaderDasboard';
import { useNotification } from '../../components/NotificationContext'; 

export default function EditCV() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    city: '', photo_url: '', profile_description: '', template_id: ''
  });

  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [leaderships, setLeaderships] = useState([]);
  const [activities, setActivities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [interests, setInterests] = useState([]);
  const { showNotification } = useNotification();

  // Fetch user data for header
useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const userRes = await API.get('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userRes.data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setNotifType('error');
        setNotifMsg('Gagal memuat data pengguna. Silakan coba beberapa saat lagi.');
      }
    }
  };

  fetchUser();
}, [navigate]);


  // Fetch CV data
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/cv', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const cv = res.data.find((item) => item.id === parseInt(id));
        if (cv) {
          setForm({
            first_name: cv.first_name,
            last_name: cv.last_name,
            email: cv.email,
            phone: cv.phone,
            city: cv.city || '',
            profile_description: cv.profile_description || '',
            photo_url: cv.photo_url || '',
            template_id: cv.template_id?.toString() || ''
          });
          setEducations(cv.educations || []);
          setExperiences(cv.experiences || []);
          setSkills(cv.skills || []);
          setLeaderships(cv.leaderships || []);
          setActivities(cv.activities || []);
          setLanguages(cv.languages || []);
          setInterests(cv.interests || []);
        }
      } catch (err) {
        alert('Failed to fetch CV data');
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const res = await API.post('/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, photo_url: res.data.photo_url });
    } catch {
      alert('Photo upload failed.');
    }
  };

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

  const addEducation = () => {
    setEducations([...educations, {
      level: '', school_name: '', city: '',
      major: '', degree: '', gpa: '',
      start_date: '', end_date: '', description: ''
    }]);
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      job_title: '', city: '', company: '',
      start_date: '', end_date: '', description: ''
    }]);
  };

  const addSkill = () => {
    setSkills([...skills, { name: '', level: '', description: '' }]);
  };

  const addLeadership = () => {
    setLeaderships([...leaderships, { role: '', organization: '', city: '', start_date: '', end_date: '', description: '' }]);
  };

  const addActivity = () => {
    setActivities([...activities, { name: '', description: '', start_date: '', end_date: '' }]);
  };

  const addLanguage = () => {
    setLanguages([...languages, { name: '', proficiency: '' }]);
  };

  const addInterest = () => {
    setInterests([...interests, { description: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const cleanedEducations = educations.map((edu) => ({
        ...edu,
        gpa: edu.gpa === '' ? null : parseFloat(edu.gpa),
      }));

      await API.put(`/cv/${id}`, {
        ...form,
        template_id: parseInt(form.template_id),
        educations: cleanedEducations,
        experiences,
        skills,
        leaderships,
        activities,
        languages,
        interests
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      showNotification('CV berhasil diperbarui!', 'success'); // Tambah notifikasi
      navigate('/cv'); 
    } catch {
      showNotification('Gagal menyimpan CV. Silakan coba lagi.', 'error'); // Gunakan context
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading CV data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50">
      <DashboardHeader user={user} />
     

      
      {/* Header Section - Matches CreateCV styling */}
      <div className="bg-gradient-to-r from-blue-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">
                Edit CV
              </h1>
              <p className="text-gray-300 mt-2">
                Update and manage your professional CV information
              </p>
            </div>
            <button
              onClick={() => navigate('/cv')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-medium transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to CV List
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
              <h2 className="text-xl font-semibold text-blue-900">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="first_name" 
                placeholder="First Name *" 
                value={form.first_name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="last_name" 
                placeholder="Last Name *" 
                value={form.last_name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="email" 
                placeholder="Email *" 
                value={form.email} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="phone" 
                placeholder="Phone *" 
                value={form.phone} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
              <input 
                name="city" 
                placeholder="City" 
                value={form.city} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
              />
            </div>
            <textarea 
              name="profile_description" 
              placeholder="Short Profile Description" 
              rows={3} 
              value={form.profile_description} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors mt-4" 
            />

            {/* Photo Upload */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                <Upload className="w-5 h-5 text-gray-600" />
                <label className="text-sm font-medium text-gray-700">Upload Photo</label>
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

            {/* Selected Template */}
            {form.template_id && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  Selected template: <strong>#{form.template_id}</strong>
                </p>
                <img
                  src={`/assets/template${form.template_id}.png`}
                  alt={`Template ${form.template_id}`}
                  className="w-32 rounded-lg shadow-md border"
                />
              </div>
            )}
          </section>

          {/* Education */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Education</h2>
            </div>
            {educations.map((edu, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <select 
                  name="level" 
                  value={edu.level} 
                  onChange={(e) => handleEducationChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">-- Education Level --</option>
                  <option value="SD">Elementary</option>
                  <option value="SMP">Junior High</option>
                  <option value="SMA">Senior High</option>
                  <option value="D3">Diploma</option>
                  <option value="S1">Bachelor</option>
                  <option value="S2">Master</option>
                  <option value="S3">Doctorate</option>
                </select>
                <input 
                  name="school_name" 
                  placeholder="School/University Name" 
                  value={edu.school_name} 
                  onChange={(e) => handleEducationChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="city" 
                    placeholder="City" 
                    value={edu.city} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="major" 
                    placeholder="Major" 
                    value={edu.major} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="degree" 
                    placeholder="Degree (e.g., B.Sc)" 
                    value={edu.degree} 
                    onChange={(e) => handleEducationChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="gpa" 
                    placeholder="GPA (optional)" 
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
                  placeholder="Additional Information" 
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
              + Add Education
            </button>
          </section>

          {/* Experience */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Work Experience</h2>
            </div>
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="job_title" 
                  placeholder="Position" 
                  value={exp.job_title} 
                  onChange={(e) => handleExperienceChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="company" 
                    placeholder="Company" 
                    value={exp.company} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="city" 
                    placeholder="City" 
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
                  placeholder="Job Description" 
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
              + Add Experience
            </button>
          </section>

          {/* Skills */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Skills</h2>
            </div>
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="name" 
                  placeholder="Skill Name" 
                  value={skill.name} 
                  onChange={(e) => handleSkillChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <input 
                  name="level" 
                  placeholder="Proficiency Level (e.g., Intermediate, Expert)" 
                  value={skill.level} 
                  onChange={(e) => handleSkillChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <textarea 
                  name="description" 
                  placeholder="Description" 
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
              + Add Skill
            </button>
          </section>

          {/* Leadership */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Leadership</h2>
            </div>
            {leaderships.map((lead, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="role" 
                  placeholder="Role/Position" 
                  value={lead.role} 
                  onChange={(e) => handleLeadershipChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    name="organization" 
                    placeholder="Organization" 
                    value={lead.organization} 
                    onChange={(e) => handleLeadershipChange(index, e)} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                  />
                  <input 
                    name="city" 
                    placeholder="City" 
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
                  placeholder="Description" 
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
              + Add Leadership
            </button>
          </section>

          {/* Activities */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Activities</h2>
            </div>
            {activities.map((act, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="name" 
                  placeholder="Activity Name" 
                  value={act.name} 
                  onChange={(e) => handleActivityChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <textarea 
                  name="description" 
                  placeholder="Description" 
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
              + Add Activity
            </button>
          </section>

          {/* Languages */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Languages</h2>
            </div>
            {languages.map((lang, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <input 
                  name="name" 
                  placeholder="Language Name" 
                  value={lang.name} 
                  onChange={(e) => handleLanguageChange(index, e)} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors" 
                />
                <input 
                  name="proficiency" 
                  placeholder="Proficiency Level (e.g., Fluent, Basic)" 
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
              + Add Language
            </button>
          </section>

          {/* Interests */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-900">Interests</h2>
            </div>
            {interests.map((interest, index) => (
              <div key={index} className="bg-white p-4 border-2 border-gray-200 rounded-lg space-y-3 mb-4">
                <textarea 
                  name="description" 
                  placeholder="Interest Description" 
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
              + Add Interest
            </button>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-800 to-yellow-500 text-white py-4 px-8 rounded-lg hover:from-blue-900 hover:to-yellow-600 transition-all duration-200 font-semibold shadow-lg flex items-center gap-3"
            >
              <Save className="w-5 h-5" />
              Save CV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}