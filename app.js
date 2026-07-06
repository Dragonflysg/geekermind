/* =====================================================================
   Geekmind · Local Mindmap
   HTML + CSS + jQuery + D3 v7, backed by a local Flask server.
   ===================================================================== */

/* ============ CONSTANTS ============ */
const LAST_OPENED_KEY = 'geekmind.lastOpened';
const THEME_KEY = 'geekmind.theme';
const LIGHT_DEFAULT_BG = '#dcd4f5';
const DARK_DEFAULT_BG = '#1b1727';

const BG_PRESETS = [
  '#dcd4f5','#ffd6e0','#d4f1f9','#e7f5d0','#fde9c8','#f0d6ff',
  '#c9d6ff','#ffe3b3','#d4ffe0','#ffd4d4','#e8e8e8','#ffffff',
  '#2a2040','#1e3a5f','#0b3d3d','#3d2a1e','#3d1e2a','#000000'
];

const EMOJI_CATEGORIES = {
  'Smileys': ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😋','😛','😜','🤪','🤨','🧐','🤓','😎','🥳','🤩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕'],
  'People': ['👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','💪','🦾','🦵','🦿','🦶','👣','👀','👁️','👅','👄','💋','👶','🧒','👦','👧','🧑','👨','👩','🧔','👱','👴','👵'],
  'Animals': ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦗','🕷️','🕸️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🐈','🐓','🦃','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🐁','🐀','🐿️','🦔'],
  'Food': ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🌽','🥕','🧄','🧅','🥔','🍠','🥐','🥯','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🥪','🥙','🌮','🌯','🥗','🥘','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🍤','🍙','🍚','🍘','🍥','🥠','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','🍼','☕','🍵','🥤','🍶','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🍾'],
  'Activities': ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🏓','🏸','🥅','🏒','🏑','🏏','🥊','🥋','🎽','⛸️','🥌','🎿','⛷️','🏂','🏋️','🤼','🤸','🤺','⛹️','🤾','🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚵','🚴','🏆','🥇','🥈','🥉','🏅','🎖️','🎫','🎪','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🎻','🎲','♟️','🎯','🎳','🎮','🎰','🧩'],
  'Travel': ['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🚚','🚛','🚜','🛵','🏍️','🚲','🚆','🚄','🚅','🚂','✈️','🛩️','🛫','🛬','🚀','🚁','⛵','🚤','🚢','⚓','🗺️','🗽','🏰','🎡','🎢','🎠','⛲','🏖️','🏝️','🌋','⛰️','🏔️','🗻','🏕️','🏠','🏡','🏢','🏬','🏥','🏦','🏪','🏫','⛪','🕌'],
  'Objects': ['⌚','📱','💻','⌨️','🖥️','🖨️','🖱️','💾','💿','📷','🎥','📞','📺','📻','🎙️','⏰','⌛','⏳','🔋','💡','🔦','💸','💵','💰','💳','💎','🔧','🔨','⚙️','🔩','🧲','💣','🔪','🛡️','🔮','💈','🔭','🔬','💊','💉','🧬','🌡️','🔑','🔒','🔓','🎁','🎈','✉️','📩','📧','📦','🏷️','📮','📜','📄','📊','📈','📉','📅','🗑️','📁','📂','🗞️','📰','📕','📗','📘','📙','📚','📖','🔖','📎','📌','📍','✂️','🖊️','✒️','📝','✏️','🔍','🔎'],
  'Symbols': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','♾️','☮️','✝️','☪️','☸️','✡️','☯️','🛐','☢️','☣️','🆘','❌','⭕','🛑','⛔','🚫','💯','💢','♨️','❗','❕','❓','❔','‼️','⚠️','🔱','♻️','✅','✳️','❎','🌐','Ⓜ️','🌀','💤','♿','♠️','♣️','♥️','♦️','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🎵','🎶','➕','➖','➗','✖️','💲','™️','©️','®️','✔️','☑️','🔘','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔺','🔻','🔶','🔷','🟥','🟧','🟨','🟩','🟦','🟪','⬛','⬜','🟫','🔈','🔇','🔔','💬','💭'],
  'Flags': ['🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️']
};

const ICON_LIST = [
  'heart','star','bookmark','bell','flag','tag','fire','bolt','sun','moon','cloud','snowflake','droplet','leaf','tree','seedling','mountain','globe','earth-americas','umbrella',
  'house','user','users','user-tie','user-graduate','baby','ghost','robot','cat','dog','dove','paw','crow','fish','horse','cow','hippo','frog','spider','otter',
  'heart-pulse','brain','eye','ear-listen','hand','hands-clapping','face-smile','face-laugh','face-meh','face-frown','face-angry',
  'car','plane','ship','train','motorcycle','bicycle','truck','bus','rocket','helicopter','subway','taxi','map','map-location-dot','location-dot','route','compass','anchor',
  'phone','envelope','message','comment','comments','at','paper-plane','inbox','rss','microphone','video','bullhorn','signal','wifi',
  'file','folder','folder-open','copy','paste','clipboard','floppy-disk','hard-drive','print','scissors','paperclip','thumbtack','link','magnet','key','lock','lock-open','unlock',
  'check','xmark','circle-check','circle-xmark','circle-question','circle-info','circle-exclamation','triangle-exclamation','plus','minus',
  'arrow-up','arrow-down','arrow-left','arrow-right','chevron-up','chevron-down','chevron-left','chevron-right','arrows-rotate','rotate','shuffle',
  'cart-shopping','bag-shopping','gift','credit-card','money-bill','coins','sack-dollar','receipt','store','shop','chart-line','chart-pie','chart-bar','wallet',
  'gear','wrench','screwdriver','hammer','toolbox','flask','microscope','vial','dna','atom','plug','battery-full','lightbulb','power-off',
  'book','book-open','newspaper','graduation-cap','school','pen','pen-nib','pencil','highlighter','marker','palette','paintbrush','ruler','calculator','magnifying-glass',
  'music','guitar','drum','headphones','record-vinyl','play','pause','stop','forward','backward','volume-high','volume-low',
  'gamepad','dice','puzzle-piece','chess','trophy','medal','crown','gem','futbol','basketball','baseball','football','dumbbell',
  'camera','image','images','film','clapperboard','ticket',
  'utensils','mug-hot','martini-glass','wine-glass','beer-mug-empty','burger','pizza-slice','bowl-food','apple-whole','ice-cream','cookie',
  'building','hospital','church','industry','warehouse','landmark','city',
  'calendar','calendar-days','calendar-check','clock','hourglass','stopwatch',
  'shield','shield-halved','user-shield','fingerprint','passport','id-card','id-badge','qrcode','barcode',
  'syringe','pills','stethoscope','user-doctor','wheelchair',
  'code','terminal','laptop-code','bug','database','server','sitemap','diagram-project','network-wired',
  'briefcase','suitcase','box','box-open','truck-fast','clipboard-check','clipboard-list',
  'wand-magic','wand-magic-sparkles','meteor','bolt-lightning','volcano','tornado'
];

/* ============ STATE ============ */
const state = {
  activeProject: null,  // string name or null
  nodes: [],
  extraLinks: [],       // cross-links beyond the tree: { id, from, to, arrowReversed }
  bgColor: '#dcd4f5',
  viewport: { k: 1, x: 0, y: 0 },
  selectedId: null,
  selectedLinkId: null,   // child node id (tree link) or 'x:<id>' (extra link)
  favorite: false,
  dirty: false
};

const history = { past: [], future: [] };
const HISTORY_LIMIT = 50;
const linkSprings = new Map();
const nodeSizes = new Map();  // node id -> { w, h } measured from the DOM

/* ============ UTIL ============ */
const uid = () => 'n' + Math.random().toString(36).slice(2, 10);

function defaultStyle() {
  return {
    fontSize: 14,
    bold: false, italic: false, strike: false, underline: false,
    color: '#2a2040',
    bgColor: '#ffffff'
  };
}

