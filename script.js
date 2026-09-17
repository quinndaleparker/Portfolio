// Tab switching. No edits needed here unless you add or rename tabs —
// a tab's data-panel must match the id of its <section class="panel">.

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

function show(name) {
  const target = document.getElementById(name);
  if (!target) return;

  panels.forEach(p => p.classList.toggle('is-active', p === target));
  tabs.forEach(t => {
    const on = t.dataset.panel === name;
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-selected', on);
  });

  if (history.replaceState) history.replaceState(null, '', '#' + name);
}

tabs.forEach(tab => {
  tab.setAttribute('role', 'tab');
  tab.addEventListener('click', () => show(tab.dataset.panel));
});

// Open the tab named in the URL, so links like yoursite.com/#projects work.
show(location.hash.slice(1) || 'summary');
window.addEventListener('hashchange', () => show(location.hash.slice(1) || 'summary'));
