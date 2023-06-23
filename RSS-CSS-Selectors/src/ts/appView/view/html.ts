import { TreeNode } from "../../state/levels";


export function node2Text (root: TreeNode, lvl = 0):string {
const atr =  (root.attributes?.class ? ` class="${root.attributes?.class}"` : '') || (root.attributes?.id ? ` id="${root.attributes?.id}"` : '');
 let str = `${' '.repeat(lvl)}<${root.tag}${atr}>\n`;
 if (root.children) {
    lvl +=1;
  str +=  root.children.map(child => node2Text(child, lvl)).join('');
  lvl -=1;
 }
 str += `${' '.repeat(lvl)}</${root.tag}>\n`
 return str;
}

export function node2Elements (root:TreeNode, parentElem: HTMLElement):void {
const treeRoot = document.createElement(root.tag);
if (root.isTarget) treeRoot.classList.add('target');
if (root.attributes?.class)  treeRoot.classList.add(`${root.attributes.class}`);
if (root.attributes?.id) treeRoot.id = root.attributes.id;
parentElem.append(treeRoot);
if (root.children) root.children.forEach (child => node2Elements(child, treeRoot))
}



