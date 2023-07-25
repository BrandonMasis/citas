import { getMonth, getYear, getDate, endOfMonth } from 'date-fns';

let allAppointments = {};

const months = [
  'ene.',
  'feb.',
  'mar.',
  'abr.',
  'may.',
  'jun.',
  'jul.',
  'ago.',
  'sep.',
  'oct.',
  'nov.',
  'dec.',
];

const today = new Date(2023, 6, 1);
let actualMonth = months[getMonth(today)];
let actualYear = getYear(endOfMonth(today)) - 2000;
let endActualMonth = getDate(endOfMonth(today));

const table = document.querySelector('#datesDisplay');
const resetBtn = document.querySelector('#reset-btn');

if (localStorage.getItem('appointments') == null) {
  allAppointments = {
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
} else {
  allAppointments = JSON.parse(localStorage.getItem('appointments'));
}

function displayDates(end, month) {
  for (let i = 0; i < end; i++) {
    let row = document.createElement('tr');
    row.setAttribute('data-date', i + 1);
    row.classList.add('visible');
    let title = document.createElement('th');
    title.textContent = `${i + 1} ${actualMonth} ${actualYear}`;

    row.appendChild(title);

    for (let j = 1; j <= 4; j++) {
      let cell = document.createElement('td');
      switch (j) {
        case 1:
          cell.textContent = '9:00am';
          cell.setAttribute('data-value', 'a');
          break;
        case 2:
          cell.textContent = '9:00am';
          cell.setAttribute('data-value', 'b');
          break;
        case 3:
          cell.textContent = '2:00pm';
          cell.setAttribute('data-value', 'c');
          break;
        case 4:
          cell.textContent = '2:00pm';
          cell.setAttribute('data-value', 'd');
          break;
      }

      if (
        allAppointments[`${i + 1}`][`${cell.getAttribute('data-value')}`] ===
        true
      ) {
        cell.classList.add('marked');
      } else {
        cell.classList.remove('marked');
      }

      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function display() {
  table.innerHTML = '';
  displayDates(endActualMonth, actualMonth);

  const cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      console.log(e.target.parentElement.getAttribute('data-date'));
      console.log(e.target.getAttribute('data-value'));

      let cellInObject =
        allAppointments[`${e.target.parentElement.getAttribute('data-date')}`][
          `${e.target.getAttribute('data-value')}`
        ];

      if (cellInObject === true) {
        allAppointments[`${e.target.parentElement.getAttribute('data-date')}`][
          `${e.target.getAttribute('data-value')}`
        ] = false;
      } else {
        allAppointments[`${e.target.parentElement.getAttribute('data-date')}`][
          `${e.target.getAttribute('data-value')}`
        ] = true;
      }

      save();
    });
  });

  const dates = document.querySelectorAll('th');
  dates.forEach((date) => {
    date.addEventListener('click', (e) => {
      const dateObj =
        allAppointments[e.target.parentElement.getAttribute('data-date')];

      let counter = 0;

      Object.keys(dateObj).forEach((v) => {
        if (dateObj[v] === true) {
          counter += 1;
        } else {
          counter += 0;
        }
      });

      if (counter === 4) {
        Object.keys(dateObj).forEach((v) => (dateObj[v] = false));
      } else {
        Object.keys(dateObj).forEach((v) => (dateObj[v] = true));
      }

      save();
    });
  });
}

function reset() {
  Object.keys(allAppointments).forEach((date) => {
    Object.keys(allAppointments[date]).forEach((v) => {
      allAppointments[date][v] = false;
    });
  });

  save();
}

resetBtn.addEventListener('click', reset);

function save() {
  localStorage.setItem('appointments', JSON.stringify(allAppointments));
  display();
}

display();

const previousMonthBtn = document.querySelector('#previous-month');
const nextMonthBtn = document.querySelector('#next-month');

previousMonthBtn.addEventListener('click', () => {
  today.setMonth(today.getMonth() - 1);
  updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  today.setMonth(today.getMonth() + 1);
  updateCalendar();
});

function updateCalendar() {
  const newMonth = months[getMonth(today)];
  const newYear = getYear(endOfMonth(today)) - 2000;
  const newEndMonth = getDate(endOfMonth(today));

  actualMonth = newMonth;
  actualYear = newYear;
  endActualMonth = newEndMonth;

  display();
  saveState();
}

function saveState() {
  const state = {
    month: actualMonth,
    year: actualYear,
  };

  localStorage.setItem('calendarState', JSON.stringify(state));
}

function restoreState() {
  const stateString = localStorage.getItem('calendarState');

  if (stateString) {
    const state = JSON.parse(stateString);
    actualMonth = state.month;
    actualYear = state.year;
    display(); // Display the calendar with the restored state
  } else {
    // Set initial state if no saved state exists
    const todayMonth = months[getMonth(today)];
    const todayYear = getYear(endOfMonth(today)) - 2000;
    actualMonth = todayMonth;
    actualYear = todayYear;
    display(); // Display the calendar with the initial state
  }
}

restoreState(); // Restore the state of the calendar on page load
