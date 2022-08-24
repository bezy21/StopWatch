function timeToString(time) {
  let diffInHrs = time / 3600000; // В 1 часе 3600000 миллисекунд. Разделив наше время на это число мы получим значение в часах.
  let hh = Math.floor(diffInHrs); // Округляем значение
  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);
  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);
  let formattedMM = mm.toString().padStart(2, '0');
  let formattedSS = ss.toString().padStart(2, '0');
  let formattedMS = ms.toString().padStart(2, '0');
  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}
let startTime;
let lastTime = 0;
let interval;
const value = document.querySelector('.value');
function start() {
  startTime = Date.now() - lastTime; // Текущее времмя в мс минус последнее
  interval = setInterval(() => {
    lastTime = Date.now() - startTime; // текущее время минус время старта
    value.innerHTML = timeToString(lastTime);
  }, 10);
}
const startButtons = document.body.querySelectorAll('.button--start');
const initialPanel = document.body.querySelector('.controls-initial');
const activePanel = document.body.querySelector('.controls-active');
const lapButtons = document.body.querySelector('.button--lap');
const stopButton = document.body.querySelector('.button--pause');
const pausedPanel = document.body.querySelector('.controls-paused');
const resetButton = document.body.querySelector('.button--reset');
const Table = document.querySelector('.table');

for (let startButton of startButtons) {
  startButton.addEventListener('click', start);
  startButton.addEventListener('click', function (e) {
    activePanel.classList.remove('hidden');
    initialPanel.classList.add('hidden');
    pausedPanel.classList.add('hidden');
  });
}

stopButton.addEventListener('click', function stop() {
  activePanel.classList.add('hidden');
  pausedPanel.classList.remove('hidden');
  clearInterval(interval);
});
resetButton.addEventListener('click', reset);
function reset() {
  lastTime = 0;
  value.innerHTML = timeToString(lastTime);
  Table.classList.add('hidden');

  lapArr = [];
  let tableRows = Array.from(document.querySelectorAll('.table-row')).splice(1);
  for (const row of tableRows) {
    row.remove();
  }
}

lapButtons.addEventListener('click', Circle);
function Circle() {
  Table.classList.remove('hidden');
  lapArr.push(lastTime);
  Table.insertAdjacentHTML(
    'beforeend',
    `
    <div class="table-row">
    <div class="table-cell">Круг ${lapArr.length}</div>
    <div class="table-cell">${timeToString(lastTime)}</div>
    </div>
    `,
  );
}
