const allAppointments = {
  1: { a: false, b: false, c: false, d: false },
  2: { a: false, b: false, c: false, d: false },
  3: { a: false, b: false, c: false, d: false },
  4: { a: false, b: false, c: false, d: false },
  5: { a: false, b: false, c: false, d: false },
  6: { a: false, b: false, c: false, d: false },
  7: { a: false, b: false, c: false, d: false },
  8: { a: false, b: false, c: false, d: false },
  9: { a: false, b: false, c: false, d: false },
  10: { a: false, b: false, c: false, d: false },
  11: { a: false, b: false, c: false, d: false },
  12: { a: false, b: false, c: false, d: false },
  13: { a: false, b: false, c: false, d: false },
  14: { a: false, b: false, c: false, d: false },
  15: { a: false, b: false, c: false, d: false },
  16: { a: false, b: false, c: false, d: false },
  17: { a: false, b: false, c: false, d: false },
  18: { a: false, b: false, c: false, d: false },
  19: { a: false, b: false, c: false, d: false },
  20: { a: false, b: false, c: false, d: false },
  21: { a: false, b: false, c: false, d: false },
  22: { a: false, b: false, c: false, d: false },
  23: { a: false, b: false, c: false, d: false },
  24: { a: false, b: false, c: false, d: false },
  25: { a: false, b: false, c: false, d: false },
  26: { a: false, b: false, c: false, d: false },
  27: { a: false, b: false, c: false, d: false },
  28: { a: false, b: false, c: false, d: false },
  29: { a: false, b: false, c: false, d: false },
  30: { a: false, b: false, c: false, d: false },
  31: { a: false, b: false, c: false, d: false },
};

const months = [
  'ene.',
  'feb.',
  'mar.',
  'abr.',
  'mayo.',
  'jun.',
  'jul.',
  'oct.',
  'nov.',
  'dec.',
];

let today = new Date('2001-03-25');

const actualMonth = months[dateFns.getMonth(today)];
const actualYear = dateFns.getYear(dateFns.endOfMonth(today)) - 2000;
const endOfMonth = dateFns.getDate(dateFns.endOfMonth(today));

const spaces = document.querySelectorAll('td');

spaces.forEach((space) => {
  space.addEventListener('click', (e) => {
    console.log(e.target.getAttribute('data-value'));
    console.log(e.target.parentElement.getAttribute('data-date'));
  });
});

const table = document.querySelector('#datesDisplay');

function displayDates(end, month) {
  for (let i = 0; i < end; i++) {
    let row = document.createElement('tr');
    row.setAttribute('data-date', i);
    row.classList.add('visible');
    let title = document.createElement('th');
    title.textContent = `${i + 1} ${actualMonth} ${actualYear}`;
    row.appendChild(title);
    for (let j = 0; j < 4; j++) {
      let cell = document.createElement('td');
      if (j < 2) {
        cell.textContent = '9:00am';
      } else {
        cell.textContent = '1:00pm';
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

displayDates(endOfMonth, actualMonth);
