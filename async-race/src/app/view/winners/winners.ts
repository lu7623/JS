
import { updateWinnersList } from '../../controller/winnersList';
import { API } from '../../model/API';
import { Winners, currentGarage, winnerList } from '../../model/state';
import { ElementCreator } from '../../utils/createElem';
import setCarColor from '../../utils/setCarColor';

const winners = new ElementCreator({
  tag: 'section',
  className: ['winners'],
  children: [
    new ElementCreator({
      tag: 'h2',
      textContent: 'Winners',
      children: [
        new ElementCreator({ tag: 'span', className: ['all-winners'] }),
      ],
    }),
    new ElementCreator({
      tag: 'h3',
      textContent: 'Page #',
      children: [
        new ElementCreator({ tag: 'span', className: ['page-number-winners'] }),
      ],
    }),
    new ElementCreator({
      tag: 'div', className: ['winners-container'], children: [
        new ElementCreator({
          tag: 'div', className: ['winners-table'], children: [
            new ElementCreator({
              tag: 'div', className: ['table-head', 'winner-number']
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head','winner-car'], textContent: 'Car'
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head','winner-name'], textContent: 'Name'
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head','winner-wins'], textContent: 'Wins'
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head','winner-time'], textContent: 'Best time'
            })
      ]})
    ] }),
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

async function viewWinnerCar(id: number) {
  const winnerCar = new ElementCreator({
    tag: 'div', className: ['winners-table'], children: [
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-number']
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-car', `car-image${id}`]
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-name'], textContent: `${winnerList[id].carName}`
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-wins'], textContent: `${winnerList[id].wins}`
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-time'], textContent: `${winnerList[id].time}`
      })
    ]
  });
  const winTable = document.querySelector('.winners-table');
  winTable?.append(winnerCar.getElement());
const carImg = document.querySelector( `.car-image${id}`);
  if (carImg && id) carImg.innerHTML = setCarColor(id, winnerList[id].carColor);
}


export async function winnersView() {
  const main = document.querySelector('.main-container');
  main?.replaceChildren();
  
  main?.append(winners.getElement());
  const winTable = document.querySelector('.winners-table');
  winTable?.replaceChildren();
  await updateWinnersList();
  for (let car in winnerList) {
    viewWinnerCar(Number(car));
  }
 
}