function toast(msg, ms = 1600) {
  const $t = $('#toast').text(msg).removeClass('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => $t.addClass('hidden'), ms);
}

function getNode(id) { return state.nodes.find(n => n.id === id); }
function getChildren(id) { return state.nodes.filter(n => n.parentId === id); }
function getSelected() { return state.selectedId ? getNode(state.selectedId) : null; }

function fmtSize(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b/1024).toFixed(1) + ' KB';
  return (b/1048576).toFixed(1) + ' MB';
}
function relTime(ts) {
  if (!ts) return '—';
  const s = Date.now()/1000 - ts;
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s/60) + 'm ago';
  if (s < 86400) return Math.floor(s/3600) + 'h ago';
  if (s < 2592000) return Math.floor(s/86400) + 'd ago';
  return new Date(ts * 1000).toLocaleDateString();
}

function imgSrc(filename) {
  if (!filename) return '';
  if (filename.startsWith('data:') || filename.startsWith('http')) return filename;
  return `/api/projects/${encodeURIComponent(state.activeProject)}/images/${encodeURIComponent(filename)}`;
}

function setSaveStatus() { /* removed */ }

/* ============ API ============ */
async function api(path, opts = {}) {
  const r = await fetch(path, opts);
  if (!r.ok) {
    let err = `HTTP ${r.status}`;
    try { const j = await r.json(); if (j.error) err = j.error; } catch(e){}
    throw new Error(err);
  }
  if (r.status === 204) return null;
  const ct = r.headers.get('content-type') || '';
  return ct.includes('application/json') ? r.json() : r.text();
}

