import { levelParams, node2Something } from '../../model/levels';
import { levelable } from '../../model/state';

export const node2Text: node2Something = function (root, parentElem, lvl = 0) {
    const treeRoot = document.createElement('pre');
    if (root.attributes?.unique) treeRoot.setAttribute('data-unique', `${root.attributes.unique}`);
    const atr =
        (root.attributes?.class ? ` class="${root.attributes?.class}"` : '') ||
        (root.attributes?.id ? ` id="${root.attributes?.id}"` : '');
    if (!root.children) {
        treeRoot.innerText = '  '.repeat(lvl) + `<${root.tag}${atr} />`;
        lvl -= 1;
    } else {
        treeRoot.innerText = '  '.repeat(lvl) + `<${root.tag}${atr}>`;
    }
    parentElem.append(treeRoot);
    if (root.attributes?.data) {
        toolTipHandler(root, treeRoot);
    }
    if (root.children) {
        lvl += 1;
        root.children.forEach((child) => node2Text(child, treeRoot, lvl));
        lvl -= 1;
        const newtext = document.createTextNode('  '.repeat(lvl) + `</${root.tag}>`);
        parentElem.appendChild(newtext);
    }
};

export const htmlChange: levelable = function (i) {
    const htmlCode = document.querySelector('.html-code') as HTMLElement;
    htmlCode?.replaceChildren();
    if (htmlCode) node2Text(levelParams[i].node, htmlCode);
};

export const toolTipHandler: node2Something = function (root, treeRoot) {
    const tooltip = document.createElement('span');
    tooltip.innerText = root.attributes?.data || '';
    treeRoot.prepend(tooltip);
    tooltip.classList.add('tooltip');
    if (root.attributes?.unique) tooltip.setAttribute('data-unique', `${root.attributes.unique}`);
    treeRoot.addEventListener('mouseover', (event) => {
        event.stopPropagation();
        document.querySelectorAll(`[data-unique="${root.attributes?.unique}"`).forEach((tip) => {
            if (tip instanceof HTMLSpanElement) tip.classList.add('visible');
            tip.classList.add('selected');
        });
    });
    treeRoot.addEventListener('mouseout', () => {
        document.querySelectorAll(`[data-unique="${root.attributes?.unique}"]`).forEach((tip) => {
            if (tip instanceof HTMLSpanElement) tip.classList.remove('visible');
            tip.classList.remove('selected');
        });
    });
};
