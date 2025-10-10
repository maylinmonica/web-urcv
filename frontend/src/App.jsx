import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Halaman Auth & Welcome
import Welcome from './pages/welcomepage/Welcome'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Halaman CV (Protected)
import Dashboard from './pages/Dashboard'
import CVList from './pages/cv/CVList'
import CreateCV from './pages/cv/CreateCV'
import EditCV from './pages/cv/EditCV'
import ChooseTemplate from './pages/cv/ChooseTemplate'
import PreviewCV from './pages/cv/PreviewCV' 

// Halaman Blog & Tips
import BlogList from './pages/Blog/BlogList'
import BlogDetail from './pages/Blog/BlogDetail'
import EditBlogPage from './pages/Blog/EditBlogPage'
import CaraMenulisCV from './pages/Blog/CaraMenulisCV'
import TipsInterview from './pages/Blog/TipsInterview'
import CVFreshGraduate from './pages/Blog/CVFreshGraduate'
import AdminBlogPage from './pages/Blog/AdminBlogPage'

// Halaman Informasi & Bantuan
import Help from './pages/Help'
import FAQ from './pages/FAQ'
import Support from './pages/Support'
import About from './pages/About'
import Social from './pages/Social'

// Halaman fallback
import NotFound from './pages/NotFound'

// Komponen Layout opsional (Header/Footer bisa ditambahkan nanti)

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* Blog / Tips */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/cara-menulis-cv" element={<CaraMenulisCV />} />
        <Route path="/blog/tips-interview" element={<TipsInterview />} />
        <Route path="/blog/cv-fresh-graduate" element={<CVFreshGraduate />} />

         {/* Admin Blog Panel (Protected) */}
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <AdminBlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlogPage />
            </ProtectedRoute>
          }
        />

        {/* Bantuan & Info */}
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/social" element={<Social />} />

        {/* --- Protected Routes --- */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cv" element={<ProtectedRoute><CVList /></ProtectedRoute>} />
        <Route path="/cv/create" element={<ProtectedRoute><CreateCV /></ProtectedRoute>} />
        <Route path="/cv/edit/:id" element={<ProtectedRoute><EditCV /></ProtectedRoute>} />
        <Route path="/cv/choose-template" element={<ProtectedRoute><ChooseTemplate /></ProtectedRoute>} />
        <Route path="/cv/preview/:id" element={<ProtectedRoute><PreviewCV /></ProtectedRoute>} /> {/* 🆕 Halaman Preview */}

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
