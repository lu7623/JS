import { levelParams, levels, TreeNode} from "../../model/levels";

function node2Elements (root:TreeNode, parentElem: HTMLElement):void {
    const treeRoot = document.createElement(root.tag);
    if (root.isTarget) treeRoot.classList.add('target');
    if (root.attributes?.class)  treeRoot.classList.add(`${root.attributes.class}`);
    if (root.attributes?.id) treeRoot.id = root.attributes.id;
    parentElem.append(treeRoot);
    if (root.children) root.children.forEach (child => node2Elements(child, treeRoot))
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