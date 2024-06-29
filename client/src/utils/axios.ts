import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true
})

api.interceptors.response.use((res) => {
  const setCookieHeaders = res.headers['set-cookie']
  if (setCookieHeaders) {
    setCookieHeaders.forEach((cookie) => {
      document.cookie = cookie
    })
  }
  return res
})

export default api
