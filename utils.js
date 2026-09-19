// Shared helpers for the STAB portable demo.
// No backend: all data lives in the browser (in-memory + optional localStorage).

const ALERT_COLORS = {
  normal: null, // falls back to the page's own accent
  yellow: '#ffc63d',
  red: '#ff4444'
};

function applyAlertTheme(level, baseAccent) {
  const root = document.documentElement.style;
  const color = ALERT_COLORS[level] || baseAccent;
  root.setProperty('--accent', color);
  root.setProperty('--accent-wash', color + '1f');
  root.setProperty('--accent-glow', color + '2e');
}

function statusColor(pct, hi = 80, mid = 50) {
  const n = parseFloat(pct);
  if (isNaN(n)) return '#9fb3c0';
  if (n >= hi) return '#7fb069';
  if (n >= mid) return '#e8a33d';
  return '#e05d5d';
}

function saveState(key, obj) {
  try { localStorage.setItem('stab-demo:' + key, JSON.stringify(obj)); } catch (e) { /* ignore */ }
}
function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem('stab-demo:' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function clearState(key) {
  try { localStorage.removeItem('stab-demo:' + key); } catch (e) { /* ignore */ }
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === null || c === undefined) return;
    if (typeof c === 'string' || typeof c === 'number' || typeof c === 'boolean') {
      node.appendChild(document.createTextNode(String(c)));
    } else {
      node.appendChild(c);
    }
  });
  return node;
}

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
