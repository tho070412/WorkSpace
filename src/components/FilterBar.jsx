const FILTROS = ['Todos', 'Pendiente', 'En Progreso', 'Completada']

export default function FilterBar({ filtro, onChange, total }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2 flex-wrap">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={filtro === f ? 'filter-btn-active' : 'filter-btn-inactive'}
          >
            {f}
          </button>
        ))}
      </div>
      <span className="text-muted text-sm">
        {total} tarea{total !== 1 ? 's' : ''}
      </span>
    </div>
  )
}