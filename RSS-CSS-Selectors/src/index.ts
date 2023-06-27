  
import { levelsDirectChange, viewOnLoad } from "./ts/controller/controller";
import { setLocalStorage } from "./ts/controller/controller";
import { inputCheck } from "./ts/controller/controller";



viewOnLoad();
levelsDirectChange();
inputCheck();
window.addEventListener("beforeunload", setLocalStorage);


