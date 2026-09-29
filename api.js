const VV_API_BASE = (window.VV_API_BASE || '').replace(/\/$/, '');
function getManagerToken() { return sessionStorage.getItem('vv_manager_token') || ''; }
function clearManagerToken() { sessionStorage.removeItem('vv_manager_token'); }
async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getManagerToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${VV_API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) { clearManagerToken(); throw new Error('SESSION_EXPIRED'); }
  if (!res.ok) throw new Error(data.error || `Errore HTTP ${res.status}`);
  return data;
}
