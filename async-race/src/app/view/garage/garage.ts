import { ElementCreator } from '../../utils/createElem';
import { API, CarParams } from '../../model/API';
import generateCars from '../../controller/generateCars';
import createNewCar from '../../controller/createNewCar';
import setCarColor from '../../utils/setCarColor';
import removeGarageCar from '../../controller/removeGarageCar';
import selectGarageCar from '../../controller/upgradeGarageCar';
import { currentGarage } from '../../model/state';
import { onNext, onPrev } from '../../controller/pagination';
import {
  animate, stopAnimate, animateRace, stopAnimateRace,
} from '../../controller/race';

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
          callback: () => createNewCar(),
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
          callback: () => generateCars(),
        }),
      ],
    }),
  ],
});

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
      className: ['prev'],
      textContent: 'Prev',
      callback: () => onPrev(),
    }),
    new ElementCreator({
      tag: 'button',
      className: ['next'],
      textContent: 'Next',
      callback: () => onNext(),
    }),
  ],
});

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
        callback: (e) => removeGarageCar(e),
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

export async function paginationView() {
  currentGarage.cars = await API.getAllCars();
  currentGarage.carsCount = currentGarage.cars.length;
  currentGarage.maxPage = Math.ceil(currentGarage.carsCount / 7);
  console.log(currentGarage);
  const pageNum = document.querySelector('.page-number');
  if (pageNum instanceof HTMLElement) pageNum.textContent = `${currentGarage.page + 1}`;
  const allCars = document.querySelector('.all-cars');
  if (allCars instanceof HTMLElement) allCars.textContent = `(${currentGarage.carsCount})`;
  document.querySelector('.garage-container')?.replaceChildren();
  for (let i = currentGarage.page * 7; i < currentGarage.page * 7 + 7; i += 1) {
    if (currentGarage.cars[i]) viewGarageCar(currentGarage.cars[i]);
  }
}

export async function garageView() {
  document
    .querySelector('.main')
    ?.append(panel.getElement(), garage.getElement());
  paginationView();
}
