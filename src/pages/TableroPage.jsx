import { useState, useMemo } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { useTareas } from '../hooks/useTareas'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'
import Swal from 'sweetalert2'

export default function TableroPage() {
  const { tareas, loading, error, fetchAll, addTarea, editTarea, removeTarea } = useTareas()

  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filtro, setFiltro] = useState('Todos')

  const filtered = useMemo(() => {
    if (filtro === 'Todos') return tareas
    return tareas.filter((t) => t.estado === filtro)
  }, [tareas, filtro])

  const openCreate = () => { setEditTarget(null); setShowModal(true) }
  const openEdit = (tarea) => { setEditTarget(tarea); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditTarget(null) }

  const handleSubmit = async (formData) => {
    setSaving(true)
    const result = editTarget
      ? await editTarea(editTarget.id, formData)
      : await addTarea(formData)
    setSaving(false)

    if (result.ok) {
      closeModal()
      Swal.fire({
        icon: 'success',
        title: editTarget ? 'Tarea actualizada' : '¡Tarea creada!',
        timer: 1800,
        showConfirmButton: false,
        confirmButtonColor: '#6c63ff',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message,
        confirmButtonColor: '#6c63ff',
      })
    }
  }

  const handleStatusChange = async (id, nuevoEstado) => {
    await editTarea(id, { estado: nuevoEstado })
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-extrabold text-dark text-xl tracking-tight">Tablero de tareas</h1>
          <p className="text-muted text-sm mt-0.5">Organiza y sigue el progreso de tu equipo</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll} className="btn-ghost text-xs">↻ Actualizar</button>
          <button onClick={openCreate} className="btn-primary">+ Nueva tarea</button>
        </div>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="mb-6">
          <StatsBar tareas={tareas} />
        </div>
      )}

      {/* Filters */}
      {!loading && !error && tareas.length > 0 && (
        <div className="mb-5">
          <FilterBar filtro={filtro} onChange={setFiltro} total={filtered.length} />
        </div>
      )}

      {/* Content */}
      {loading && <Spinner label="Cargando tareas..." />}

      {!loading && error && (
        <div className="text-center py-16">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button onClick={fetchAll} className="btn-ghost">Reintentar</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
          <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-muted text-sm mb-1">
            {tareas.length === 0 ? 'No hay tareas todavía.' : 'Ninguna tarea con este filtro.'}
          </p>
          {tareas.length === 0 && (
            <button onClick={openCreate} className="btn-primary mt-4">
              Crear primera tarea
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tarea) => (
            <TaskCard
              key={tarea.id}
              tarea={tarea}
              onEdit={openEdit}
              onDelete={removeTarea}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          title={editTarget ? 'Editar tarea' : 'Nueva tarea'}
          onClose={closeModal}
        >
          <TaskForm
            initial={editTarget}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            loading={saving}
          />
        </Modal>
      )}
    </DashboardLayout>
  )
}