async function apiListProjects() { return api('/api/projects'); }
async function apiCreateProject(name) {
  return api('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
}
async function apiLoadProject(name) { return api('/api/projects/' + encodeURIComponent(name)); }
async function apiSaveProject(name, data) {
  return api('/api/projects/' + encodeURIComponent(name), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
async function apiDeleteProject(name) {
  return api('/api/projects/' + encodeURIComponent(name), { method: 'DELETE' });
}
async function apiSetFavorite(name, favorite) {
  return api(`/api/projects/${encodeURIComponent(name)}/favorite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favorite })
  });
}
async function apiUploadImage(name, blob, filename = 'image.png') {
  const form = new FormData();
  form.append('file', blob, filename);
  const r = await fetch(`/api/projects/${encodeURIComponent(name)}/images`, { method: 'POST', body: form });
  if (!r.ok) throw new Error('Upload failed');
  return r.json();
}

/* ============ AUTOSAVE ============ */
let saveTimer = null;
function markDirty() {
  state.dirty = true;
  setSaveStatus('saving', 'Saving…');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(doSave, 400);
}
async function doSave() {
  if (!state.activeProject) return;
  try {
    await apiSaveProject(state.activeProject, {
      nodes: state.nodes,
      extraLinks: state.extraLinks,
      bgColor: state.bgColor,
      viewport: state.viewport,
      favorite: state.favorite
    });
    state.dirty = false;
  } catch (e) {
    toast('Save failed: ' + e.message);
  }
}

/* ============ HISTORY ============ */
function histEntry() {
  return JSON.stringify({ nodes: state.nodes, extraLinks: state.extraLinks, bgColor: state.bgColor });
}
function applyHistEntry(json) {
  const h = JSON.parse(json);
  state.nodes = h.nodes;
  state.extraLinks = h.extraLinks || [];
  state.bgColor = h.bgColor;
  state.selectedId = null;
  state.selectedLinkId = null;
  render(); markDirty();
}
function snapshot() {
  history.past.push(histEntry());
  if (history.past.length > HISTORY_LIMIT) history.past.shift();
  history.future = [];
  markDirty();
}
function undo() {
  if (!history.past.length) return;
  history.future.push(histEntry());
  applyHistEntry(history.past.pop());
}
function redo() {
  if (!history.future.length) return;
  history.past.push(histEntry());
  applyHistEntry(history.future.pop());
}

/* ============ PROJECT OPS ============ */
async function openProject(name) {
  try {
    const data = await apiLoadProject(name);
    state.activeProject = name;
    state.nodes = (data.nodes || []).map(n => ({ ...n, style: { ...defaultStyle(), ...(n.style || {}) } }));
    state.extraLinks = Array.isArray(data.extraLinks)
      ? data.extraLinks.filter(l => l && l.id && getNode(l.from) && getNode(l.to))
      : [];
    state.bgColor = data.bgColor || '#dcd4f5';
    state.viewport = data.viewport || { k: 1, x: 0, y: 0 };
    state.favorite = !!data.favorite;
    state.selectedId = null;
    state.selectedLinkId = null;
    closePropertiesSidebar();
    history.past = []; history.future = [];
    localStorage.setItem(LAST_OPENED_KEY, name);
    $('#map-name').html(`<i class="fa-solid fa-brain"></i> ${name}`);
    document.title = name + ' · Geekmind';
    closeAllModals();
    render();
    setSaveStatus('saved', 'Saved');
    return true;
  } catch (e) {
    toast('Failed to open: ' + e.message);
    return false;
  }
}

async function createAndOpenProject(name) {
  try {
    await apiCreateProject(name);
    await openProject(name);
    return true;
  } catch (e) {
    throw e;
  }
}

async function deleteProjectAndRefresh(name) {
  try {
    await apiDeleteProject(name);
    if (state.activeProject === name) {
      state.activeProject = null;
      state.nodes = []; state.extraLinks = []; state.selectedId = null;
      localStorage.removeItem(LAST_OPENED_KEY);
      render();
      showWelcome();
    }
    await refreshOpenTable();
    toast('Deleted "' + name + '"');
  } catch (e) {
    toast('Delete failed: ' + e.message);
  }
}

/* ============ NODE OPS ============ */
function createNode({ x, y, parentId = null, text = '' }) {
  const n = {
    id: uid(),
    x, y, text, parentId,
    style: defaultStyle(),
    image: null, emoji: null, icon: null,
    details: '', notes: ''
  };
  state.nodes.push(n);
  return n;
}
function addRootAt(x, y) {
  if (!state.activeProject) { toast('Create or open a project first'); return; }
  snapshot();
  const n = createNode({ x, y });
  state.selectedId = n.id;
  render();
  focusNodeText(n.id);
}
function addChild(parentId) {
  const parent = getNode(parentId); if (!parent) return;
  snapshot();
  const siblings = getChildren(parentId);
  const n = createNode({
    x: parent.x + 200,
    y: parent.y + (siblings.length ? (siblings[siblings.length - 1].y - parent.y + 60) : 0),
    parentId
  });
  state.selectedId = n.id;
  render();
  focusNodeText(n.id);
}
function addSibling(nodeId) {
  const me = getNode(nodeId); if (!me) return;
  if (!me.parentId) {
    snapshot();
    const n = createNode({ x: me.x, y: me.y + 90 });
    state.selectedId = n.id;
    render(); focusNodeText(n.id);
    return;
  }
  addChild(me.parentId);
}
function deleteNode(id) {
  const n = getNode(id); if (!n) return;
  snapshot();
  const toDelete = new Set([id]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const nn of state.nodes) {
      if (nn.parentId && toDelete.has(nn.parentId) && !toDelete.has(nn.id)) {
        toDelete.add(nn.id); changed = true;
      }
    }
  }
  state.nodes = state.nodes.filter(n => !toDelete.has(n.id));
  state.extraLinks = state.extraLinks.filter(l => !toDelete.has(l.from) && !toDelete.has(l.to));
  state.selectedId = null;
  state.selectedLinkId = null;
  if (propsNodeId && toDelete.has(propsNodeId)) closePropertiesSidebar();
  render();
}

/* Delete a single node; its children are re-attached to its parent
   (or become free-standing roots if it had none). */
function deleteNodeOnly(id) {
  const n = getNode(id); if (!n) return;
  snapshot();
  for (const c of getChildren(id)) c.parentId = n.parentId;
  state.nodes = state.nodes.filter(x => x.id !== id);
  state.extraLinks = state.extraLinks.filter(l => l.from !== id && l.to !== id);
  state.selectedId = null;
  state.selectedLinkId = null;
  if (propsNodeId === id) closePropertiesSidebar();
  render();
}

/* ============ RENDER ============ */
function render() {
  applyCanvasBg();
  renderNodes();
  measureNodes();
  rebuildLinkSprings();
  applyTransform();
  $('#btn-undo').prop('disabled', !history.past.length);
  $('#btn-redo').prop('disabled', !history.future.length);
}

function renderNodes() {
  const $nodes = $('#html-layer .nodes');
  $nodes.empty();

  for (const n of state.nodes) {
    const $el = $('<div class="node"></div>')
      .attr('data-id', n.id)
      .css({ left: n.x, top: n.y });
    if (state.selectedId === n.id) $el.addClass('selected');

    const s = n.style;
    $el.css({
      background: s.bgColor,
      color: s.color,
      fontSize: s.fontSize + 'px',
      fontWeight: s.bold ? '700' : '400',
      fontStyle: s.italic ? 'italic' : 'normal'
    });

    if (n.image) {
      $('<img class="node-image" />').attr('src', imgSrc(n.image))
        .on('load', () => measureNode(n.id)).appendTo($el);
    }

    const $row = $('<div class="node-row"></div>').appendTo($el);
    if (n.icon) $('<i class="node-icon"></i>').addClass('fa-solid fa-' + n.icon).appendTo($row);
    if (n.emoji) $('<span class="node-emoji"></span>').text(n.emoji).appendTo($row);
    const $text = $('<span class="node-text" contenteditable="false"></span>').text(n.text).appendTo($row);

    const deco = [];
    if (s.underline) deco.push('underline');
    if (s.strike) deco.push('line-through');
    $text.css('text-decoration', deco.join(' '));

    const $plus = $('<button class="add-child-btn" title="Add child"><i class="fa-solid fa-plus"></i></button>');
    $plus.on('mousedown', e => { e.stopPropagation(); });
    $plus.on('click', e => { e.stopPropagation(); addChild(n.id); });
    $el.append($plus);

    const $handle = $('<button class="link-handle" title="Drag onto another node to re-connect — hold Ctrl while dropping to add an extra connection"><i class="fa-solid fa-link"></i></button>');
    $handle.on('mousedown', e => {
      if (e.button !== 0) return;
      e.preventDefault(); e.stopPropagation();
      startRelinkDrag(n.id, e);
    });
    $el.append($handle);

    $nodes.append($el);
  }
  bindNodeEvents();
}

/* ============ LINK SPRINGS ============ */
/* Every drawn connection: tree links (parentId) + extra cross-links.
   selId is what goes into state.selectedLinkId; rev flips the arrow. */
function getAllLinks() {
  const out = [];
  for (const n of state.nodes) {
    if (n.parentId) {
      const p = getNode(n.parentId);
      if (p) out.push({ key: n.parentId + '>' + n.id, selId: n.id, p, c: n, rev: !!n.arrowReversed });
    }
  }
  for (const l of state.extraLinks) {
    const p = getNode(l.from), c = getNode(l.to);
    if (p && c) out.push({ key: 'x:' + l.id, selId: 'x:' + l.id, p, c, rev: !!l.arrowReversed });
  }
  return out;
}

function rebuildLinkSprings() {
  const links = getAllLinks();
  const valid = new Set(links.map(l => l.key));
  for (const k of [...linkSprings.keys()]) if (!valid.has(k)) linkSprings.delete(k);
  for (const lk of links) {
    if (!linkSprings.has(lk.key)) {
      const dx = (lk.c.x - lk.p.x) * 0.5;
      linkSprings.set(lk.key, { cp1x: lk.p.x + dx, cp1y: lk.p.y, cp2x: lk.c.x - dx, cp2y: lk.c.y,
                                vcp1x:0,vcp1y:0,vcp2x:0,vcp2y:0 });
    }
  }
}
function tickSprings() {
  const K = 0.18, D = 0.68;
  for (const lk of getAllLinks()) {
    const s = linkSprings.get(lk.key); if (!s) continue;
    const p = lk.p, n = lk.c;
    const dx = n.x - p.x, dy = n.y - p.y;
    const horiz = Math.abs(dx) > Math.abs(dy);
    const tcp1x = horiz ? p.x + dx * 0.5 : p.x;
    const tcp1y = horiz ? p.y : p.y + dy * 0.5;
    const tcp2x = horiz ? n.x - dx * 0.5 : n.x;
    const tcp2y = horiz ? n.y : n.y - dy * 0.5;
    s.vcp1x = (s.vcp1x + (tcp1x - s.cp1x) * K) * D;
    s.vcp1y = (s.vcp1y + (tcp1y - s.cp1y) * K) * D;
    s.vcp2x = (s.vcp2x + (tcp2x - s.cp2x) * K) * D;
    s.vcp2y = (s.vcp2y + (tcp2y - s.cp2y) * K) * D;
    s.cp1x += s.vcp1x; s.cp1y += s.vcp1y;
    s.cp2x += s.vcp2x; s.cp2y += s.vcp2y;
  }
  renderLinkPaths();
  requestAnimationFrame(tickSprings);
}
/* ---- node geometry ---- */
function measureNodes() {
  for (const el of document.querySelectorAll('#html-layer .node')) {
    nodeSizes.set(el.dataset.id, { w: el.offsetWidth, h: el.offsetHeight });
  }
}
function measureNode(id) {
  const el = document.querySelector(`#html-layer .node[data-id="${id}"]`);
  if (el) nodeSizes.set(id, { w: el.offsetWidth, h: el.offsetHeight });
}
/* Point on the border of node n's box, on the side facing (towardX, towardY),
   pushed out by `gap` px — so arrowheads sit just outside the node. */
function clipToNode(n, towardX, towardY, gap) {
  const size = nodeSizes.get(n.id) || { w: 120, h: 44 };
  const hw = size.w / 2 + gap, hh = size.h / 2 + gap;
  let dx = towardX - n.x, dy = towardY - n.y;
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) { dx = 1; dy = 0; } else { dx /= len; dy /= len; }
  const t = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh);
  return { x: n.x + dx * t, y: n.y + dy * t };
}

function renderLinkPaths() {
  const data = [];
  for (const lk of getAllLinks()) {
    const s = linkSprings.get(lk.key);
    if (s) data.push({ ...lk, id: lk.selId, s });
  }
  if (state.selectedLinkId && !data.some(d => d.id === state.selectedLinkId)) {
    state.selectedLinkId = null;
  }

  const groups = d3.select('#svg-layer .links').selectAll('g.link').data(data, d => d.key);
  const gEnter = groups.enter().append('g').attr('class', 'link');
  gEnter.append('path').attr('class', 'link-vis');
  gEnter.append('path').attr('class', 'link-hit')
    .on('mousedown', function (event, d) {
      if (event.button !== 0) return;
      event.stopPropagation();
      selectLink(d.id);
    });
  gEnter.append('title').text('Click to select — Del/✕ disconnects, R/⇄ reverses the arrow');
  groups.exit().remove();

  gEnter.merge(groups)
    .classed('selected', d => state.selectedLinkId === d.id)
    .each(function (d) {
      const rev = !!d.rev;   // arrow points back toward the source instead
      const a = clipToNode(d.p, d.s.cp1x, d.s.cp1y, rev ? 6 : 2);
      const b = clipToNode(d.c, d.s.cp2x, d.s.cp2y, rev ? 2 : 6);
      const path = `M ${a.x},${a.y} C ${d.s.cp1x},${d.s.cp1y} ${d.s.cp2x},${d.s.cp2y} ${b.x},${b.y}`;
      const g = d3.select(this);
      const marker = state.selectedLinkId === d.id ? 'url(#arrow-end-sel)' : 'url(#arrow-end)';
      g.select('.link-vis').attr('d', path)
        .attr('marker-end', rev ? null : marker)
        .attr('marker-start', rev ? marker : null);
      g.select('.link-hit').attr('d', path);
      // bezier midpoint (t = 0.5) — anchor for the link buttons
      d.mid = {
        x: (a.x + 3 * d.s.cp1x + 3 * d.s.cp2x + b.x) / 8,
        y: (a.y + 3 * d.s.cp1y + 3 * d.s.cp2y + b.y) / 8
      };
    });

  renderLinkButtons(data);
}

function renderLinkButtons(data) {
  const sel = data.filter(d => d.id === state.selectedLinkId && d.mid);
  const g = d3.select('#svg-layer .links').selectAll('g.link-btns').data(sel, d => d.id);
  const enter = g.enter().append('g').attr('class', 'link-btns');

  const rev = enter.append('g').attr('class', 'link-btn').attr('transform', 'translate(-12,0)')
    .on('mousedown', function (event, d) {
      if (event.button !== 0) return;
      event.stopPropagation();
      reverseLinkArrow(d.id);
    });
  rev.append('circle').attr('r', 9);
  rev.append('path').attr('d', 'M 3.5 -2.5 L -3.5 -2.5 M -1.5 -4.5 L -3.5 -2.5 L -1.5 -0.5 M -3.5 2.5 L 3.5 2.5 M 1.5 0.5 L 3.5 2.5 L 1.5 4.5');
  rev.append('title').text('Reverse arrow direction (R)');

  const del = enter.append('g').attr('class', 'link-btn').attr('transform', 'translate(12,0)')
    .on('mousedown', function (event, d) {
      if (event.button !== 0) return;
      event.stopPropagation();
      disconnectLink(d.id);
    });
  del.append('circle').attr('r', 9);
  del.append('path').attr('d', 'M -3 -3 L 3 3 M 3 -3 L -3 3');
  del.append('title').text('Remove this connection');

  g.exit().remove();
  enter.merge(g).attr('transform', d => `translate(${d.mid.x},${d.mid.y})`);
}

/* ============ LINK EDITING ============ */
function selectLink(childId) {
  state.selectedLinkId = childId;
  state.selectedId = null;
  $('.node').removeClass('selected');
  hideFormatToolbar(); hideContextMenu();
  $('#emoji-picker,#icon-picker,#bg-picker').addClass('hidden');
}

function disconnectLink(selId) {
  if (selId.startsWith('x:')) {
    const l = state.extraLinks.find(x => 'x:' + x.id === selId);
    if (!l) return;
    snapshot();
    state.extraLinks = state.extraLinks.filter(x => x !== l);
    state.selectedLinkId = null;
    render();
    toast('Extra connection removed');
    return;
  }
  const n = getNode(selId);
  if (!n || !n.parentId) return;
  snapshot();
  n.parentId = null;
  n.arrowReversed = false;
  state.selectedLinkId = null;
  render();
  toast('Connection removed — node is now free-standing');
}

function reverseLinkArrow(selId) {
  if (selId.startsWith('x:')) {
    const l = state.extraLinks.find(x => 'x:' + x.id === selId);
    if (!l) return;
    snapshot();
    l.arrowReversed = !l.arrowReversed;
    state.selectedLinkId = selId;
    render();
    toast(l.arrowReversed ? 'Arrow reversed' : 'Arrow direction restored');
    return;
  }
  const n = getNode(selId);
  if (!n || !n.parentId) return;
  snapshot();
  n.arrowReversed = !n.arrowReversed;
  state.selectedLinkId = selId;  // keep the link selected for repeated toggling
  render();
  toast(n.arrowReversed ? 'Arrow reversed' : 'Arrow direction restored');
}

/* true if a tree link or extra link already joins the two nodes (either direction) */
function areDirectlyConnected(aId, bId) {
  const a = getNode(aId), b = getNode(bId);
  if ((a && a.parentId === bId) || (b && b.parentId === aId)) return true;
  return state.extraLinks.some(l =>
    (l.from === aId && l.to === bId) || (l.from === bId && l.to === aId));
}

/* extra cross-link, arrow pointing from -> to; the tree is untouched */
function addExtraLink(fromId, toId) {
  const a = getNode(fromId), b = getNode(toId);
  if (!a || !b) return false;
  if (fromId === toId) { toast("A node can't connect to itself"); return false; }
  if (areDirectlyConnected(fromId, toId)) { toast('These nodes are already connected'); return false; }
  snapshot();
  state.extraLinks.push({ id: uid(), from: fromId, to: toId, arrowReversed: false });
  state.selectedLinkId = null;
  render();
  toast('Extra connection added');
  return true;
}

/* true if walking up from `id` we reach `ancestorId` */
function isDescendantOf(id, ancestorId) {
  const seen = new Set();
  let cur = getNode(id);
  while (cur && cur.parentId && !seen.has(cur.id)) {
    seen.add(cur.id);
    if (cur.parentId === ancestorId) return true;
    cur = getNode(cur.parentId);
  }
  return false;
}

function reparentNode(childId, newParentId) {
  const n = getNode(childId), p = getNode(newParentId);
  if (!n || !p) return false;
  if (childId === newParentId) { toast("A node can't connect to itself"); return false; }
  if (n.parentId === newParentId) { toast('Already connected to that node'); return false; }
  if (isDescendantOf(newParentId, childId)) { toast("Can't connect to one of its own descendants"); return false; }
  snapshot();
  n.parentId = newParentId;
  n.arrowReversed = false;  // a new connection starts with the default direction
  // the new tree link supersedes any extra link between the same pair
  state.extraLinks = state.extraLinks.filter(l =>
    !((l.from === childId && l.to === newParentId) || (l.from === newParentId && l.to === childId)));
  state.selectedLinkId = null;
  render();
  toast(`Connected to "${(p.text || 'node').slice(0, 30)}"`);
  return true;
}

/* drag-to-connect: started from a node's link handle */
let relinkDrag = null;
function startRelinkDrag(childId, e) {
  relinkDrag = { childId, hoverId: null, ctrl: !!e.ctrlKey };
  $('body').addClass('relinking');
  updateTempLink(e.clientX, e.clientY, !!e.ctrlKey);
}
function updateTempLink(cx, cy, ctrl) {
  const n = getNode(relinkDrag.childId);
  if (!n) { cancelRelinkDrag(); return; }
  if (relinkDrag.ctrl !== ctrl) { relinkDrag.ctrl = ctrl; relinkDrag.hoverId = undefined; }
  const wx = (cx - state.viewport.x) / state.viewport.k;
  const wy = (cy - state.viewport.y) / state.viewport.k;
  d3.select('#temp-link').classed('hidden', false)
    .attr('d', `M ${n.x},${n.y} L ${wx},${wy}`);
  const el = document.elementFromPoint(cx, cy);
  const nodeEl = el && el.closest ? el.closest('.node') : null;
  const overId = nodeEl ? nodeEl.dataset.id : null;
  if (relinkDrag.hoverId !== overId) {
    $('.node').removeClass('link-target link-invalid');
    relinkDrag.hoverId = overId;
    if (overId && overId !== relinkDrag.childId) {
      // Ctrl adds an extra link (cycles allowed, duplicates not);
      // a plain drop re-parents (descendants are off-limits).
      const invalid = ctrl
        ? areDirectlyConnected(overId, relinkDrag.childId)
        : isDescendantOf(overId, relinkDrag.childId);
      $(`.node[data-id="${overId}"]`).addClass(invalid ? 'link-invalid' : 'link-target');
    }
  }
}
function cancelRelinkDrag() {
  if (!relinkDrag) return;
  relinkDrag = null;
  $('body').removeClass('relinking');
  $('.node').removeClass('link-target link-invalid');
  d3.select('#temp-link').classed('hidden', true).attr('d', '');
}
$(document).on('mousemove', e => { if (relinkDrag) updateTempLink(e.clientX, e.clientY, e.ctrlKey); });
$(document).on('mouseup', e => {
  if (!relinkDrag) return;
  const { childId, hoverId } = relinkDrag;
  cancelRelinkDrag();
  if (hoverId && hoverId !== childId) {
    if (e.ctrlKey) addExtraLink(hoverId, childId);
    else reparentNode(childId, hoverId);
  } else if (!hoverId) {
    toast('Drop onto a node to connect — hold Ctrl to add an extra connection');
  }
});

/* click-to-pick parent mode (from the context menu) */
let reparentPick = null;  // { id, mode: 'parent' | 'extra' }
function beginReparentPick(id, mode = 'parent') {
  reparentPick = { id, mode };
  $('body').addClass('picking-parent');
  toast(mode === 'extra'
    ? 'Click the node to connect from — arrow will point into this node (Esc to cancel)'
    : 'Click the node you want as the new parent (Esc to cancel)', 2600);
}
function endReparentPick() {
  reparentPick = null;
  $('body').removeClass('picking-parent');
}

/* ============ TRANSFORM ============ */
function applyTransform() {
  const { k, x, y } = state.viewport;
  $('#html-layer .zoom-group').css('transform', `translate(${x}px, ${y}px) scale(${k})`);
  d3.select('#svg-layer .zoom-group').attr('transform', `translate(${x},${y}) scale(${k})`);
  $('#zoom-slider').val(Math.round(k * 100));
  $('#zoom-value').text(Math.round(k * 100) + '%');
}
function setZoom(k, cx, cy) {
  k = Math.max(0.1, Math.min(4, k));
  const vp = state.viewport;
  if (cx != null && cy != null) {
    const wx = (cx - vp.x) / vp.k;
    const wy = (cy - vp.y) / vp.k;
    vp.k = k;
    vp.x = cx - wx * k;
    vp.y = cy - wy * k;
  } else { vp.k = k; }
  applyTransform(); markDirty();
}

/* ============ NODE DRAG ============ */
let dragState = null;
function bindNodeEvents() {
  $('.node').each(function () {
    const $n = $(this);
    const id = $n.data('id');

    $n.on('mousedown', e => {
      if (e.button !== 0) return;
      if (reparentPick) {
        e.stopPropagation();
        const { id: pickId, mode } = reparentPick;
        endReparentPick();
        if (mode === 'extra') addExtraLink(id, pickId);
        else reparentNode(pickId, id);
        return;
      }
      if ($(e.target).closest('.add-child-btn, .link-handle').length) return;
      if ($n.hasClass('editing')) return;
      e.stopPropagation();
      const n = getNode(id); if (!n) return;
      selectNode(id);
      dragState = { id, startX: e.clientX, startY: e.clientY, ox: n.x, oy: n.y, moved: false };
      $n.addClass('dragging');
    });
    $n.on('click', e => e.stopPropagation());
    $n.on('dblclick', e => {
      if ($(e.target).closest('.add-child-btn').length) return;
      e.stopPropagation();
      enterEditMode(id);
    });
    $n.on('contextmenu', e => {
      e.preventDefault(); e.stopPropagation();
      selectNode(id);
      showContextMenu(e.clientX, e.clientY);
    });
  });
}

$(document).on('mousemove', e => {
  if (!dragState) return;
  const dx = (e.clientX - dragState.startX) / state.viewport.k;
  const dy = (e.clientY - dragState.startY) / state.viewport.k;
  if (!dragState.moved && Math.hypot(dx, dy) > 2) {
    dragState.moved = true;
    snapshot();
  }
  const n = getNode(dragState.id); if (!n) return;
  n.x = dragState.ox + dx; n.y = dragState.oy + dy;
  $(`.node[data-id="${n.id}"]`).css({ left: n.x, top: n.y });
});
$(document).on('mouseup', () => {
  if (!dragState) return;
  $(`.node[data-id="${dragState.id}"]`).removeClass('dragging');
  if (dragState.moved) markDirty();
  dragState = null;
});

function selectNode(id) {
  state.selectedId = id;
  state.selectedLinkId = null;
  $('.node').removeClass('selected');
  $(`.node[data-id="${id}"]`).addClass('selected');
}
function focusNodeText(id) { setTimeout(() => enterEditMode(id), 30); }

function enterEditMode(id) {
  const n = getNode(id); if (!n) return;
  selectNode(id);
  const $n = $(`.node[data-id="${id}"]`);
  $n.addClass('editing');
  const $t = $n.find('.node-text').attr('contenteditable', 'true').focus();

  const range = document.createRange();
  range.selectNodeContents($t[0]);
  const sel = window.getSelection();
  sel.removeAllRanges(); sel.addRange(range);

  showFormatToolbar(id);

  $t.on('keydown.edit', ev => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      $t.blur();
    }
    // Enter inserts a line break (browser default) — commit happens on click-outside
  });
  $t.on('input.edit', () => measureNode(id));
  $t.on('blur.edit', ev => {
    // If focus moved to the format toolbar, don't end editing — user is picking a format.
    const rt = ev.originalEvent && ev.originalEvent.relatedTarget;
    if (rt && $(rt).closest('#format-toolbar').length) return;

    const newText = $t[0].innerText.replace(/\n+$/, '');
    if (newText !== n.text) { snapshot(); n.text = newText; }
    $t.attr('contenteditable', 'false').off('.edit');
    $n.removeClass('editing');
    render();
  });
}

