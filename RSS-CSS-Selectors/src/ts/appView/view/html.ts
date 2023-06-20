import { levelParams } from "../../state/levels";
import { TreeNode } from "../../state/tree";


export function node2Text (root: TreeNode, lvl:number = 0):string {
 let str = `<${root.tag}>\n`;
 if (root.children) {
    lvl +=1;
  str += root.children.map(child => node2Text(child, lvl)).join('');
 };
 return  `${str}\n</${root.tag}>`
}

