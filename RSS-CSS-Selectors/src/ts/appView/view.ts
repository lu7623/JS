import { tableChange, taskChange } from "./view/table";
import { htmlChange } from "./view/html";
import { levelChange, showUserProgress } from "./view/levels";
import { levels } from "../model/levels";
import { resetUserProgress, getHelp } from "../controller/controller";

export const viewNewLevel = (i: levels) => {
    tableChange(i);
    taskChange(i);
    htmlChange(i);
    levelChange(i);
    showUserProgress();
    resetUserProgress();
    getHelp();
}
  