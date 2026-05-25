import axios from 'axios'

const BASE_URL = 'https://workspace-api-7v93.onrender.com/tareas'

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
