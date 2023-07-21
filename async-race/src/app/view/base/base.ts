import { ElementCreator } from '../../utils/createElem';
import { garageView } from '../garage/garage';
import winnersView from '../winners/winners';

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
          tag: 'button', className: ['toGarage', 'nav-btn'], textContent: 'Garage', callback: () => garageView(),
        }),
        new ElementCreator({
          tag: 'button', className: ['toWinners', 'nav-btn'], textContent: 'Winners', callback: () => winnersView(),
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
