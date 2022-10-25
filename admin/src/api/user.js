import axios from '@/http'

export const login = params => {
  return axios.post(`login`, params)
}