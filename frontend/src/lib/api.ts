// API configuration for backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

interface RequestOptions extends RequestInit {
  token?: string
}

async function fetchAPI(endpoint: string, options: RequestOptions = {}) {
  const { token, ...fetchOptions } = options

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(error.message || "Request failed")
  }

  return response.json()
}

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    fetchAPI("/auth/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    fetchAPI("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  logout: (token: string) => fetchAPI("/auth/logout", { method: "POST", token }),

  refreshToken: () => fetchAPI("/auth/refreshToken", { method: "POST" }),
}

// Blog API
export const blogAPI = {
  getAll: (token: string) => fetchAPI("/blogs", { token }),

  getBySlug: (slug: string, token: string) => fetchAPI(`/blogs/${slug}`, { token }),

  getByUserId: (userId: string, token: string) => fetchAPI(`/blogs/user/${userId}`, { token }),

  create: (data: FormData, token: string) =>
    fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
      credentials: "include",
    }).then((r) => r.json()),

  update: (blogId: string, data: FormData, token: string) =>
    fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
      credentials: "include",
    }).then((r) => r.json()),

  delete: (blogId: string, token: string) => fetchAPI(`/blogs/${blogId}`, { method: "DELETE", token }),
}

// Comments API
export const commentsAPI = {
  getByBlog: (blogId: string, token: string) => fetchAPI(`/comments/blog/${blogId}`, { token }),

  create: (blogId: string, data: { content: string }, token: string) =>
    fetchAPI(`/comments/blog/${blogId}`, { method: "POST", body: JSON.stringify(data), token }),

  delete: (commentId: string, token: string) => fetchAPI(`/comments/${commentId}`, { method: "DELETE", token }),
}

// Likes API
export const likesAPI = {
  like: (blogId: string, token: string) => fetchAPI(`/likes/blog/${blogId}`, { method: "POST", token }),

  unlike: (blogId: string, token: string) => fetchAPI(`/likes/blog/${blogId}`, { method: "DELETE", token }),
}

// Users API
export const usersAPI = {
  getAll: (token: string) => fetchAPI("/users", { token }),

  getCurrent: (token: string) => fetchAPI("/users/current", { token }),

  updateCurrent: (data: { name?: string; email?: string }, token: string) =>
    fetchAPI("/users/current", { method: "PATCH", body: JSON.stringify(data), token }),

  deleteCurrent: (token: string) => fetchAPI("/users/current", { method: "DELETE", token }),

  getById: (userId: string, token: string) => fetchAPI(`/users/${userId}`, { token }),

  deleteById: (userId: string, token: string) => fetchAPI(`/users/${userId}`, { method: "DELETE", token }),
}