/* ============ CONTEXT MENU ============ */
function showContextMenu(x, y) { $('#context-menu').css({ left: x, top: y }).removeClass('hidden'); }
function hideContextMenu() { $('#context-menu').addClass('hidden'); }

$('#context-menu').on('click', '.ctx-item', function (e) {
  e.stopPropagation();
  const action = $(this).data('action');
  const id = state.selectedId;
  hideContextMenu();
  if (!id) return;
  switch (action) {
    case 'add-child': addChild(id); break;
    case 'add-sibling': addSibling(id); break;
    case 'add-properties': openPropertiesSidebar(id); break;
    case 'reparent': beginReparentPick(id); break;
    case 'extra-link': beginReparentPick(id, 'extra'); break;
    case 'reverse-arrow': {
      const n = getNode(id);
      if (n && n.parentId) reverseLinkArrow(id);
      else toast('This node has no parent connection');
      break;
    }
    case 'disconnect': {
      const n = getNode(id);
      if (n && n.parentId) disconnectLink(id);
      else toast('This node has no parent connection');
      break;
    }
    case 'delete-solo': deleteNodeOnly(id); break;
    case 'add-image': openImagePicker(); break;
    case 'add-emoji': openEmojiPicker(); break;
    case 'add-icon': openIconPicker(); break;
    case 'remove-media': {
      snapshot();
      const n = getNode(id); n.image = null; n.emoji = null; n.icon = null;
      render(); break;
    }
    case 'edit': enterEditMode(id); break;
    case 'delete': deleteNode(id); break;
  }
});

