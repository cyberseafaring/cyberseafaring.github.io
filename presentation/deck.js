'use strict';

const gate = document.querySelector('#gate');
const library = document.querySelector('#library');
const libraryLink = document.querySelector('#library-link');
const deck = document.querySelector('#deck');
const form = document.querySelector('#unlock-form');
const input = document.querySelector('#passphrase');
const status = document.querySelector('#status');
const root = document.querySelector('#reveal');
const slides = document.querySelector('#slides');
const previous = document.querySelector('#prev');
const next = document.querySelector('#next');
const fullscreen = document.querySelector('#fullscreen');
const lockButton = document.querySelector('#lock');
const language = document.querySelector('#language');
const counter = document.querySelector('#counter');
const toolbar = document.querySelector('.toolbar');
const labels = {
  zh: { lang: 'zh-CN', prev: '上一页', next: '下一页', fullscreen: '全屏', exit: '退出全屏', lock: '锁定', switch: 'English', toolbar: '演示控制' },
  en: { lang: 'en', prev: 'Previous', next: 'Next', fullscreen: 'Fullscreen', exit: 'Exit fullscreen', lock: 'Lock', switch: '简体中文', toolbar: 'Presentation controls' }
};

const decode = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
let presentation;
let content;
let locale = 'zh';
let generation = 0;
let key;
let entries;
let libraryPayload;
const base = '/presentation/';
const narrowScreen = matchMedia('(max-width: 620px) and (orientation: portrait)');

function slideSize() {
  const portrait = narrowScreen.matches && slides.querySelector('.cv-folio') !== null;
  root.classList.toggle('cv-portrait', portrait);
  return portrait ? { width: 760, height: 1140 } : { width: 1920, height: 1080 };
}

narrowScreen.addEventListener('change', () => {
  if (presentation) presentation.configure(slideSize());
});

function updateControls() {
  const text = labels[locale];
  const entry = entries.find(item => base + item.slug + '/' === location.pathname);
  document.title = (entry?.title[locale] ?? 'Presentation') + ' · Cyberseafaring';
  const index = presentation.getIndices().h;
  document.documentElement.lang = text.lang;
  toolbar.setAttribute('aria-label', text.toolbar);
  libraryLink.textContent = locale === 'zh' ? '演示目录' : 'Presentation library';
  previous.textContent = text.prev;
  next.textContent = text.next;
  fullscreen.textContent = document.fullscreenElement ? text.exit : text.fullscreen;
  lockButton.textContent = text.lock;
  language.textContent = text.switch;
  language.lang = labels[locale === 'zh' ? 'en' : 'zh'].lang;
  counter.textContent = (index + 1) + ' / ' + presentation.getTotalSlides();
  previous.disabled = index === 0;
  next.disabled = index === presentation.getTotalSlides() - 1;
}

function renderSlides(index) {
  const selectedPort = slides.querySelector('[data-port-record]:not([hidden])')?.dataset.portRecord;
  slides.innerHTML = content[locale];
  const portMap = slides.querySelector('[data-port-impact]');
  if (portMap) window.activatePortImpactMap(portMap, { port: selectedPort });
  for (const image of slides.querySelectorAll('[data-image]')) {
    const src = content.images[image.dataset.image];
    if (image.tagName === 'IMG') image.src = src;
    else image.style.backgroundImage = 'linear-gradient(90deg,#071c27f5 0%,#0c2732d9 42%,#102e3875 100%), url("' + src + '")';
  }
  if (presentation) {
    presentation.sync();
    presentation.slide(index, 0);
    updateControls();
  }
}

function clearDeck() {
  if (presentation) presentation.destroy();
  presentation = undefined;
  content = undefined;
  slides.replaceChildren();
  deck.hidden = true;
}

function lock() {
  generation++;
  key = entries = libraryPayload = undefined;
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  clearDeck();
  library.hidden = true;
  library.replaceChildren();
  locale = 'zh';
  document.documentElement.lang = labels.zh.lang;
  document.title = 'Presentation · Cyberseafaring';
  gate.hidden = false;
  status.textContent = '';
  input.value = '';
}

async function fetchPayload(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Presentation unavailable');
  return response.json();
}

async function decrypt(payload, unlockedKey) {
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: decode(payload.iv) }, unlockedKey, decode(payload.ciphertext)
  );
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(plaintext));
}

