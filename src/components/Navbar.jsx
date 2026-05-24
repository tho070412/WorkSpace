import { useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'
import Swal from 'sweetalert2'

export default function Navbar() {
  const navigate = useNavigate()
  const session = getSession()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6c63ff',
      cancelButtonColor: '#8b95a6',
    })
    if (result.isConfirmed) {
      clearSession()
      navigate('/login')
    }
  }

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="font-bold text-dark text-lg tracking-tight">Workspace</span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-dark font-semibold text-sm leading-tight">{session?.nombre}</span>
            <span className="text-muted text-xs">{session?.departamento}</span>
          </div>
          <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">
              {session?.nombre?.[0]?.toUpperCase()}
            </span>
          </div>
          <button onClick={handleLogout} className="btn-ghost text-xs py-1.5 px-3">
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}
