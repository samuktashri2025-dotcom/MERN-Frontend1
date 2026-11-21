const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const AUTH_TOKEN_KEY = 'samchu-auth-token';

export function setAuthToken(token) {
  if (token) sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  else sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function apiRequest(path, { method = 'GET', body } = {}) {
  let response;
  try {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.');
  }

  const contentType = response.headers.get('content-type') || '';
  const result = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof result === 'object' && result !== null
      ? result.message || result.error
      : result;
    throw new Error(message || `Request failed (${response.status}).`);
  }

  return result;
}
