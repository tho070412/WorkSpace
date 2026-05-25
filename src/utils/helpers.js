export function getBadgeClass(estado) {
  const map = {
    Pendiente: 'badge-pendiente',
    'En Progreso': 'badge-progreso',
    Completada: 'badge-completada',
  }
  return map[estado] || 'badge-pendiente'
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export function isOverdue(dateStr) {
  if (!dateStr) return false
  try {
    return new Date(dateStr) < new Date() 
  } catch {
    return false
  }
}
