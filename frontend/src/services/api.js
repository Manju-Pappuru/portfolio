const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!response.ok) throw new Error('The server could not complete this request.');
  return response.json();
}

export const getProjects = () => request('/projects');
export const sendContactMessage = (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) });
export const sendChatMessage = (message) => request('/ai/chat', { method: 'POST', body: JSON.stringify({ message }) });
