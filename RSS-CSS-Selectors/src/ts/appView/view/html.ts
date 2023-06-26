import { TreeNode } from "../../model/levels";
import { levelParams, levels } from "../../model/levels";


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

export const htmlChange = (i: levels) => {
  const htmlCode = document.querySelector('.html-code');
  htmlCode?.replaceChildren();
  if (htmlCode) htmlCode.textContent = `${node2Text(levelParams[i].node)}`;
}