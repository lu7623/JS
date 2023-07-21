import { ElementCreator } from '../../utils/createElem';
import { API, CarParams } from '../../model/API';
import generateCars from '../../controller/generateCars';
import createNewCar from '../../controller/createNewCar';
import setCarColor from '../../utils/setCarColor';
import removeGarageCar from '../../controller/removeGarageCar';
import selectGarageCar from '../../controller/upgradeGarageCar';
import {
  Winner, currentGarage, currentRace, winnerList,
} from '../../model/state';
import saveWinner from '../../controller/race';
import { updateWinnersList } from '../../controller/winnersList';

function disableButton(id: number, btn1:string, btn2: string) {
  const btnA = document.querySelector(`.car${id} .${btn1}`);
  if (btnA instanceof HTMLButtonElement) btnA.disabled = true;
  const btnB = document.querySelector(`.car${id} .${btn2}`);
  if (btnB instanceof HTMLButtonElement) btnB.disabled = false;
}

async function animateElem(id: number, time: number) {
  const raceCar = document.querySelector(`.img${String(id)}`);
  if (raceCar instanceof HTMLElement) {
    disableButton(id, 'a', 'b');
    const move = new KeyframeEffect(raceCar, [{ translate: 'calc(100vw - 220px)' }], { duration: time, fill: 'forwards' });
    const animation = new Animation(move, document.timeline);
    animation.play();
    const drive = await API.driveCar(id, 'drive');
    if (drive.status === 500) {
      animation.pause();
      return 100000;
    }
  } return time;
}

export async function animate(id?: number) {
  if (id) {
    const raceParam = (await API.startEngineCar(id, 'started')).engineCar;
    if (raceParam?.distance && raceParam?.velocity) {
      const time = raceParam.distance / raceParam.velocity;
      animateElem(id, time);
    }
  }
}
export async function paginationView() {
  currentGarage.cars = await API.getAllCars();
  currentGarage.carsCount = currentGarage.cars.length;
  currentGarage.maxPage = Math.ceil(currentGarage.carsCount / 7);
  const pageNum = document.querySelector('.page-number');
  if (pageNum instanceof HTMLElement) pageNum.textContent = `${currentGarage.page + 1}`;
  const allCars = document.querySelector('.all-cars');
  if (allCars instanceof HTMLElement) allCars.textContent = ` (${currentGarage.carsCount})`;
  document.querySelector('.garage-container')?.replaceChildren();
  for (let i = currentGarage.page * 7; i < currentGarage.page * 7 + 7; i += 1) {
    if (currentGarage.cars[i]) viewGarageCar(currentGarage.cars[i]);
  }
}

export async function stopAnimate(id?: number) {
  if (id) {
    const raceCar = document.querySelector(`.img${id}`);
    if (raceCar instanceof HTMLElement) {
      raceCar.remove();
      disableButton(id, 'b', 'a');
    }
    paginationView();
  }
}

async function deleteCar(event: Event) {
  await removeGarageCar(event);
  paginationView();
}

export function viewGarageCar(param: CarParams) {
  const car = new ElementCreator({
    tag: 'div',
    className: ['car-container', `car${param.id}`],
    id: String(param.id),
    children: [
      new ElementCreator({
        tag: 'button',
        className: ['select'],
        textContent: 'Select',
        callback: (e) => selectGarageCar(e),
      }),
      new ElementCreator({
        tag: 'button',
        className: ['remove'],
        textContent: 'Remove',
        callback: (e) => deleteCar(e),
      }),
      new ElementCreator({
        tag: 'div',
        className: ['car'],
        children: [
          new ElementCreator({
            tag: 'button',
            className: ['a'],
            textContent: 'A',
            callback: () => animate(param.id),
          }),
          new ElementCreator({
            tag: 'button',
            className: ['b'],
            textContent: 'B',
            attribute: { name: 'disabled', value: '' },
            callback: () => stopAnimate(param.id),
          }),
          new ElementCreator({
            tag: 'span',
            className: ['car-name'],
            textContent: `${param.name}`,
          }),
          new ElementCreator({
            tag: 'div',
            className: ['car-trace'],
            children: [
              new ElementCreator({ tag: 'div', className: ['car-image', `img${param.id}`] }),
              new ElementCreator({ tag: 'div', className: ['flag'] }),
            ],
          }),
        ],
      }),
    ],
  });
  document.querySelector('.garage-container')?.append(car.getElement());
  const carImg = document.querySelector(`.car${param.id} .car-image`);
  if (carImg && param.id) carImg.innerHTML = setCarColor(param.id, param.color);
}

function closeWinnerWindow() {
  const winWindow = document.querySelector('.winner-window');
  document.body.addEventListener('click', () => {
    winWindow?.remove();
  });
}

export function viewWinnerWindow(winner: Winner) {
  const winWindow = new ElementCreator({
    tag: 'div',
    className: ['winner-window'],
    callback: () => closeWinnerWindow(),
    children: [
      new ElementCreator({ tag: 'p', className: ['winner-text'], textContent: `Winner is ${winner.carName}, time ${winner.time}` }),
    ],
  });
  document.body.append(winWindow.getElement());
}

