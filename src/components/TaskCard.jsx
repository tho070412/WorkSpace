import { getBadgeClass, formatDate, isOverdue } from '../utils/helpers'

export default function TaskCard({ tarea, onEdit, onDelete, onStatusChange }) {
  const { id, titulo, descripcion, fechaVencimiento, estado } = tarea
  const overdue = estado !== 'Completada' && isOverdue(fechaVencimiento)

  const nextStatus = {
    Pendiente: 'En Progreso',
    'En Progreso': 'Completada',
    Completada: null,
  }

  return (
    <div className={`card group ${estado === 'Completada' ? 'opacity-75' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className={`font-semibold text-sm leading-snug flex-1 ${estado === 'Completada' ? 'line-through text-muted' : 'text-dark'}`}>
          {titulo}
        </h3>
        <span className={getBadgeClass(estado)}>{estado}</span>
      </div>

      {/* Description */}
      {descripcion && (
        <p className="text-muted text-xs leading-relaxed line-clamp-2 mb-3">
          {descripcion}
        </p>
      )}

      {/* Date */}
      <div className={`flex items-center gap-1.5 mb-4 text-xs ${overdue ? 'text-red-500' : 'text-muted'}`}>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{overdue ? '⚠ Vencida — ' : ''}{formatDate(fechaVencimiento)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        {nextStatus[estado] ? (
          <button
            onClick={() => onStatusChange(id, nextStatus[estado])}
            className="text-xs text-primary font-semibold hover:underline"
          >
            → {nextStatus[estado]}
          </button>
        ) : (
          <span className="text-xs text-emerald-500 font-semibold">✓ Completada</span>
        )}
        <div className="flex gap-2">
          <button onClick={() => onEdit(tarea)} className="btn-ghost text-xs py-1 px-3">
            Editar
          </button>
          <button onClick={() => onDelete(id)} className="btn-danger text-xs py-1 px-3">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}