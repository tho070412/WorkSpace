export default function StatsBar({ tareas }) {
  const total = tareas.length
  const pendiente = tareas.filter((t) => t.estado === 'Pendiente').length
  const progreso = tareas.filter((t) => t.estado === 'En Progreso').length
  const completada = tareas.filter((t) => t.estado === 'Completada').length
  const pct = total ? Math.round((completada / total) * 100) : 0

  const stats = [
    { label: 'Total', value: total, color: 'text-dark', bg: 'bg-bg' },
    { label: 'Pendiente', value: pendiente, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'En Progreso', value: progreso, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completadas', value: completada, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} border border-border rounded-2xl px-4 py-3`}>
            <p className="text-muted text-xs font-medium mb-1">{s.label}</p>
            <p className={`font-bold text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      {total > 0 && (
        <div className="bg-surface border border-border rounded-2xl px-4 py-3">
          <div className="flex justify-between text-xs text-muted mb-2">
            <span>Progreso general</span>
            <span className="font-semibold text-primary">{pct}%</span>
          </div>
          <div className="h-2 bg-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