/* ============ FORMAT TOOLBAR ============ */
function showFormatToolbar(id) {
  const n = getNode(id); if (!n) return;
  const $bar = $('#format-toolbar');
  const $node = $(`.node[data-id="${id}"]`);
  const rect = $node[0].getBoundingClientRect();
  $('#fmt-size').val(String(n.style.fontSize));
  $('#fmt-bold').toggleClass('active', n.style.bold);
  $('#fmt-italic').toggleClass('active', n.style.italic);
  $('#fmt-strike').toggleClass('active', n.style.strike);
  $('#fmt-underline').toggleClass('active', n.style.underline);
  $('#fmt-color').val(n.style.color);
  $('#fmt-color-bar').css('background', n.style.color);
  $('#fmt-bg').val(n.style.bgColor);
  $('#fmt-bg-bar').css('background', n.style.bgColor);
  $bar.removeClass('hidden');
  const bw = $bar.outerWidth();
  let left = rect.left + rect.width / 2 - bw / 2;
  let top = rect.top - $bar.outerHeight() - 10;
  left = Math.max(6, Math.min(window.innerWidth - bw - 6, left));
  if (top < 60) top = rect.bottom + 10;
  $bar.css({ left, top });
}
function hideFormatToolbar() { $('#format-toolbar').addClass('hidden'); }

