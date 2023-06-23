import { node2Elements } from "./ts/appView/view/html";
import { levelParams } from "./ts/state/levels";
import { node2Text } from "./ts/appView/view/html";

const tableArea = document.getElementById('table-area');
const levelsDescription = document.querySelectorAll('.level-description');
const levelsName = document.querySelectorAll('.level-name');
const htmlCode = document.querySelector('.html-code');
const task = document.querySelector('.task');

for (let i = 0; i < 13; i += 1) {
    levelsName[i].addEventListener('click', () => {
      levelsDescription.forEach((elem) => {
       elem.classList.remove('level-description-open');
       elem.classList.add('level-description-hidden');
    }) 
    levelsName.forEach((name) =>  name.classList.remove('level-checked')) 
       tableArea?.replaceChildren();
       htmlCode?.replaceChildren();
      if (levelsDescription[i].classList.contains('level-description-hidden')) {
            levelsDescription[i].classList.remove('level-description-hidden');
            levelsDescription[i].classList.add('level-description-open');
            levelsName[i].classList.add('level-checked');
            if (tableArea) node2Elements(levelParams[i].node, tableArea);
            if (htmlCode) htmlCode.textContent = `${node2Text(levelParams[i].node)}`;
             if (task) task.textContent = levelParams[i].description;
        }
        else {
            levelsDescription[i].classList.add('level-description-hidden');
            levelsDescription[i].classList.remove('level-description-open');
            levelsName[i].classList.remove('level-checked');
        }
    })
}