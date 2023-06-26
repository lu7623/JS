import { tableChange, taskChange } from "./view/table";
import { htmlChange } from "./view/html";
import { levelChange } from "./view/levels";
import { levels } from "../model/levels";

export const viewNewLevel = (i: levels) => {
    tableChange(i);
    taskChange(i);
    htmlChange(i);
    levelChange(i)
}
  