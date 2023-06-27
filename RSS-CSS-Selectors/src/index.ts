
import { viewNewLevel } from "./ts/appView/view";
import { currentState, levelsDirectChange, viewOnLoad } from "./ts/controller/controller";
import { setLocalStorage } from "./ts/controller/controller";
import { levels } from "./ts/model/levels";
import { levelParams } from "./ts/model/levels";


viewOnLoad();
levelsDirectChange();
window.addEventListener("beforeunload", setLocalStorage);

const input = document.getElementById('answer') as HTMLInputElement;

input?.addEventListener( 'keydown', (event) => {
    if (event.code === 'Enter'){
    console.log(input.value);
    if (input.value === levelParams[currentState.currentLevel].answer) onRightAnswer();
    else onWrongAnswer();
    input.value = '';
   
    }
  });

const onRightAnswer = () => {
    if (currentState.currentLevel < 11){
        currentState.userLevels.push(currentState.currentLevel)
        currentState.currentLevel += 1;
 
 viewNewLevel(currentState.currentLevel as levels);
    }
}

const onWrongAnswer = () => {
   document.getElementById('table-area')?.classList.add('wrong');  
setTimeout(() => {
    document.getElementById('table-area')?.classList.remove('wrong');  
}, 1000);

}