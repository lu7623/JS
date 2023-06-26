import { levels } from "../model/levels";
import { state } from "../model/state";
import { viewNewLevel } from "../appView/view";

export const currentState: state = {
    currentLevel: 0,
    userLevels: []
}

export function setLocalStorage() {
    localStorage.setItem("currLvl", currentState.currentLevel.toString());
    localStorage.setItem("userLvls", currentState.userLevels.join());
  } 
  
  export function getLocalStorage() {
    if (localStorage.getItem("currLvl")) {
     currentState.currentLevel = Number(localStorage.getItem("currLvl")) as levels;
    }
    if (localStorage.getItem("userLvls")) {
      currentState.userLevels = localStorage.getItem("userLvls")?.split(',').map((x) => Number(x)) as levels[];
    }
  }

  export const viewOnLoad = () => {
    window.addEventListener('load', function(){
        getLocalStorage();
        viewNewLevel(currentState.currentLevel);
      });    
    
}

export const levelsDirectChange = () => {
    const levelsName = document.querySelectorAll('.level-name');
    for (let i = 0; i < 12; i += 1) {
        levelsName[i].addEventListener('click', () => {
            viewNewLevel(i as levels);
        currentState.currentLevel = i as levels})
    }
}
