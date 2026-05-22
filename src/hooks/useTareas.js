import { useState, useEffect, useCallback } from 'react'
import { getTareas, createTarea, updateTarea, deleteTarea } from '../services/tareasService'
import Swal from 'sweetalert2'

export function useTareas() {
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTareas()
      setTareas(data)
    } catch {
      setError('No se pudo conectar con la API.')
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudieron cargar las tareas. Verifica tu API.',
        confirmButtonColor: '#6c63ff',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const addTarea = async (payload) => {
    try {
      const nueva = await createTarea(payload)
      setTareas((prev) => [...prev, nueva])
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al crear la tarea.' }
    }
  }

  const editTarea = async (id, payload) => {
    try {
      const actualizada = await updateTarea(id, payload)
      setTareas((prev) => prev.map((t) => (t.id === id ? actualizada : t)))
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al actualizar la tarea.' }
    }
  }

  const removeTarea = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar tarea?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#8b95a6',
    })

    if (!result.isConfirmed) return { ok: false, cancelled: true }

    try {
      await deleteTarea(id)
      setTareas((prev) => prev.filter((t) => t.id !== id))
      Swal.fire({
        icon: 'success',
        title: '¡Eliminada!',
        text: 'La tarea fue eliminada correctamente.',
        confirmButtonColor: '#6c63ff',
        timer: 2000,
        showConfirmButton: false,
      })
      return { ok: true }
    } catch {
      return { ok: false, message: 'Error al eliminar la tarea.' }
    }
  }

  return { tareas, loading, error, fetchAll, addTarea, editTarea, removeTarea }
}
