document.querySelectorAll('[data-academic-timeline]').forEach((timeline) => {
  const cards = [...timeline.querySelectorAll('[data-milestone]')];
  const intervals = [...timeline.querySelectorAll('[data-interval]')];
  const beacon = timeline.querySelector('.academic-timeline__beacon');
  let selected = cards.find((card) => card.hasAttribute('data-initial')) || cards[0];
  let hovered;
  let focused;

  function displayMilestone() {
    const active = hovered || focused || selected;
    beacon.style.setProperty('--position', active.dataset.midpoint + '%');

    cards.forEach((card) => {
      card.classList.toggle('is-active', card === active);
      card.setAttribute('aria-pressed', String(card === selected));
    });
    intervals.forEach((interval) => {
      interval.classList.toggle('is-active', interval.dataset.interval === active.dataset.milestone);
    });
  }

  cards.forEach((card) => {
    card.disabled = false;
    card.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = card;
      displayMilestone();
    });
    card.addEventListener('pointerleave', () => {
      hovered = null;
      displayMilestone();
    });
    card.addEventListener('focus', () => {
      hovered = null;
      focused = card;
      displayMilestone();
    });
    card.addEventListener('blur', () => {
      focused = null;
      displayMilestone();
    });
    card.addEventListener('click', () => {
      hovered = null;
      selected = card;
      displayMilestone();
    });
  });

  displayMilestone();
  timeline.classList.add('is-interactive');
});

document.querySelectorAll('[data-preview-toggle]').forEach((button) => {
  const preview = button.closest('.publication-showcase__preview');
  button.hidden = false;

  button.addEventListener('click', () => {
    const playing = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(playing));
    preview.dataset.previewState = playing ? 'playing' : 'paused';
  });
});
