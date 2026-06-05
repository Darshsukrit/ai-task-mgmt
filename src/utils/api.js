const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

function getStoredToken() {
  try {
    return localStorage.getItem('contextos_token')
  } catch {
    return null
  }
}

function buildHeaders(customHeaders = {}) {
  const token = getStoredToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: buildHeaders(options.headers),
  })

  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!response.ok) {
    const message = data?.detail || data?.message || response.statusText
    throw new Error(message || 'API request failed')
  }

  return data
}

export async function apiGet(path) {
  return request(path, { method: 'GET' })
}

export async function apiPost(path, body) {
  return request(path, { method: 'POST', body: JSON.stringify(body) })
}

export function saveToken(token) {
  try {
    localStorage.setItem('contextos_token', token)
  } catch {
    // ignore localStorage failures
  }
}

export function clearToken() {
  try {
    localStorage.removeItem('contextos_token')
  } catch {
    // ignore localStorage failures
  }
}