function applyNodeStyle(id) {
  const n = getNode(id); if (!n) return;
  const $n = $(`.node[data-id="${id}"]`);
  if (!$n.length) return;
  const s = n.style;
  $n.css({
    background: s.bgColor,
    color: s.color,
    fontSize: s.fontSize + 'px',
    fontWeight: s.bold ? '700' : '400',
    fontStyle: s.italic ? 'italic' : 'normal'
  });
  const deco = [];
  if (s.underline) deco.push('underline');
  if (s.strike) deco.push('line-through');
  $n.find('.node-text').css('text-decoration', deco.join(' '));
}

function refreshFormatToolbarState(id) {
  const n = getNode(id); if (!n) return;
  $('#fmt-size').val(String(n.style.fontSize));
  $('#fmt-bold').toggleClass('active', n.style.bold);
  $('#fmt-italic').toggleClass('active', n.style.italic);
  $('#fmt-strike').toggleClass('active', n.style.strike);
  $('#fmt-underline').toggleClass('active', n.style.underline);
  $('#fmt-color-bar').css('background', n.style.color);
  $('#fmt-bg-bar').css('background', n.style.bgColor);
}

function applyFormat(prop, value) {
  const id = state.selectedId;
  const n = getNode(id); if (!n) return;
  snapshot();
  n.style[prop] = value;
  applyNodeStyle(id);
  measureNode(id);
  refreshFormatToolbarState(id);
  // Reposition — node may have resized (font size / padding-affecting changes)
  const $bar = $('#format-toolbar');
  if (!$bar.hasClass('hidden')) showFormatToolbar(id);
}

// Keep contenteditable focused when clicking buttons on the format toolbar.
// Exclude <select> and <input type="color"> — those need to receive focus to open their native UI.
$('#format-toolbar').on('mousedown', function (e) {
  const $t = $(e.target);
  if ($t.is('select, option, input[type="color"]') || $t.closest('label.color-btn').length) return;
  e.preventDefault();
});

$('#fmt-size').on('change', function () { applyFormat('fontSize', parseInt(this.value)); });
$('#fmt-bold').on('click', () => { const n = getSelected(); if (n) applyFormat('bold', !n.style.bold); });
$('#fmt-italic').on('click', () => { const n = getSelected(); if (n) applyFormat('italic', !n.style.italic); });
$('#fmt-strike').on('click', () => { const n = getSelected(); if (n) applyFormat('strike', !n.style.strike); });
$('#fmt-underline').on('click', () => { const n = getSelected(); if (n) applyFormat('underline', !n.style.underline); });
$('#fmt-color').on('input', function () { $('#fmt-color-bar').css('background', this.value); applyFormat('color', this.value); });
$('#fmt-bg').on('input', function () { $('#fmt-bg-bar').css('background', this.value); applyFormat('bgColor', this.value); });
$('#fmt-clear').on('click', () => {
  const n = getSelected(); if (!n) return;
  snapshot(); n.style = defaultStyle();
  render();
  setTimeout(() => showFormatToolbar(n.id), 0);
});

/* ============ PROPERTIES SIDEBAR ============ */
let propsNodeId = null;
function openPropertiesSidebar(id) {
  const n = getNode(id); if (!n) return;
  propsNodeId = id;
  $('#props-details').val(n.details || '');
  $('#props-notes').val(n.notes || '');
  $('#properties-sidebar').removeClass('hidden');
}
function closePropertiesSidebar() {
  propsNodeId = null;
  $('#properties-sidebar').addClass('hidden');
}
$('#props-close').on('click', closePropertiesSidebar);

let propsResize = null;
$('#props-handle').on('mousedown', e => {
  e.preventDefault();
  e.stopPropagation();
  propsResize = { startX: e.clientX, startW: $('#properties-sidebar').outerWidth() };
  $('#properties-sidebar').addClass('resizing');
  $('body').css('cursor', 'ew-resize');
});
$(document).on('mousemove', e => {
  if (!propsResize) return;
  const delta = propsResize.startX - e.clientX;
  const minW = 280;
  const maxW = Math.min(window.innerWidth - 60, window.innerWidth * 0.95);
  const w = Math.max(minW, Math.min(maxW, propsResize.startW + delta));
  $('#properties-sidebar').css('width', w + 'px');
});
$(document).on('mouseup', () => {
  if (!propsResize) return;
  propsResize = null;
  $('#properties-sidebar').removeClass('resizing');
  $('body').css('cursor', '');
});
let propsSnapshotTaken = false;
$('#props-details, #props-notes').on('focus', () => { propsSnapshotTaken = false; });
$('#props-details, #props-notes').on('input', function () {
  if (!propsNodeId) return;
  const n = getNode(propsNodeId); if (!n) return;
  const field = this.id === 'props-details' ? 'details' : 'notes';
  if (!propsSnapshotTaken) { snapshot(); propsSnapshotTaken = true; }
  n[field] = this.value;
  markDirty();
});

/* ============ EMOJI PICKER ============ */
function buildEmojiPicker() {
  const $tabs = $('#emoji-tabs').empty();
  const $grid = $('#emoji-grid').empty();
  const cats = Object.keys(EMOJI_CATEGORIES);
  let activeCat = cats[0];
  const renderGrid = (filter = '', cat = activeCat) => {
    $grid.empty();
    const items = filter
      ? [].concat(...cats.map(c => EMOJI_CATEGORIES[c]))
      : EMOJI_CATEGORIES[cat];
    for (const e of items) $('<button class="p-item"></button>').text(e).on('click', () => pickEmoji(e)).appendTo($grid);
  };
  for (const c of cats) {
    const $b = $('<button></button>').text(EMOJI_CATEGORIES[c][0]).attr('title', c)
      .on('click', () => {
        activeCat = c;
        $('#emoji-tabs button').removeClass('active');
        $b.addClass('active');
        $('#emoji-search').val('');
        renderGrid('', c);
      });
    if (c === activeCat) $b.addClass('active');
    $tabs.append($b);
  }
  renderGrid();
  $('#emoji-search').off('input').on('input', function () { renderGrid(this.value.trim().toLowerCase(), activeCat); });
}
function openEmojiPicker() {
  if (!state.selectedId) { toast('Select a node first'); return; }
  buildEmojiPicker();
  positionPickerAtSelected($('#emoji-picker'));
}
function pickEmoji(e) {
  const n = getSelected(); if (!n) return;
  snapshot(); n.emoji = e; render();
  $('#emoji-picker').addClass('hidden');
}

/* ============ ICON PICKER ============ */
function buildIconPicker() {
  const $grid = $('#icon-grid').empty();
  const renderGrid = (filter = '') => {
    $grid.empty();
    const items = filter ? ICON_LIST.filter(i => i.includes(filter)) : ICON_LIST;
    for (const ic of items)
      $(`<button class="p-item icon" title="${ic}"><i class="fa-solid fa-${ic}"></i></button>`)
        .on('click', () => pickIcon(ic)).appendTo($grid);
  };
  renderGrid();
  $('#icon-search').off('input').on('input', function () { renderGrid(this.value.trim().toLowerCase()); });
}
function openIconPicker() {
  if (!state.selectedId) { toast('Select a node first'); return; }
  buildIconPicker();
  positionPickerAtSelected($('#icon-picker'));
}
function pickIcon(ic) {
  const n = getSelected(); if (!n) return;
  snapshot(); n.icon = ic; render();
  $('#icon-picker').addClass('hidden');
}

