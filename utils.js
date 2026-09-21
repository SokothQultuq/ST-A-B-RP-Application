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

// Reusable Ship Chat box (Discord integration placeholder), shared across every page.
function renderShipChat(container, getLog, addMessage) {
  container.innerHTML = '';
  container.appendChild(el('div', { style: 'font-size:10px;text-transform:uppercase;letter-spacing:0.07em;color:var(--accent);' }, 'Ship Chat \u00b7 Discord Integration (Coming Soon)'));
  const logBox = el('div', { style: 'flex-grow:1;overflow:auto;display:flex;flex-direction:column;gap:3px;border:1px solid #1c2938;border-radius:4px;padding:8px 10px;background:#080b11;margin-top:6px;' });
  getLog().forEach((c) => logBox.appendChild(el('div', { style: 'font-size:12px;color:#9fb3c0;' }, [el('span', { style: 'color:#6b7d89;' }, c.from + ': '), c.text])));
  container.appendChild(logBox);
  const toolbar = el('div', { style: 'display:flex;gap:4px;margin-top:6px;' });
  ['B', 'I', 'Code', 'Emoji', 'Attach'].forEach((fb) => toolbar.appendChild(el('button', { style: 'padding:4px 8px;border-radius:4px;border:1px solid #2a3541;background:transparent;color:#6b7d89;font-family:"IBM Plex Sans",sans-serif;font-size:10px;font-weight:600;cursor:pointer;' }, fb)));
  container.appendChild(toolbar);
  const inputRow = el('div', { style: 'display:flex;gap:8px;margin-top:6px;' });
  const input = el('input', { class: 'stab-input', type: 'text', placeholder: 'Message...', style: 'flex-grow:1;' });
  const send = () => {
    const t = input.value.trim();
    if (!t) return;
    addMessage(t);
    input.value = '';
    renderShipChat(container, getLog, addMessage);
  };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
  const sendBtn = el('button', { style: 'padding:8px 16px;border-radius:6px;border:1px solid var(--accent);background:var(--accent-wash);color:#eaf6f8;font-family:"IBM Plex Sans",sans-serif;font-size:12px;font-weight:600;cursor:pointer;', onclick: send }, 'Send');
  inputRow.appendChild(input);
  inputRow.appendChild(sendBtn);
  container.appendChild(inputRow);
}
