
import { levelsDirectChange, viewOnLoad } from "./ts/controller/controller";
import { setLocalStorage } from "./ts/controller/controller";


viewOnLoad();
levelsDirectChange();
window.addEventListener("beforeunload", setLocalStorage);


