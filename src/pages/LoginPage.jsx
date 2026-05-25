import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, isAuthenticated } from '../utils/auth'

const DEPARTAMENTOS = ['Desarrollo', 'Diseño', 'Marketing', 'Producto', 'QA', 'DevOps']

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', departamento: 'Desarrollo' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/tablero', { replace: true })
  }, [navigate])

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'Ingresa tu nombre de usuario.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      saveSession({ nombre: form.nombre.trim(), departamento: form.departamento })
      navigate('/tablero', { replace: true })
    }, 500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl shadow-lg mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="font-extrabold text-dark text-2xl tracking-tight">Workspace</h1>
          <p className="text-muted text-sm mt-1">Gestor de tareas del equipo</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-modal">
          <h2 className="font-bold text-dark text-base mb-5">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-dark mb-1.5">
                Nombre de usuario
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                autoFocus
                className="input-field"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark mb-1.5">
                Departamento
              </label>
              <select
                name="departamento"
                value={form.departamento}
                onChange={handleChange}
                className="input-field"
              >
                {DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : 'Ingresar al tablero'}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-xs mt-4">
          
        </p>
      </div>
    </div>
  )
} 
