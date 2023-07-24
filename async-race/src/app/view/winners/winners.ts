import updateWinnersList from '../../controller/winnersList';
import { API } from '../../model/API';
import { currentWinners, winnerList } from '../../model/state';
import { ElementCreator } from '../../utils/createElem';
import disablePrevNext from '../../utils/disablePrevNext';
import setCarColor from '../../utils/setCarColor';

async function viewWinnerCar(id: number) {
  const winnerCar = new ElementCreator({
    tag: 'div',
    className: ['winners-table'],
    children: [
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-number'],
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-car', `car-image${id}`],
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-name'], textContent: `${winnerList[id].carName}`,
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-wins'], textContent: `${winnerList[id].wins}`,
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-time'], textContent: `${winnerList[id].time}`,
      }),
    ],
  });
  const winTable = document.querySelector('.winners-list');
  winTable?.append(winnerCar.getElement());
  const carImg = document.querySelector(`.car-image${id}`);
  if (carImg && id) carImg.innerHTML = setCarColor(id, winnerList[id].carColor);
}

async function paginationWinView() {
  const winTable = document.querySelector('.winners-list');
  winTable?.replaceChildren();
  const winrs = await API.getWinners({ page: currentWinners.page + 1, limit: 10 });
  winrs.forEach((wnr) => viewWinnerCar(Number(wnr.id)));
  const numbers = document.querySelectorAll('.winner-number');
  for (let i = 0; i < Math.min(winrs.length + 1, 11); i += 1) {
    numbers[i].textContent = String(i);
  }
  const pageNum = document.querySelector('.page-number-winners');
  if (pageNum instanceof HTMLElement) pageNum.textContent = `${currentWinners.page + 1}`;
  if (currentWinners.maxPage) {
    if (currentWinners.page === 0) {
      disablePrevNext({ prev: true, next: false });
    } else if (currentWinners.page < currentWinners.maxPage - 1) {
      disablePrevNext({ prev: false, next: false });
    } else disablePrevNext({ prev: false, next: true });
  }
}

function winnersOnNext() {
  if (currentWinners.maxPage) {
    if (currentWinners.page < currentWinners.maxPage - 1) {
      currentWinners.page += 1;
    }
    paginationWinView();
  }
}

function winnersOnPrev() {
  if (currentWinners.page > 0) {
    currentWinners.page -= 1;
    paginationWinView();
  }
}

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
      tag: 'div',
      className: ['winners-container'],
      children: [
        new ElementCreator({
          tag: 'div',
          className: ['winners-table'],
          children: [
            new ElementCreator({
              tag: 'div', className: ['table-head', 'winner-number'],
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head', 'winner-car'], textContent: 'Car',
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head', 'winner-name'], textContent: 'Name',
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head', 'winner-wins'], textContent: 'Wins',
            }),
            new ElementCreator({
              tag: 'div', className: ['table-head', 'winner-time'], textContent: 'Best time',
            }),
          ],
        }), new ElementCreator({ tag: 'div', className: ['winners-list'] }),
      ],
    }),
    new ElementCreator({
      tag: 'button',
      className: ['prev'],
      textContent: 'Prev',
      callback: () => winnersOnPrev(),
    }),
    new ElementCreator({
      tag: 'button',
      className: ['next'],
      attribute: { name: 'disabled', value: '' },
      textContent: 'Next',
      callback: () => winnersOnNext(),
    }),
  ],
});

export default async function winnersView() {
  const main = document.querySelector('.main-container');
  main?.replaceChildren();
  main?.append(winners.getElement());

  await updateWinnersList();
  paginationWinView();
  const allWinners = document.querySelector('.all-winners');
  if (allWinners) allWinners.textContent = ` (${Object.keys(winnerList).length})`;
}
