import { tableChange, taskChange } from './view/table';
import { htmlChange } from './view/html';
import { levelChange, showUserProgress } from './view/levels';
import { resetUserProgress, getHelp } from '../controller/controller';
import { levelable } from '../model/state';

export const viewNewLevel: levelable = function (i) {
    tableChange(i, document.getElementById('table-area'));
    taskChange(i);
    htmlChange(i, document.querySelector('.html-code'));
    levelChange(i);
    showUserProgress();
    resetUserProgress();
    getHelp();
};