export async function animateRace() {
  const buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].disabled = true;
  }
  const pageCars = await API.getAllCars({ _page: currentGarage.page + 1, _limit: 7 });
  currentRace.carsCount = pageCars.length;
  const participants = [];
  for (let i = 0; i < pageCars.length; i += 1) {
    participants.push(API.startEngineCar(Number(pageCars[i].id), 'started'));
  }
  const winners = [];
  const res = await Promise.all(participants);
  for (let i = 0; i < pageCars.length; i += 1) {
    const raceParam = res[i].engineCar;
    if (raceParam?.distance && raceParam?.velocity) {
      const time = raceParam.distance / raceParam.velocity;
      winners.push([pageCars[i].id, time]);
    }
  }
  const times = [];
  for (let i = 0; i < pageCars.length; i += 1) {
    times.push(animateElem(Number(winners[i][0]), Number(winners[i][1])));
  }
  const results = await Promise.all(times);
  const minTime = Math.min(...results);
  currentRace.winnerTime = Number((minTime / 1000).toFixed(3));
  for (let i = 0; i < pageCars.length; i += 1) {
    if (results[i] === minTime) currentRace.winner = winners[i][0];
  }
  currentRace.results = winners;
  const reset = document.querySelector('button.reset') as HTMLButtonElement;
  reset.disabled = false;
  if (currentRace.winner && currentRace.winnerTime) {
    await saveWinner(currentRace.winner, currentRace.winnerTime);
    viewWinnerWindow(winnerList[currentRace.winner]);
  }
}

export async function stopAnimateRace() {
  const pageCars = currentRace.results;
  const buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].disabled = false;
  }
  if (pageCars) {
    pageCars.forEach((car) => {
      const raceCar = document.querySelector(`.img${car[0]}`);
      if (raceCar instanceof HTMLElement) raceCar.remove();
    });
    paginationView();
  }
}

async function viewNewCar() {
  await createNewCar();
  paginationView();
  updateWinnersList();
}

async function generate() {
  await generateCars();
  paginationView();
}

const panel = new ElementCreator({
  tag: 'section',
  className: ['panel'],
  children: [
    new ElementCreator({
      tag: 'div',
      className: ['controls'],
      children: [
        new ElementCreator({
          tag: 'input',
          attribute: { name: 'type', value: 'text' },
          className: ['createName'],
        }),
        new ElementCreator({
          tag: 'input',
          attribute: { name: 'type', value: 'color' },
          className: ['createColor'],
        }),
        new ElementCreator({
          tag: 'button',
          className: ['create'],
          textContent: 'Create',
          callback: () => viewNewCar(),
        }),
        new ElementCreator({
          tag: 'input',
          attribute: { name: 'type', value: 'text' },
          className: ['upgradeName'],
        }),
        new ElementCreator({
          tag: 'input',
          attribute: { name: 'type', value: 'color' },
          className: ['upgradeColor'],
        }),
        new ElementCreator({
          tag: 'button',
          className: ['upgrade'],
          textContent: 'Upgrade',
          attribute: { name: 'disabled', value: 'true' },
        }),
      ],
    }),
    new ElementCreator({
      tag: 'div',
      className: ['btn-panel'],
      children: [
        new ElementCreator({
          tag: 'button',
          className: ['race'],
          textContent: 'Race',
          callback: () => animateRace(),
        }),
        new ElementCreator({
          tag: 'button',
          className: ['reset'],
          textContent: 'Reset',
          callback: () => stopAnimateRace(),
        }),
        new ElementCreator({
          tag: 'button',
          className: ['generate'],
          textContent: 'Generate cars',
          callback: () => generate(),
        }),
      ],
    }),
  ],
});

export function onPrev() {
  if (currentGarage.page > 0) {
    currentGarage.page -= 1;
    paginationView();
  }
}

export function onNext() {
  if (currentGarage.maxPage) {
    if (currentGarage.page < currentGarage.maxPage - 1) {
      currentGarage.page += 1;
    }
    paginationView();
  }
}

const garage = new ElementCreator({
  tag: 'section',
  className: ['garage'],
  children: [
    new ElementCreator({
      tag: 'h2',
      textContent: 'Garage',
      children: [
        new ElementCreator({ tag: 'span', className: ['all-cars'] }),
      ],
    }),
    new ElementCreator({
      tag: 'h3',
      textContent: 'Page #',
      children: [
        new ElementCreator({ tag: 'span', className: ['page-number'] }),
      ],
    }),
    new ElementCreator({ tag: 'div', className: ['garage-container'] }),
    new ElementCreator({
      tag: 'button',
      className: ['pagination'],
      textContent: 'Prev',
      callback: () => onPrev(),
    }),
    new ElementCreator({
      tag: 'button',
      className: ['pagination'],
      textContent: 'Next',
      callback: () => onNext(),
    }),
  ],
});

export async function garageView() {
  const main = document
    .querySelector('.main-container');
  main?.replaceChildren();
  main?.append(panel.getElement(), garage.getElement());
  paginationView();
}
