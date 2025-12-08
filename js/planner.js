const EVENT_OPTIONS = [
  "Visit CN TOWER",
  "Dinner in Restaurant 360",
  "Visit Harbourfront"
];

const events = [];

document.addEventListener('DOMContentLoaded', () => {
  const dayCells = document.querySelectorAll('.day-cell');

  dayCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const day = cell.dataset.day;
      const month = cell.dataset.month;

      const choice = prompt(
        `Choose an event for ${month} ${day}:\n` +
        `1) ${EVENT_OPTIONS[0]}\n` +
        `2) ${EVENT_OPTIONS[1]}\n` +
        `3) ${EVENT_OPTIONS[2]}\n\n` +
        `Enter 1, 2 or 3:`
      );

      if (!choice) {
        return; 
      }

      const index = parseInt(choice, 10) - 1;

      if (Number.isNaN(index) || index < 0 || index >= EVENT_OPTIONS.length) {
        alert("Invalid option. Event not saved.");
        return;
      }

      const description = EVENT_OPTIONS[index];

      events.push({ month, day, description });

      cell.classList.add('event-day');

      renderEvents();
    });
  });
});

function renderEvents() {
  const list = document.getElementById('events-list');
  list.innerHTML = '';

  events.forEach(ev => {
    const li = document.createElement('li');
    li.textContent = `${ev.month} ${ev.day}: ${ev.description}`;
    list.appendChild(li);
  });
}
