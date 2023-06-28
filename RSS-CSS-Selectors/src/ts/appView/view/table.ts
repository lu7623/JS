import { levelParams, levels} from "../../model/levels";
import { toolTipHandler } from "./html";
import { node2Something } from "../../model/levels";

export const node2Elements: node2Something = function(root, parentElem) {
    const treeRoot = document.createElement(root.tag);
    if (root.isTarget) treeRoot.classList.add('target');
    if (root.attributes?.class)  treeRoot.classList.add(`${root.attributes.class}`);
    if (root.attributes?.id) treeRoot.id = root.attributes.id;
    if (root.attributes?.data) {
       toolTipHandler(treeRoot, root);
}
    parentElem.append(treeRoot);
    if (root.children) {root.children.forEach (child => node2Elements(child, treeRoot));
    }

    }

export const tableChange  = (i: levels) => {
    const tableArea = document.getElementById('table-area');
    tableArea?.replaceChildren();
    if (tableArea) node2Elements(levelParams[i].node, tableArea);
}

export const taskChange = (i: levels) => {
    const task = document.querySelector('.task');
    if (task) task.textContent = levelParams[i].description;
}