const numpad = document.getElementById('numpad') as HTMLDivElement;
const questOutput = document.getElementById('quest') as HTMLHeadingElement;
const enteredOutput = document.getElementById('entered') as HTMLHeadingElement;
const startButton = document.getElementById('start') as HTMLButtonElement;
const printButton = document.getElementById('print') as HTMLButtonElement;

const quests = 5;

let running = false;
let startTime = 0;
const quest: number[] = [];
const entered: number[] = [];

const questHistory: {
  correct: boolean;
  quest: string;
  entered: string;
  duration: number;
}[] = [];

const runs: {
  hand: boolean;
  total: number;
  per: number;
  now: number;
  history: typeof questHistory;
}[] = [];

const buttons = new Array(9).fill(0).map((_, i) => {
  const button = document.createElement('button');
  button.classList.add('clickable');
  button.innerText = `${i + 1}`;
  button.disabled = true;
  button.addEventListener('click', () => {
    entered.push(i + 1);
    console.error('clicked', i + 1);
    renderEntered();
  });

  numpad.appendChild(button);

  return button;
});

function stop() {
  const accuracy =
    questHistory.reduce((a, q) => a + (q.correct ? 1 : 0), 0) /
    questHistory.length;
  console.log('Done', accuracy, JSON.stringify(questHistory, undefined, 2));
  const history = questHistory.splice(0);
  const total = history.reduce((a, c) => a + c.duration, 0);
  runs.push({
    hand: window.prediction,
    history,
    total,
    per: total / history.length,
    now: Date.now()
  });
  startButton.innerText = 'Start';
  quest.splice(0);
  entered.splice(0);
  running = false;
  buttons.forEach((b) => (b.disabled = true));

  renderEntered();
}

function reset() {
  if (questHistory.length >= quests) {
    stop();
    return;
  }
  running = true;
  buttons.forEach((b) => (b.disabled = false));
  startButton.innerText = 'Stop';

  startTime = Date.now();
  quest.splice(0);
  entered.splice(0);

  quest.push(
    ...new Array(4).fill(0).map(() => Math.floor(Math.random() * 9) + 1)
  );

  renderEntered();
}

function renderDigits(numbers: number[], output: HTMLDivElement) {
  const digits = [
    ...numbers.map((d) => d.toString()),
    ...new Array(4 - numbers.length).fill('_')
  ];

  output.innerHTML = '';
  const ps = digits.map((d) => {
    const p = document.createElement('p');
    p.innerText = d;
    return p;
  });

  output.append(...ps);
  return ps;
}

function renderEntered() {
  if (entered.length > 4) {
    const last = entered.pop()!!;
    entered.splice(0);
    entered.push(last);
  }
  renderDigits(quest, questOutput);
  const ps = renderDigits(entered, enteredOutput);

  if (entered.length === 4) {
    // console.log('entered: ', string);
    let fullyCorrect = true;
    ps.forEach((p, i) => {
      const isCorrect = entered[i] === quest[i];
      p.style.color = isCorrect ? 'green' : 'red';
      if (!isCorrect) {
        fullyCorrect = false;
      }
    });
    const historyEntry = {
      correct: fullyCorrect,
      entered: entered.join(''),
      quest: quest.join(''),
      duration: Date.now() - startTime
    };
    console.log(historyEntry);
    questHistory.push(historyEntry);
    setTimeout(reset, 1000);
  }
}

startButton.addEventListener('click', () => {
  running ? stop() : reset();
});

printButton.addEventListener('click', () => {
  const j = document.createElement('a');
  j.download = 'result_' + Date.now() + '.json';
  j.href = URL.createObjectURL(new Blob([JSON.stringify(runs, null, 2)]));
  j.click();
});
renderEntered();
