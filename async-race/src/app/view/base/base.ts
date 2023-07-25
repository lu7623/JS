import { ElementCreator } from '../../utils/createElem';
import { paginationWinView } from '../winners/winners';

function garageVisible() {
  document.querySelector('.garage')?.classList.remove('hidden');
  document.querySelector('.panel')?.classList.remove('hidden');
  document.querySelector('.winners')?.classList.add('hidden');
}

function winnersVisible() {
  document.querySelector('.garage')?.classList.add('hidden');
  document.querySelector('.panel')?.classList.add('hidden');
  document.querySelector('.winners')?.classList.remove('hidden');
  paginationWinView();
}

const header = new ElementCreator({
  tag: 'header',
  className: ['header'],
  children: [
    new ElementCreator({ tag: 'h1', textContent: 'Retro async race' }),
  ],
});

const main = new ElementCreator({
  tag: 'main',
  className: ['main'],
  children: [
    new ElementCreator({
      tag: 'div',
      className: ['navigation'],
      children: [
        new ElementCreator({
          tag: 'button', className: ['toGarage', 'nav-btn'], textContent: 'Garage', callback: () => garageVisible(),
        }),
        new ElementCreator({
          tag: 'button', className: ['toWinners', 'nav-btn'], textContent: 'Winners', callback: () => winnersVisible(),
        }),
        new ElementCreator({ tag: 'article', className: ['main-container'] })],
    }),
  ],
});

const footer = new ElementCreator({
  tag: 'footer',
  className: ['footer'],
  children: [
    new ElementCreator({
      tag: 'a',
      className: ['gh-link'],
      attribute: { name: 'href', value: 'https://github.com/lu7623' },
    }),
    new ElementCreator({ tag: 'span', textContent: '2023' }),
    new ElementCreator({
      tag: 'a',
      className: ['rs-link'],
      attribute: { name: 'href', value: 'https://rs.school/js/' },
    }),
  ],
});

export default function basicView() {
  document.body.append(header.getElement(), main.getElement(), footer.getElement());
}
