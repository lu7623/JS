import { state } from "./state";
import { levels } from "./state";

export function generateApp() {
  const body = document.querySelector('body');
  const main = document.createElement('main');
  body.append(main);
  main.classList.add('main-container');
  const title = document.createElement('h1');
  title.innerText = 'RSS Minesweeper';
  title.classList.add('title');
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  main.append(title);
  main.append(gameContainer);
  const levelCheck = document.createElement('div');
  levelCheck.classList.add('level-check');
  gameContainer.append(levelCheck);
  const levels = ['easy', 'medium', 'hard'];
  levels.forEach((lvl) => {
    const levelConteiner = document.createElement('div');
    levelConteiner.classList.add('level');
    const check = document.createElement('input');
    check.setAttribute('type', 'radio');
    check.id = lvl;
    check.name = 'level';
    const label = document.createElement('label');
    label.innerText = lvl;
    label.setAttribute('for', 'level');
    levelConteiner.append(check);
    levelConteiner.append(label);
    levelCheck.append(levelConteiner);
  });
  const panel = document.createElement('div');
  panel.classList.add('panel');
  const counter = document.createElement('div');
  counter.classList.add('counter');
  counter.value = state.level.bombcount;
  counter.innerText = counter.value.toString().padStart(3, '0');
  const replay = document.createElement('div');
  replay.classList.add('replay');
  const timer = document.createElement('div');
  timer.classList.add('timer');
  timer.value = 0;
  timer.innerText = timer.value.toString().padStart(3, '0');
  gameContainer.append(panel);
  panel.append(counter);
  panel.append(replay);
  panel.append(timer);
  const field = document.createElement('div');
  field.classList.add('field');
  if (state.level.height == 10)
  {field.classList.add('field-small')}
  else if (state.level.height == 15)
  {field.classList.add('field-medium')}
  else if (state.level.height == 25)
  {field.classList.add('field-large')}
  if (state.theme == 'light') {
    field.classList.add('field-light');
    panel.classList.add('panel-light');
    counter.classList.add('counter-light');
    timer.classList.add('timer-light');
    gameContainer.classList.add('game-container-light')
  } else {
    field.classList.add('field-dark');
    panel.classList.add('panel-dark');
    counter.classList.add('counter-dark');
    timer.classList.add('timer-dark');
    gameContainer.classList.add('game-container-dark');
    body.classList.add('dark');
  }
  gameContainer.append(field);
  return(field);
}
