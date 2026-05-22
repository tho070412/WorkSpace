import { useState, useEffect } from 'react'

const EMPTY = { titulo: '', descripcion: '', fechaVencimiento: '', estado: 'Pendiente' }

export default function TaskForm({ initial = null, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) {
      setForm({
        titulo: initial.titulo || '',
        descripcion: initial.descripcion || '',
        fechaVencimiento: initial.fechaVencimiento
          ? initial.fechaVencimiento.slice(0, 10)
          : '',
        estado: initial.estado || 'Pendiente',
      })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.titulo.trim()) errs.titulo = 'El título es obligatorio.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Titulo */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5">Título *</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="¿Qué hay que hacer?"
          className="input-field"
          autoFocus
        />
        {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>}
      </div>

      {/* Descripcion */}
      <div>
        <label className="block text-xs font-semibold text-dark mb-1.5">Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          rows={3}
          placeholder="Detalla la tarea (opcional)..."
          className="input-field resize-none"
        />
      </div>

      {/* Fecha + Estado */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5">Fecha de vencimiento</label>
          <input
            type="date"
            name="fechaVencimiento"
            value={form.fechaVencimiento}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-dark mb-1.5">Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange} className="input-field">
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Guardando...' : initial ? 'Actualizar tarea' : 'Crear tarea'}
        </button>
      </div>
    </form>
  )
}
