  
import { levelsDirectChange } from "./ts/controller/controller";
import { setLocalStorage } from "./ts/controller/controller";
import { inputCheck } from "./ts/controller/controller";
import { currentState } from "./ts/model/state";
import { viewOnLoad } from "./ts/appView/view/levels";

viewOnLoad();
levelsDirectChange();
inputCheck();
window.addEventListener("beforeunload", () => {
setLocalStorage('currLvl', currentState.currentLevel);
setLocalStorage('userLvls', currentState.userLevels);
});


