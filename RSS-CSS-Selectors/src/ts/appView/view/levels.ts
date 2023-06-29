import { levels } from '../../model/levels';
import { currentState } from '../../model/state';
import { getLocalStorage } from '../../controller/controller';
import { viewNewLevel } from '../view';

const levelsDescription = document.querySelectorAll('.level-description');
const levelsName = document.querySelectorAll('.level-name');

export const levelChange = (i: levels) => {
    levelsDescription.forEach((elem) => {
        elem.classList.remove('level-description-open');
        elem.classList.add('level-description-hidden');
    });
    levelsName.forEach((name) => name.classList.remove('level-checked'));

    if (levelsDescription[i].classList.contains('level-description-hidden')) {
        levelsDescription[i].classList.remove('level-description-hidden');
        levelsDescription[i].classList.add('level-description-open');
        levelsName[i].classList.add('level-checked');
    } else {
        levelsDescription[i].classList.add('level-description-hidden');
        levelsDescription[i].classList.remove('level-description-open');
        levelsName[i].classList.remove('level-checked');
    }
};

export const showUserProgress = () => {
    const userLevels = document.querySelector('.user-levels');
    if (userLevels) userLevels.textContent = `${currentState.userLevels.length}/12`;
};

export const viewOnLoad = () => {
    window.addEventListener('load', function () {
        getLocalStorage();
        viewNewLevel(currentState.currentLevel);
    });
};

export const viewOnWin = () => {
    const win = document.createElement('div');
    win.className = 'win';
    const winHeader = document.createElement('h3');
    winHeader.classList.add('heading');
    winHeader.innerText = 'You win!';
    const winGif = document.createElement('div');
    winGif.classList.add('party');
    const winBtn = document.createElement('button');
    winBtn.innerText = 'Ok';
    winBtn.addEventListener('click', () => win.classList.add('hidden'));
    win.append(winGif, winBtn, winHeader);
    document.querySelector('body')?.append(win);
};
