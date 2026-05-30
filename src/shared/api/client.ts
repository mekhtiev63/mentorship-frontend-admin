import axios from 'axios'

/** Prepared for backend integration — not used while useMockApi is true. */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})