function positionPickerAtSelected($p) {
  $p.removeClass('hidden');
  const $node = $(`.node[data-id="${state.selectedId}"]`);
  if (!$node.length) return;
  const rect = $node[0].getBoundingClientRect();
  $p.css({
    left: Math.min(window.innerWidth - $p.outerWidth() - 10, rect.right + 10),
    top:  Math.min(window.innerHeight - $p.outerHeight() - 10, rect.top)
  });
}

/* ============ BG PICKER ============ */
function buildBgPicker() {
  const $p = $('#bg-presets').empty();
  for (const c of BG_PRESETS) $('<div class="bg-preset"></div>').css('background', c).on('click', () => pickBg(c)).appendTo($p);
  $('#bg-custom-input').val(state.bgColor).off('input').on('input', function () { pickBg(this.value); });
}
function pickBg(c) {
  snapshot(); state.bgColor = c;
  applyCanvasBg();
}

/* ============ THEME ============ */
let theme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
function applyCanvasBg() {
  let c = state.bgColor || LIGHT_DEFAULT_BG;
  // Untouched default background follows the theme; custom picks are respected.
  if (theme === 'dark' && c.toLowerCase() === LIGHT_DEFAULT_BG) c = DARK_DEFAULT_BG;
  $('body').css('background', c);
}
function applyTheme(t) {
  theme = t;
  $('body').toggleClass('dark', t === 'dark');
  $('#btn-theme i').attr('class', t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon');
  $('#btn-theme').attr('title', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  localStorage.setItem(THEME_KEY, t);
  applyCanvasBg();
}
$('#btn-theme').on('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
function openBgPicker() {
  buildBgPicker();
  const $p = $('#bg-picker').removeClass('hidden');
  const rect = $('#btn-bg')[0].getBoundingClientRect();
  $p.css({ left: rect.left - 80, top: rect.bottom + 8 });
}

/* ============ IMAGE ============ */
function openImagePicker() {
  if (!state.activeProject) { toast('Create or open a project first'); return; }
  if (!state.selectedId) { toast('Select a node first'); return; }
  $('#image-input').val('').trigger('click');
}
$('#image-input').on('change', async function () {
  const f = this.files[0]; if (!f) return;
  await attachImageToSelected(f);
});

async function attachImageToSelected(blob, name = 'image.png') {
  if (!state.activeProject) { toast('Open a project first'); return; }
  if (!state.selectedId) { toast('Select a node first'); return; }
  try {
    setSaveStatus('saving', 'Uploading…');
    const { filename } = await apiUploadImage(state.activeProject, blob, name);
    const n = getSelected(); if (!n) return;
    snapshot();
    n.image = filename;
    render();
  } catch (e) {
    toast('Image upload failed: ' + e.message);
    setSaveStatus('error', 'Upload failed');
  }
}

/* Clipboard paste */
$(document).on('paste', async e => {
  if (!state.activeProject) return;
  const items = (e.originalEvent.clipboardData || e.clipboardData).items;
  for (const it of items) {
    if (it.type.startsWith('image/')) {
      const blob = it.getAsFile();
      if (!state.selectedId) {
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const wx = (cx - state.viewport.x) / state.viewport.k;
        const wy = (cy - state.viewport.y) / state.viewport.k;
        addRootAt(wx, wy);
      }
      await attachImageToSelected(blob, 'paste.' + (it.type.split('/')[1] || 'png'));
      e.preventDefault();
      return;
    }
  }
});

/* Drag-and-drop */
$('#canvas').on('dragover', e => { e.preventDefault(); })
  .on('drop', async e => {
    e.preventDefault();
    if (!state.activeProject) { toast('Create or open a project first'); return; }
    const dt = e.originalEvent.dataTransfer;
    if (!dt || !dt.files || !dt.files.length) return;
    const f = dt.files[0];
    if (!f.type.startsWith('image/')) return;
    const wx = (e.clientX - state.viewport.x) / state.viewport.k;
    const wy = (e.clientY - state.viewport.y) / state.viewport.k;
    try {
      setSaveStatus('saving', 'Uploading…');
      const { filename } = await apiUploadImage(state.activeProject, f, f.name);
      snapshot();
      const n = createNode({ x: wx, y: wy });
      n.image = filename;
      state.selectedId = n.id;
      render();
    } catch (err) {
      toast('Drop upload failed: ' + err.message);
    }
  });

/* ============ MODALS ============ */
function showModal(id) {
  $('#modal-backdrop').removeClass('hidden');
  $('#' + id).removeClass('hidden');
}
function hideModal(id) {
  $('#' + id).addClass('hidden');
  if (!$('.modal').not('.hidden').length) $('#modal-backdrop').addClass('hidden');
}
function closeAllModals() {
  $('.modal').addClass('hidden');
  $('#modal-backdrop').addClass('hidden');
}

$('[data-close]').on('click', function () { hideModal($(this).data('close')); });

/* Welcome */
function showWelcome() {
  $('#welcome-new, #welcome-open').prop('disabled', false);
  showModal('welcome');
}
$('#welcome-new').on('click', () => { hideModal('welcome'); openNewModal(); });
$('#welcome-open').on('click', () => { hideModal('welcome'); openOpenModal(); });

/* New */
function openNewModal() {
  $('#new-name').val('');
  $('#new-error').addClass('hidden').text('');
  showModal('new-modal');
  setTimeout(() => $('#new-name').focus(), 50);
}
$('#new-name').on('keydown', e => { if (e.key === 'Enter') $('#new-create').click(); });
$('#new-create').on('click', async () => {
  const name = $('#new-name').val().trim();
  if (!name) {
    $('#new-error').text('Please enter a name.').removeClass('hidden');
    return;
  }
  try {
    await createAndOpenProject(name);
    toast('Created "' + name + '"');
  } catch (e) {
    $('#new-error').text(e.message).removeClass('hidden');
  }
});

/* Open */
async function openOpenModal() {
  showModal('open-modal');
  $('#open-search').val('');
  await refreshOpenTable();
}
async function refreshOpenTable() {
  try {
    const list = await apiListProjects();
    const $body = $('#open-tbody').empty();
    if (!list.length) {
      $('#open-empty').removeClass('hidden');
      $body.closest('.open-table-wrap').find('.open-table').css('display', 'none');
      return;
    }
    $('#open-empty').addClass('hidden');
    $body.closest('.open-table-wrap').find('.open-table').css('display', '');

    const filter = ($('#open-search').val() || '').toLowerCase();
    for (const p of list) {
      if (filter && !p.name.toLowerCase().includes(filter)) continue;
      const favCls = p.favorite ? 'fav-btn faved' : 'fav-btn';
      const favTitle = p.favorite ? 'Unfavorite' : 'Favorite';
      const $row = $(`
        <tr data-name="${p.name.replace(/"/g,'&quot;')}">
          <td class="fav"><button class="${favCls}" title="${favTitle}"><i class="fa-solid fa-heart"></i></button></td>
          <td><div class="name-cell"><i class="fa-solid fa-brain"></i>${$('<div>').text(p.name).html()}</div></td>
          <td class="num">${p.nodeCount}</td>
          <td>${relTime(p.modified)}</td>
          <td class="actions"><button class="del-btn" title="Delete"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
      `);
      if (p.name === state.activeProject) $row.addClass('active');
      $row.on('click', e => {
        if ($(e.target).closest('.del-btn, .fav-btn').length) return;
        openProject(p.name);
      });
      $row.find('.fav-btn').on('click', async e => {
        e.stopPropagation();
        const newFav = !p.favorite;
        try {
          await apiSetFavorite(p.name, newFav);
          if (state.activeProject === p.name) state.favorite = newFav;
          await refreshOpenTable();
        } catch (err) {
          toast('Could not update favorite: ' + err.message);
        }
      });
      $row.find('.del-btn').on('click', async e => {
        e.stopPropagation();
        if (!confirm(`Delete "${p.name}" and all its contents? This cannot be undone.`)) return;
        await deleteProjectAndRefresh(p.name);
      });
      $body.append($row);
    }
  } catch (e) {
    toast('Failed to list projects: ' + e.message);
  }
}
$('#open-search').on('input', refreshOpenTable);
$('#open-empty-new').on('click', () => { hideModal('open-modal'); openNewModal(); });
$('#open-head-new').on('click', () => { hideModal('open-modal'); openNewModal(); });

/* ============ TOOLBAR HANDLERS ============ */
$('#btn-new').on('click', openNewModal);
$('#btn-open').on('click', openOpenModal);
$('#btn-add-root').on('click', () => {
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const wx = (cx - state.viewport.x) / state.viewport.k;
  const wy = (cy - state.viewport.y) / state.viewport.k;
  addRootAt(wx, wy);
});
$('#btn-add-child').on('click', () => {
  if (!state.selectedId) { toast('Select a node first'); return; }
  addChild(state.selectedId);
});
$('#btn-add-sibling').on('click', () => {
  if (!state.selectedId) { toast('Select a node first'); return; }
  addSibling(state.selectedId);
});
$('#btn-image').on('click', openImagePicker);
$('#btn-emoji').on('click', openEmojiPicker);
$('#btn-icon').on('click', openIconPicker);
$('#btn-bg').on('click', openBgPicker);
$('#btn-undo').on('click', undo);
$('#btn-redo').on('click', redo);
$('#btn-delete').on('click', () => { if (state.selectedId) deleteNode(state.selectedId); });
$('#btn-clear').on('click', () => {
  if (!state.nodes.length) return;
  if (!confirm('Clear all nodes in this map? (Images on disk are kept.)')) return;
  snapshot();
  state.nodes = []; state.extraLinks = []; state.selectedId = null; state.selectedLinkId = null;
  render();
});

/* ============ CANVAS EVENTS ============ */
$('#canvas').on('contextmenu', e => {
  if (!$(e.target).closest('.node').length) e.preventDefault();
});
$('#canvas').on('dblclick', e => {
  if ($(e.target).closest('.node, .popup, #toolbar, #zoom-control').length) return;
  const wx = (e.clientX - state.viewport.x) / state.viewport.k;
  const wy = (e.clientY - state.viewport.y) / state.viewport.k;
  addRootAt(wx, wy);
});

$(document).on('mousedown', e => {
  if (!$(e.target).closest('.node, #format-toolbar, #context-menu, #emoji-picker, #icon-picker, #bg-picker, #toolbar, .modal, #modal-backdrop, #properties-sidebar').length) {
    state.selectedId = null;
    state.selectedLinkId = null;
    $('.node').removeClass('selected');
    hideFormatToolbar(); hideContextMenu();
    $('#emoji-picker,#icon-picker,#bg-picker').addClass('hidden');
  }
});

/* Pan */
let panState = null;
$('#canvas').on('mousedown', e => {
  if ($(e.target).closest('.node, .popup').length) return;
  if (e.button !== 0 && e.button !== 1) return;
  panState = { startX: e.clientX, startY: e.clientY, ox: state.viewport.x, oy: state.viewport.y };
  $('#canvas').addClass('panning');
});
$(document).on('mousemove', e => {
  if (!panState) return;
  state.viewport.x = panState.ox + (e.clientX - panState.startX);
  state.viewport.y = panState.oy + (e.clientY - panState.startY);
  applyTransform();
});
$(document).on('mouseup', () => {
  if (!panState) return;
  panState = null;
  $('#canvas').removeClass('panning');
  markDirty();
});

/* Wheel zoom */
$('#canvas').on('wheel', e => {
  e.preventDefault();
  const factor = e.originalEvent.deltaY > 0 ? 0.9 : 1.1;
  setZoom(state.viewport.k * factor, e.clientX, e.clientY);
});

/* Zoom controls */
$('#zoom-slider').on('input', function () { setZoom(parseInt(this.value) / 100, innerWidth/2, innerHeight/2); });
$('#zoom-in').on('click', () => setZoom(state.viewport.k * 1.2, innerWidth/2, innerHeight/2));
$('#zoom-out').on('click', () => setZoom(state.viewport.k / 1.2, innerWidth/2, innerHeight/2));
$('#zoom-fit').on('click', fitToScreen);

function fitToScreen() {
  if (!state.nodes.length) { state.viewport = { k: 1, x: 0, y: 0 }; applyTransform(); markDirty(); return; }
  let minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
  for (const n of state.nodes) {
    const sz = nodeSizes.get(n.id) || { w: 240, h: 80 };
    minX = Math.min(minX, n.x - sz.w/2); minY = Math.min(minY, n.y - sz.h/2);
    maxX = Math.max(maxX, n.x + sz.w/2); maxY = Math.max(maxY, n.y + sz.h/2);
  }
  const pad = 80, w = maxX-minX+pad*2, h = maxY-minY+pad*2;
  const k = Math.min(innerWidth/w, innerHeight/h, 1.5);
  state.viewport.k = k;
  state.viewport.x = (innerWidth  - (minX+maxX)*k) / 2;
  state.viewport.y = (innerHeight - (minY+maxY)*k) / 2;
  applyTransform(); markDirty();
}

/* ============ KEYBOARD ============ */
$(document).on('keydown', e => {
  const inEdit = $('.node.editing').length > 0;
  const inInput = $(e.target).is('input, textarea, [contenteditable="true"]');
  if ((e.ctrlKey || e.metaKey) && !inEdit) {
    if (e.key === 'n' && !e.shiftKey) { e.preventDefault(); openNewModal(); return; }
    if (e.key === 'o' && !e.shiftKey) { e.preventDefault(); openOpenModal(); return; }
    if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
    if ((e.key === 'y') || (e.key === 'Z' && e.shiftKey)) { e.preventDefault(); redo(); return; }
  }
  if (inInput || inEdit) return;
  if (e.key === 'Tab') {
    e.preventDefault();
    if (state.selectedId) addChild(state.selectedId);
    else {
      const wx = (innerWidth/2 - state.viewport.x) / state.viewport.k;
      const wy = (innerHeight/2 - state.viewport.y) / state.viewport.k;
      addRootAt(wx, wy);
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (state.selectedId) addSibling(state.selectedId);
  } else if (e.key === 'Delete' || e.key === 'Backspace') {
    if (state.selectedLinkId) { e.preventDefault(); disconnectLink(state.selectedLinkId); }
    else if (state.selectedId) { e.preventDefault(); deleteNode(state.selectedId); }
  } else if ((e.key === 'r' || e.key === 'R') && state.selectedLinkId && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    reverseLinkArrow(state.selectedLinkId);
  } else if (e.key === 'Escape') {
    state.selectedId = null;
    state.selectedLinkId = null;
    cancelRelinkDrag();
    endReparentPick();
    $('.node').removeClass('selected');
    hideFormatToolbar(); hideContextMenu();
    $('#emoji-picker,#icon-picker,#bg-picker').addClass('hidden');
  } else if (e.key === 'F2' && state.selectedId) {
    enterEditMode(state.selectedId);
  }
});

/* ============ INIT ============ */
$(async function () {
  applyTheme(theme);
  const last = localStorage.getItem(LAST_OPENED_KEY);
  if (last) {
    const ok = await openProject(last);
    if (!ok) showWelcome();
  } else {
    showWelcome();
  }
  requestAnimationFrame(tickSprings);
});
