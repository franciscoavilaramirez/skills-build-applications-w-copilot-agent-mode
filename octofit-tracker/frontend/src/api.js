const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function getApiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

export async function fetchCollection(path) {
  const response = await fetch(path.startsWith('http') ? path : getApiUrl(path));
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
}

export { apiBaseUrl };
