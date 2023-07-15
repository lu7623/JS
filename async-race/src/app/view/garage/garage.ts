import { ElementCreator } from '../../utils/createElem';
import { API, CarParams } from '../../model/API';
import generateCars from '../../controller/generateCars';
import createNewCar from '../../controller/createNewCar';

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
            callback: () => createNewCar()
        }),
        new ElementCreator({
          tag: 'input',
          attribute: { name: 'type', value: 'text' },
        }),
        new ElementCreator({
          tag: 'input',
          attribute: { name: 'type', value: 'color' },
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
            callback: () => generateCars()
        }),
      ],
    }),
  ],
});

const setCarColor = (id: number, color: string) => {
  const carImg = `<svg class="car-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150">
      <defs>
          <style>
              .cls-1,
              .cls-3 {
                  fill: #000000;
              }
  
              .cls-1,
              .cls-4,
              .cls-5,
              .cls-6 {
                  fill-rule: evenodd;
              }
  
              .cls-2,
              .cls-4 {
                  fill: #fff7e5;
              }
  
              .cls-5${id} {
                  fill:${color};
              }
  
              .cls-6 {
                  fill: #f5dec5;
              }
          </style>
      </defs>
      <g id="Слой_2" data-name="Слой 2">
          <g id="Objects">
              <path class="cls-1"
                  d="M377.51,74.36a24.8,24.8,0,1,1-38,11.14,31.63,31.63,0,0,1,3.78-5.25C350,72.74,368.81,72,377.51,74.36Z" />
              <circle class="cls-2" cx="362.72" cy="94.28" r="18.08"
                  transform="translate(-8.47 145.98) rotate(-22.5)" />
              <circle class="cls-3" cx="362.72" cy="94.28" r="13.16"
                  transform="translate(-8.47 145.98) rotate(-22.5)" />
              <path class="cls-4"
                  d="M362.72,82.66A11.61,11.61,0,0,1,373,88.81a16,16,0,0,0-20.52,0A11.63,11.63,0,0,1,362.72,82.66Z" />
              <path class="cls-4"
                  d="M362.72,104a8.13,8.13,0,0,1-7.23-4.72,10.58,10.58,0,0,0,14.47,0A8.14,8.14,0,0,1,362.72,104Z" />
              <path class="cls-4"
                  d="M362.72,86A8.25,8.25,0,0,1,370,90.4a11.36,11.36,0,0,0-14.56,0A8.25,8.25,0,0,1,362.72,86Z" />
              <path class="cls-4"
                  d="M362.72,101.36A5.77,5.77,0,0,1,357.59,98a7.5,7.5,0,0,0,10.26,0A5.77,5.77,0,0,1,362.72,101.36Z" />
              <path class="cls-4"
                  d="M362.72,88.81a5.48,5.48,0,0,1,4.83,2.9,7.53,7.53,0,0,0-9.65,0A5.47,5.47,0,0,1,362.72,88.81Z" />
              <path class="cls-4"
                  d="M362.72,99.23a3.82,3.82,0,0,1-3.4-2.23,5,5,0,0,0,6.8,0A3.8,3.8,0,0,1,362.72,99.23Z" />
              <path class="cls-4"
                  d="M362.72,91.66a2.62,2.62,0,0,0-2.61,2.62v.18a8.32,8.32,0,0,0,5.22,0,1.09,1.09,0,0,0,0-.18A2.62,2.62,0,0,0,362.72,91.66Z" />
              <path class="cls-5${id}"
                  d="M399.4,53.05c-2.29-15.52-8.59-23.71-29.11-24.15-14.7-.31-61.86,0-88.28.27-6.21-8.79-16-19.32-24.54-24.6S174.79-1.93,142,3.68,41.05,40.32,23.16,71.16c-19.32,18.72-10.45,30,12.64,31.19,4.71.25,18.51.49,37.73.7a28.43,28.43,0,1,1,53.77.48c75.85.55,174.63.91,202,1,2-11.41,5.43-20.23,11.13-26.6,8.53-9.55,34.13-9.56,42-5.74,6.22,3,8.23,9.36,9.73,17.76h.19a17.92,17.92,0,0,0,6.27-.44c3.33-1,2.82-7.35,2.48-15.41-.17-4.08,6-4.08,6-8.17C407.13,60,408.79,54.72,399.4,53.05Z" />
              <path class="cls-1"
                  d="M401.22,75.47c3.58-.06,13.43-.06,15.74,2.5s1.6,4.67.06,5.57-1,4.22-.77,5.63a67.35,67.35,0,0,1,1,6.91c.13,2.56-3.32,6.21-8.89,5.44s-8.77-2-11.07-4.93-4.48-5.44-2.05-6.78,5.5-.9,5.82-3.07A55.06,55.06,0,0,0,401.22,75.47Z" />
              <path class="cls-4"
                  d="M399.4,53.05C348.5,45,229.07,54.36,223,84.21,229.15,55.45,356.27,49.73,399.4,53.05Z" />
              <path class="cls-6"
                  d="M156.93,79.23C148.75,26.1,36,62.06,23.16,71.16,34.89,63.83,147,29.08,156.93,79.23Z" />
              <path class="cls-4"
                  d="M333.28,84.42H228.59a1.27,1.27,0,0,0-1.72,1.33h0a1.65,1.65,0,0,0,1.72,1.66H333.28A1.65,1.65,0,0,0,335,85.76h0A1.27,1.27,0,0,0,333.28,84.42Z" />
              <path class="cls-4"
                  d="M384.21,33c-49.33-.14-312.86,1.12-359.89,36.3C70.57,31.91,313.15,30.36,384.21,33Z" />
              <path class="cls-4"
                  d="M403.65,76.11c2.36-.17,9.34.2,11.77,1.28s2.05,2.18.26,2.82-12,.64-9.54.83,4.16.77,3.78,2.24-5.63,2.11-2.37,2.18,8.13,2.75,7,4.86-7.23,2.82-11.65,2.75-8.44.38-7.36-1.28,6.64-1.88,8.07-2.37c1.68-.57,3.13-2.3.76-2.88s-3.64-1.15-2-2.17,2.82-1.35,1.34-2.43-1.79-3.27-.57-3.84S401.64,76.26,403.65,76.11Z" />
              <path class="cls-4"
                  d="M238.39,102.42H145.92a9.81,9.81,0,0,0,3-2h87.29a.73.73,0,0,0,.24.6A10,10,0,0,0,238.39,102.42Z" />
              <path class="cls-4"
                  d="M253.31,7.84c4.84.85,7.6,2.17,11.88,6.94s7.62,8.14,10.41,11.72.39,7-5.72,6.8-78.15.86-82.78.87-4.27-4-4.28-7.56.32-13.75.5-15.94.36-4.19,8.32-4.42S243.7,6.15,253.31,7.84Z" />
              <path class="cls-4"
                  d="M119.64,20c-16.14,7.18-18.36,21.44,4.13,17.91,6.65-1,45.73-3.63,50.36-3.64s4.24-4,4.23-7.59-.41-13.75-.61-15.95S173.51,7.76,169.23,8C160.58,8.47,129.66,15.5,119.64,20Z" />
              <path class="cls-4"
                  d="M258.65,5.66c-81.08-4.59-133-2.26-163.06,26.1C115.18,4,185.71-2.61,258.65,5.66Z" />
              <path class="cls-4"
                  d="M180.35,44.23c0,3.33,13.37,1.75,13.37,0S180.35,40.83,180.35,44.23Z" />
              <path class="cls-1"
                  d="M100.5,68.64A25.37,25.37,0,1,1,75.13,94,25.37,25.37,0,0,1,100.5,68.64Z" />
              <circle class="cls-2" cx="100.5" cy="94.01" r="18.49"
                  transform="translate(-28.33 45.61) rotate(-22.5)" />
              <path class="cls-1"
                  d="M100.5,80.55A13.46,13.46,0,1,1,87,94,13.46,13.46,0,0,1,100.5,80.55Z" />
              <path class="cls-4"
                  d="M100.5,82.12A11.88,11.88,0,0,1,111,88.42a16.36,16.36,0,0,0-21,0A11.89,11.89,0,0,1,100.5,82.12Z" />
              <path class="cls-4"
                  d="M100.5,103.9a8.3,8.3,0,0,1-7.4-4.83,10.82,10.82,0,0,0,14.79,0A8.3,8.3,0,0,1,100.5,103.9Z" />
              <path class="cls-4"
                  d="M100.5,85.58a8.43,8.43,0,0,1,7.44,4.47,11.58,11.58,0,0,0-14.89,0A8.43,8.43,0,0,1,100.5,85.58Z" />
              <path class="cls-4"
                  d="M100.5,101.25a5.91,5.91,0,0,1-5.25-3.43,7.68,7.68,0,0,0,10.49,0A5.89,5.89,0,0,1,100.5,101.25Z" />
              <path class="cls-4"
                  d="M100.5,88.42a5.59,5.59,0,0,1,4.93,3,7.7,7.7,0,0,0-9.87,0A5.6,5.6,0,0,1,100.5,88.42Z" />
              <path class="cls-4"
                  d="M100.5,99.07A3.9,3.9,0,0,1,97,96.79a5.08,5.08,0,0,0,7,0A3.92,3.92,0,0,1,100.5,99.07Z" />
              <path class="cls-4"
                  d="M100.5,91.34A2.67,2.67,0,0,0,97.82,94a1.21,1.21,0,0,0,0,.19,8.7,8.7,0,0,0,5.34,0V94A2.67,2.67,0,0,0,100.5,91.34Z" />
              <path class="cls-1"
                  d="M27.55,88.12c2-.17,3.57,0,4,1.7s-2.5,6.24-5.8,8.21S13.45,99.73,8.9,99.55s-6.16-2.14-6.16-5.8S3.9,88,2.57,86.88-.91,84.56.42,83s3.31-3.93,6.25-4.37c2.68-.41,6.54-.82,10.78-1.15h0a26.2,26.2,0,0,0-4.6,9.06C12.34,88.41,23.27,88,27.55,88.12Z" />
              <path class="cls-4"
                  d="M29.27,88.73c1.53.45.87,1.71-.47,1.54s-17.58-.09-20.43,0S3.1,89.2,5.24,87.68s5.36-4.55,2.68-4.46S0,84.38,1.49,82.77s2.77-3.48,7.41-3.93,5.71-.71,4.64,1.43-3.38,4.79-2.14,6.25c1.06,1.26,1.72,2.3,11.53,2A37.68,37.68,0,0,1,29.27,88.73Z" />
              <path class="cls-4"
                  d="M153,84.42H128.73a13.79,13.79,0,0,1,1,3H153a1.65,1.65,0,0,0,1.72-1.67h0A1.72,1.72,0,0,0,153,84Zm-82.42,0H35.12a1.27,1.27,0,0,0-1.71,1.33h0a1.65,1.65,0,0,0,1.71,1.67H69.67A13.79,13.79,0,0,1,70.62,84.42Z" />
              <path class="cls-4"
                  d="M128.83,102.23l11.34.08c6.13,0,11-2.64,14.51-16.48h0a1.76,1.76,0,0,1-1.32.59H129.5a27.77,27.77,0,0,1-.67,15.81Z" />
              <path class="cls-1" d="M129.85,88l17.71-.57H129.73Z" />
              <path class="cls-1"
                  d="M130.21,90.94l16.39-.52H130.16C130.18,90.6,130.2,90.77,130.21,90.94Z" />
              <path class="cls-1"
                  d="M130.33,93.85l13.45-.43H130.34C130.33,93.57,130.33,93.71,130.33,93.85Z" />
              <path class="cls-1"
                  d="M130.06,97.77l11.06-.35h-11C130.09,97.54,130.08,97.66,130.06,97.77Z" />
              <path class="cls-1" d="M129.49,100.68l8.18-.26h-8.12Z" />
              <path class="cls-6"
                  d="M271.22,23.17c1.19,1.32,2.34,2.67,3.44,4.07a3.13,3.13,0,0,1,.81,2.71c-.61,1.92-3.94,2.2-5.56,2.16s-3.39,0-5.07,0c-3.19,0-6.39,0-9.58.07q-13.35.12-26.69.3l-27.2.35c-4.75.06-9.52.15-14.27.17a2.87,2.87,0,0,1-2.33-.82c-.93-1.19-.75-4.09-.76-5.55,0-2.5.08-5,.15-7.52l.09-2.56q3.57-.78,7.25-1.41C222.1,9.88,251.09,13.41,271.22,23.17Z" />
              <path class="cls-4"
                  d="M176.94,18.28l0,.83c.09,2.5.19,5,.2,7.52,0,.33,0,.66,0,1,0,1.27.08,3.52-.73,4.56a2.84,2.84,0,0,1-2.33.84c-1.13,0-2.28.08-3.41.13-2,.1-4,.21-6,.33q-8.08.48-16.17,1.06-5.67.39-11.32.84A137.54,137.54,0,0,1,176.94,18.28Z" />
          </g>
      </g>
  </svg>`;
  return carImg;
};

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
    children: [
      new ElementCreator({
        tag: 'button',
        className: ['select'],
        textContent: 'Select',
      }),
      new ElementCreator({
        tag: 'button',
        className: ['upgrade'],
        textContent: 'Upgrade',
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
