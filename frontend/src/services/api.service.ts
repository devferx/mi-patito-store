import axios from 'axios'

const isDev = import.meta.env.MODE === 'development'
const baseURL =
  import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:3005/api' : '')

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
