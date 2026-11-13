(() => {
  const map = document.querySelector('[data-port-impact]');
  if (!map) return;

  const choices = [...map.querySelectorAll('[data-port]')];
  const records = [...map.querySelectorAll('[data-port-record]')];
  const show = (port) => {
    for (const record of records) {
      record.hidden = record.dataset.portRecord !== port;
    }
    for (const choice of choices) {
      if (choice.dataset.port === port) choice.setAttribute('aria-current', 'true');
      else choice.removeAttribute('aria-current');
    }
  };
  const fromHash = () => records.find((record) => '#' + record.id === location.hash);
  const initial = fromHash();
  show((initial || records[0]).dataset.portRecord);

  map.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-port]');
    if (!choice || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    show(choice.dataset.port);
    history.replaceState(null, '', choice.getAttribute('href'));
  });

  window.addEventListener('hashchange', () => {
    const record = fromHash();
    if (record) show(record.dataset.portRecord);
  });
})();
