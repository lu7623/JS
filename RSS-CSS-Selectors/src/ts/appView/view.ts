import { tableChange, taskChange } from "./view/table";
import { htmlChange } from "./view/html";
import { levelChange, showUserProgress } from "./view/levels";
import { resetUserProgress, getHelp } from "../controller/controller";
import { levelable } from "../model/state";

export const viewNewLevel:levelable = function (i) {
    tableChange(i);
    taskChange(i);
    htmlChange(i);
    levelChange(i);
    showUserProgress();
    resetUserProgress();
    getHelp();
}


  