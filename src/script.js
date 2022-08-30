let nav = 0;
let clicked = null;
let events = localStorage.getItem(`events`)
  ? JSON.parse(localStorage.getItem(`events`))
  : [];

const calendar = document.getElementById(`calendar`);
const newEventModal = document.getElementById(`newEventModal`);
const backDrop = document.getElementById(`modalBackDrop`);
const weekdays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find((e) => e.date === clicked);

  if (eventForDay) {
    console.log(`Event already exists`);
  } else {
    newEventModal.style.display = `block`;
  }
}

function load() {
  const dt = new Date();
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayInMonth = new Date(year, month, 1);
  const daysInTheMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayInMonth.toLocaleDateString(`en-ca`, {
    weekday: `long`,
    year: `numeric`,
    month: `numeric`,
    day: `numeric`,
  });

  const paddingDays = weekdays.indexOf(dateString.split(`, `)[0]);

  document.getElementById(`showMonth`).innerText = `${dt.toLocaleDateString(
    `en-ca`,
    { month: `long` }
  )} ${year}`;

  calendar.innerHTML = ``;

  for (let i = 1; i <= paddingDays + daysInTheMonth; i++) {
    const daySquare = document.createElement(`div`);
    daySquare.classList.add(`day`);

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      daySquare.addEventListener(`click`, () => console.log(`click`));
    } else {
      daySquare.classList.add(`padding`);
    }
    calendar.appendChild(daySquare);
  }
}

function inButtons() {
  document.getElementById(`nextBtn`).addEventListener(`click`, () => {
    nav++;
    load();
  });

  document.getElementById(`backBtn`).addEventListener(`click`, () => {
    nav--;
    load();
  });
}

inButtons();
load();
