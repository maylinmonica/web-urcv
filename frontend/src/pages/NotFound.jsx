import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-red-50 p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-6">Halaman tidak ditemukan</p>
      <Link to="/" className="text-blue-600 underline">Kembali ke Beranda</Link>
    </div>
  )
}
