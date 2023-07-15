import { ElementCreator } from '../../utils/createElem';
import { API, CarParams } from '../../model/API';
import generateCars from '../../controller/generateCars';
import createNewCar from '../../controller/createNewCar';
import setCarColor from '../../utils/setCarColor';
import removeGarageCar from '../../controller/removeGarageCar';
import selectGarageCar from '../../controller/upgradeGarageCar';

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
        }),
        new ElementCreator({
          tag: 'button',
          className: ['reset'],
          textContent: 'Reset',
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
    new ElementCreator({ tag: 'h2', textContent: 'Garage' }),
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
    }),
    new ElementCreator({
      tag: 'button',
      className: ['next'],
      textContent: 'Next',
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
          }),
          new ElementCreator({
            tag: 'button',
            className: ['b'],
            textContent: 'B',
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
              new ElementCreator({ tag: 'div', className: ['car-image'] }),
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

export default async function garageView() {
  document
    .querySelector('.main')
    ?.append(panel.getElement(), garage.getElement());
  const currentGarage = await API.getAllCars();
  currentGarage.forEach((car) => viewGarageCar(car));
}
