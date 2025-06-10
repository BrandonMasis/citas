import { getMonth, getYear, getDate, endOfMonth } from 'date-fns';

const months = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dec',
];

const today = new Date();
let actualMonth = months[getMonth(today)];
let actualYear = getYear(endOfMonth(today)) - 2000;
let endActualMonth = getDate(endOfMonth(today));

const table = document.querySelector('#datesDisplay');
const resetBtn = document.querySelector('#reset-btn');

let allAppointments = localStorage.getItem('appointments')
  ? JSON.parse(localStorage.getItem('appointments'))
  : {};
if (!localStorage.getItem('appointments')) {
  for (let i = 1; i <= endActualMonth; i++) {
    allAppointments[i] = {
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
      h: false,
      i: false,
    };
  }
}

function getMonthFromString(monthStr) {
  return months.findIndex((month) => month === monthStr);
}

function getDisplayHours(dayOfWeek) {
  return [
    '9 am',
    '2 pm',
    '5 pm',
    '9 am',
    '2 pm',
    '5 pm',
    '9 am',
    '2 pm',
    '5 pm',
  ];
}

function displayDates(end, month) {
  const table = document.querySelector('#datesDisplay');

  const actualEnd = getDate(
    endOfMonth(new Date(actualYear + 2000, getMonthFromString(month)))
  );

  const spanishDays = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  for (let i = 0; i < actualEnd; i++) {
    let row = document.createElement('tr');
    row.setAttribute('data-date', i + 1);
    row.classList.add('visible');

    const dayOfWeekIndex = new Date(
      actualYear + 2000,
      getMonthFromString(month),
      i + 1
    ).getDay();

    const capitalizedDay =
      spanishDays[dayOfWeekIndex].charAt(0).toUpperCase() +
      spanishDays[dayOfWeekIndex].slice(1);

    let title = document.createElement('th');
    title.textContent = `${capitalizedDay} ${i + 1} ${month}`;

    row.appendChild(title);
    title.addEventListener('click', () => {
      const date = `${i + 1}`;
      const rowCells = row.querySelectorAll('td');
      const shouldMark = !rowCells[0].classList.contains('marked');

      rowCells.forEach((cell) => {
        const key = cell.getAttribute('data-value');
        if (allAppointments[date]) {
          allAppointments[date][key] = shouldMark;
        }
      });

      save();
    });

    const displayHours = getDisplayHours(dayOfWeekIndex);

    for (let j = 0; j < displayHours.length; j++) {
      let cell = document.createElement('td');
      cell.textContent = displayHours[j];
      cell.setAttribute('data-value', String.fromCharCode(97 + j));

      if (
        allAppointments[`${i + 1}`] &&
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
  // Create or update the separate header table above main table
  let headerTable = document.querySelector('#headerTable');

  if (!headerTable) {
    headerTable = document.createElement('table');
    headerTable.id = 'headerTable';
    table.parentElement.insertBefore(headerTable, table);
  }

  // Clear and add header row
  headerTable.innerHTML = '';
  const headerRow = document.createElement('tr');

  headerRow.classList.add('visible');
  const dayHeader = document.createElement('th');

  dayHeader.textContent = 'Day';
  headerRow.appendChild(dayHeader);

  ['A', 'B', 'C'].forEach((name) => {
    const th = document.createElement('th');
    th.textContent = name;
    headerRow.appendChild(th);
  });

  headerTable.appendChild(headerRow);

  // Now clear the main table and display dates as usual
  table.innerHTML = '';
  displayDates(endActualMonth, actualMonth);

  const cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      const date = e.target.parentElement.getAttribute('data-date');
      const value = e.target.getAttribute('data-value');

      // Toggle only the clicked cell
      allAppointments[date][value] = !allAppointments[date][value];

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

  // Remove the 'appointments' item from local storage
  localStorage.removeItem('appointments');

  save(); // Save the changes
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
