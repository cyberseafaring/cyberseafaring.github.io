(() => {
  function activatePortImpactMap(map, { port, syncHash = false } = {}) {
    const choices = [...map.querySelectorAll('[data-port]')];
    const records = [...map.querySelectorAll('[data-port-record]')];
    if (!records.length) return;

    const show = (id) => {
      for (const record of records) record.hidden = record.dataset.portRecord !== id;
      for (const choice of choices) {
        if (choice.dataset.port === id) choice.setAttribute('aria-current', 'true');
        else choice.removeAttribute('aria-current');
      }
    };
    const fromHash = () => records.find((record) => '#' + record.id === location.hash);
    const initial = (syncHash && fromHash()) || records.find((record) => record.dataset.portRecord === port) || records[0];
    show(initial.dataset.portRecord);

    map.addEventListener('click', (event) => {
      const choice = event.target.closest('[data-port]');
      if (!choice || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(choice.dataset.port);
      if (syncHash) history.replaceState(null, '', choice.getAttribute('href'));
    });

    if (syncHash) {
      window.addEventListener('hashchange', () => {
        const record = fromHash();
        if (record) show(record.dataset.portRecord);
      });
    }
  }

  window.activatePortImpactMap = activatePortImpactMap;
  const homeMap = document.querySelector('[data-port-impact]');
  if (homeMap) activatePortImpactMap(homeMap, { syncHash: true });
})();
