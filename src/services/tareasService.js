import axios from 'axios'

// ⚠️ Reemplaza con tu URL de MockAPI
const BASE_URL = 'http://localhost:3002/tareas'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getTareas() {
  const { data } = await api.get('/')
  return data
}

export async function createTarea(payload) {
  const { data } = await api.post('/', payload)
  return data
}

export async function updateTarea(id, payload) {
  const { data } = await api.put(`/${id}`, payload)
  return data
}

export async function deleteTarea(id) {
  const { data } = await api.delete(`/${id}`)
  return data
}
