import { TreeNode } from '../../model/levels';
import { levelParams, levels } from '../../model/levels';

export function node2Text(root: TreeNode, parentElem: HTMLElement, lvl = 0): void {
    const treeRoot = document.createElement('pre');
    const atr =
        (root.attributes?.class ? ` class="${root.attributes?.class}"` : '') ||
        (root.attributes?.id ? ` id="${root.attributes?.id}"` : '');
    if (!root.children) {
        treeRoot.innerText = '  '.repeat(lvl) + `<${root.tag}${atr} />`;
        lvl -= 1;
    } else {
        treeRoot.innerText = '  '.repeat(lvl) + `<${root.tag}${atr}>`;
    }
    if (root.attributes?.data) {
        toolTipHandler(treeRoot, root);
    }
    parentElem.append(treeRoot);
    if (root.children) {
        lvl += 1;
        root.children.forEach((child) => node2Text(child, treeRoot, lvl));
        lvl -= 1;
        const newtext = document.createTextNode('  '.repeat(lvl) + `</${root.tag}>`);
        parentElem.appendChild(newtext);
    }
}

export const htmlChange = (i: levels) => {
    const htmlCode = document.querySelector('.html-code') as HTMLElement;
    htmlCode?.replaceChildren();
    if (htmlCode) node2Text(levelParams[i].node, htmlCode);
};

export const toolTipHandler = (treeRoot: HTMLElement, root: TreeNode) => {
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');
    tooltip.innerText = root.attributes?.data || '';
    treeRoot.append(tooltip);
    if (root.attributes?.unique) tooltip.setAttribute('data-unique', `${root.attributes.unique}`);
    treeRoot.addEventListener('mouseover', (event) => {
        event.stopPropagation();
        treeRoot.classList.add('selected');
        document.querySelectorAll(`.tooltip[data-unique="${root.attributes?.unique}"`).forEach((tip) => {
            tip.classList.add('visible');
        });
    });
    treeRoot.addEventListener('mouseout', () => {
        document.querySelectorAll(`.tooltip[data-unique="${root.attributes?.unique}"`).forEach((tip) => {
            tip.classList.remove('visible');
            treeRoot.classList.remove('selected');
        });
    });
};