function renderLibrary(message = '') {
  document.documentElement.lang = labels[locale].lang;
  document.title = 'Presentation · Cyberseafaring';
  library.innerHTML = `
    <nav class="library-actions">
      <a href="/">中文主页</a><a href="/en/" lang="en">English home</a>
      <div class="library-buttons">
        <button id="library-language" type="button"></button>
        <button id="library-lock" type="button"></button>
      </div>
    </nav>
    <h1 tabindex="-1">Presentation</h1>
    <div class="library-list"></div>
    <p role="status"></p>`;
  const langButton = library.querySelector('#library-language');
  langButton.textContent = labels[locale].switch;
  langButton.addEventListener('click', () => {
    locale = locale === 'zh' ? 'en' : 'zh';
    renderLibrary(message);
    library.querySelector('#library-language').focus();
  });
  const libraryLock = library.querySelector('#library-lock');
  libraryLock.textContent = labels[locale].lock;
  libraryLock.addEventListener('click', () => {
    lock();
    input.focus();
  });
  const list = library.querySelector('.library-list');
  for (const entry of entries) {
    const link = document.createElement('a');
    link.dataset.presentation = '';
    link.href = base + entry.slug + '/';
    const heading = document.createElement('h2');
    heading.textContent = entry.title[locale];
    const description = document.createElement('p');
    description.textContent = entry.description[locale];
    link.append(heading, description);
    list.append(link);
  }
  library.querySelector('[role="status"]').textContent = message;
  library.hidden = false;
}

async function showRoute() {
  if (!key) return;
  const attempt = ++generation;
  const slug = location.pathname.slice(base.length).replace(/\/$/, '');
  const entry = entries.find(item => item.slug === slug);
  clearDeck();
  renderLibrary(entry ? (locale === 'zh' ? '正在打开演示…' : 'Opening presentation…') : '');
  if (!entry) {
    library.querySelector('h1').focus();
    return;
  }
  try {
    const payload = await fetchPayload(base + entry.slug + '/content.json');
    if (payload.salt !== libraryPayload.salt || payload.iterations !== libraryPayload.iterations) {
      throw new Error('Incompatible presentation key');
    }
    const result = await decrypt(payload, key);
    if (attempt !== generation) return;
    content = result;
    renderSlides(0);
    library.hidden = true;
    deck.hidden = false;
    presentation = new Reveal(root, {
      embedded: true, ...slideSize(), margin: 0.02,
      minScale: 0.05, maxScale: 1.2, center: false, controls: false,
      progress: true, keyboard: true, overview: false, hash: false, scrollActivationWidth: null,
      transition: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'none' : 'fade',
      transitionSpeed: 'fast'
    });
    presentation.on('slidechanged', updateControls);
    await presentation.initialize();
    if (attempt !== generation) return;
    updateControls();
    libraryLink.focus();
  } catch {
    if (attempt !== generation) return;
    clearDeck();
    renderLibrary(locale === 'zh' ? '暂时无法打开演示，请重试。' : 'Unable to open this presentation. Try again.');
    library.querySelector('h1').focus();
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!window.crypto?.subtle) {
    status.textContent = '请通过 HTTPS 在支持加密功能的浏览器中打开此页。';
    return;
  }
  const attempt = ++generation;
  const submit = form.querySelector('button');
  submit.disabled = true;
  status.textContent = '正在解密… / Decrypting…';
  const passphrase = new TextEncoder().encode(input.value);
  input.value = '';
  try {
    const payload = await fetchPayload(base + 'library.json');
    const material = await crypto.subtle.importKey('raw', passphrase, 'PBKDF2', false, ['deriveKey']);
    const unlockedKey = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: decode(payload.salt), iterations: payload.iterations, hash: 'SHA-256' },
      material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
    const unlockedEntries = await decrypt(payload, unlockedKey);
    if (generation !== attempt) return;
    key = unlockedKey;
    entries = unlockedEntries;
    libraryPayload = payload;
    gate.hidden = true;
    await showRoute();
  } catch {
    if (generation !== attempt) return;
    status.textContent = '无法解锁，请检查密码后重试。 / Unable to unlock. Check the password and try again.';
    input.focus();
  } finally {
    passphrase.fill(0);
    submit.disabled = false;
  }
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-presentation]');
  if (!key || !link || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (location.pathname !== link.pathname) history.pushState(null, '', link.pathname);
  showRoute();
});
window.addEventListener('popstate', showRoute);

previous.addEventListener('click', () => presentation?.prev());
next.addEventListener('click', () => presentation?.next());
language.addEventListener('click', () => {
  const index = presentation.getIndices().h;
  locale = locale === 'zh' ? 'en' : 'zh';
  renderSlides(index);
});
lockButton.addEventListener('click', () => {
  lock();
  input.focus();
});
fullscreen.hidden = !document.fullscreenEnabled;
fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    fullscreen.focus();
  }
});
document.addEventListener('fullscreenchange', () => {
  if (presentation) updateControls();
});
window.addEventListener('pagehide', lock);
