import axios from 'axios'

// TODO: Update the baseURL using the environment variable
const baseURL = `http://localhost:3005/api`

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
