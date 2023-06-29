  
import { viewOnLoad } from "./ts/appView/view/viewApp";
import { levelsDirectChange, setLocalStorage, inputCheck } from "./ts/controller/controller";
import { currentState } from "./ts/model/state";


viewOnLoad();
levelsDirectChange();
inputCheck();
window.addEventListener("beforeunload", () => {
setLocalStorage('currLvl', currentState.currentLevel);
setLocalStorage('userLvls', currentState.userLevels);
setLocalStorage('userHelp', currentState.helpUsed)
});


