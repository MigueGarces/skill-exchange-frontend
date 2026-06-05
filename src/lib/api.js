import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function getSkills({ category, search, ordering, page } = {}) {
  const params = {}
  if (category)  params.category = category
  if (search)    params.search   = search
  if (ordering)  params.ordering = ordering
  if (page)      params.page     = page
  const { data } = await api.get("/skills/", { params })
  return data
}

export async function getSkillById(id) {
  const { data } = await api.get(`/skills/${id}/`)
  return data
}

export async function getUsers({ page } = {}) {
  const params = {}
  if (page) params.page = page
  const { data } = await api.get("/users/", { params })
  return data
}

export async function getGoals({ page } = {}) {
  const params = {}
  if (page) params.page = page
  const { data } = await api.get("/goals/", { params })
  return data
}

export async function achieveGoal(id) {
  const { data } = await api.post(`/goals/${id}/achieve/`)
  return data
}

export default api