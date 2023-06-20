type Data = {
    textContent: string,
    classNames: string
}

export class TreeNode
{    
    constructor (readonly tag:string, readonly isTarget: boolean = false, readonly children?: TreeNode[]) {  }
 

}
