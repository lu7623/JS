import { updateWinnersList } from '../../controller/controller';
import { API, Options, WinnerParams } from '../../model/API';
import {
  Winner, currentWinners, winnerList,
} from '../../model/state';
import { ElementCreator } from '../../utils/createElem';
import { paginationBtns } from '../../utils/disablePrevNext';
import setCarColor from '../../utils/setCarColor';

export async function viewWinnerCar(id: number, wnr: Winner) {
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
        tag: 'div', className: ['table-line', 'winner-name'], textContent: `${wnr.carName}`,
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-wins'], textContent: `${wnr.wins}`,
      }),
      new ElementCreator({
        tag: 'div', className: ['table-line', 'winner-time'], textContent: `${wnr.time}`,
      }),
    ],
  });
  const winTable = document.querySelector('.winners-list');
  winTable?.append(winnerCar.getElement());
  const carImg = document.querySelector(`.car-image${id}`);
  if (carImg && id) carImg.innerHTML = setCarColor(id, wnr.carColor);
}

export const viewWinPage = (winrs: WinnerParams[]) => {
  const winTable = document.querySelector('.winners-list');
  winTable?.replaceChildren();
  winrs.forEach((wnr) => viewWinnerCar(Number(wnr.id), winnerList[Number(wnr.id)]));
  const numbers = document.querySelectorAll('.winner-number');
  for (let i = 0; i < Math.min(winrs.length + 1, 11); i += 1) {
    numbers[i].textContent = String(i);
  }
  const pageNum = document.querySelector('.page-number-winners');
  if (pageNum instanceof HTMLElement) pageNum.textContent = `${currentWinners.page + 1}`;
  if (currentWinners.maxPage) paginationBtns({ maxPage: currentWinners.maxPage, currentPage: currentWinners.page }, 'winners');
};

export const sortByParams = async (params:Options) => {
  currentWinners.page = 0;
  currentWinners.sortParams = params;
  return API.getWinners(params);
};

export async function sortByWinsASC() {
  const winrs = await sortByParams({
    page: currentWinners.page + 1, limit: 10, sort: 'wins', order: 'ASC',
  });
  viewWinPage(winrs);
}

async function sortByWinsDESC() {
  const winrs = await sortByParams({
    page: currentWinners.page + 1, limit: 10, sort: 'wins', order: 'DESC',
  });
  viewWinPage(winrs);
}

async function sortByTimeASC() {
  const winrs = await sortByParams({
    page: currentWinners.page + 1, limit: 10, sort: 'time', order: 'ASC',
  });
  viewWinPage(winrs);
}

async function sortByTimeDESC() {
  const winrs = await sortByParams({
    page: currentWinners.page + 1, limit: 10, sort: 'time', order: 'DESC',
  });
  viewWinPage(winrs);
}

export async function paginationWinView() {
  if (currentWinners.sortParams) {
    const winrs = await API.getWinners(currentWinners.sortParams);
    viewWinPage(winrs);
  } else {
    const winrs = await API.getWinners({ page: currentWinners.page + 1, limit: 10 });
    viewWinPage(winrs);
  }
}

async function winnersOnNext() {
  if (currentWinners.maxPage) {
    if (currentWinners.page < currentWinners.maxPage - 1) {
      currentWinners.page += 1;
      if (currentWinners.sortParams?.page) currentWinners.sortParams.page += 1;
    }
    await paginationWinView();
  }
}

async function winnersOnPrev() {
  if (currentWinners.page > 0) {
    currentWinners.page -= 1;
    if (currentWinners.sortParams?.page) currentWinners.sortParams.page -= 1;
    await paginationWinView();
  }
}

const winners = new ElementCreator({
  tag: 'section',
  className: ['winners', 'hidden'],
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
              tag: 'div',
              className: ['table-head', 'winner-wins'],
              textContent: 'Wins',
              children: [
                new ElementCreator({ tag: 'button', className: ['arrow-up', 'wins-asc'], callback: () => sortByWinsASC() }),
                new ElementCreator({ tag: 'button', className: ['arrow-down', 'wins-desc'], callback: () => sortByWinsDESC() }),
              ],
            }),
            new ElementCreator({
              tag: 'div',
              className: ['table-head', 'winner-time'],
              textContent: 'Best time',
              children: [
                new ElementCreator({ tag: 'button', className: ['arrow-up', 'time-asc'], callback: () => sortByTimeASC() }),
                new ElementCreator({ tag: 'button', className: ['arrow-down', 'time-desc'], callback: () => sortByTimeDESC() }),
              ],
            }),
          ],
        }), new ElementCreator({ tag: 'div', className: ['winners-list'] }),
      ],
    }),
    new ElementCreator({
      tag: 'button',
      className: ['prev-winners'],
      attribute: { name: 'disabled', value: '' },
      textContent: 'Prev',
      callback: () => winnersOnPrev(),
    }),
    new ElementCreator({
      tag: 'button',
      className: ['next-winners'],
      textContent: 'Next',
      callback: () => winnersOnNext(),
    }),
  ],
});

export async function winnersView() {
  const main = document.querySelector('.main-container');
  main?.append(winners.getElement());
  await updateWinnersList();
  const allWinners = document.querySelector('.all-winners');
  if (allWinners) allWinners.textContent = ` (${Object.keys(winnerList).length})`;
}
