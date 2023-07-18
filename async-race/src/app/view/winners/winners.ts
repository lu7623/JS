import { ElementCreator } from "../../utils/createElem";

const winners = new ElementCreator({
    tag: 'section',
    className: ['garage'],
    children: [
      new ElementCreator({ tag: 'h2', textContent: 'Winners', children: [
          new ElementCreator({ tag: 'span', className: ['all-winners'] }),
        ], }),
      new ElementCreator({
        tag: 'h3',
        textContent: 'Page #',
        children: [
          new ElementCreator({ tag: 'span', className: ['page-number-winners'] }),
        ],
      }),
      new ElementCreator({ tag: 'div', className: ['winners-container'] }),
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
  
export async function winnersView() {
    document
        .querySelector('.main')
        ?.append(winners.getElement());
}