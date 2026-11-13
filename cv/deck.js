'use strict';

const gate = document.querySelector('#gate');
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

function updateControls() {
  const text = labels[locale];
  const index = presentation.getIndices().h;
  document.documentElement.lang = text.lang;
  toolbar.setAttribute('aria-label', text.toolbar);
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

function lock() {
  generation++;
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  if (presentation) presentation.destroy();
  presentation = undefined;
  content = undefined;
  slides.replaceChildren();
  locale = 'zh';
  document.documentElement.lang = labels.zh.lang;
  deck.hidden = true;
  gate.hidden = false;
  status.textContent = '';
  input.value = '';
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
    const response = await fetch('./presentation.json');
    if (!response.ok) throw new Error('Presentation unavailable');
    const payload = await response.json();
    const material = await crypto.subtle.importKey('raw', passphrase, 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: decode(payload.salt), iterations: payload.iterations, hash: 'SHA-256' },
      material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decode(payload.iv) }, key, decode(payload.ciphertext));
    if (generation !== attempt) return;
    content = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(plaintext));
    renderSlides(0);
    gate.hidden = true;
    deck.hidden = false;
    presentation = new Reveal(root, {
      embedded: true, width: 1920, height: 1080, margin: 0.02,
      minScale: 0.05, maxScale: 1.2, center: false, controls: false,
      progress: true, keyboard: true, overview: false, hash: false, scrollActivationWidth: null,
      transition: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'none' : 'fade',
      transitionSpeed: 'fast'
    });
    presentation.on('slidechanged', updateControls);
    await presentation.initialize();
    if (generation !== attempt) return;
    updateControls();
    next.focus();
  } catch {
    if (generation !== attempt) return;
    lock();
    status.textContent = '无法解锁，请检查密码后重试。 / Unable to unlock. Check the password and try again.';
    input.focus();
  } finally {
    passphrase.fill(0);
    submit.disabled = false;
  }
});

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
