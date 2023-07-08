import { doubleCheck, getLocalStorage, spellCheck, targetCheck } from '../../controller/controller';
import { levels, levelParams } from '../../model/levels';
import { currentState } from '../../model/state';
import { viewNewLevel } from '../view';

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
    winHeader.classList.add('win-heading');
    winHeader.setAttribute('data-testid', 'win');
    winHeader.innerText = 'Congratulations! You win!';
    const winGif = document.createElement('div');
    winGif.classList.add('party');
    const winBtn = document.createElement('button');
    winBtn.innerText = 'Ok';
    winBtn.classList.add('winBtn');
    winBtn.addEventListener('click', () => {
        resetView();
        win.classList.add('hidden');
    });
    win.append(winGif, winBtn, winHeader);
    document.querySelector('body')?.append(win);
};

export const resetView = () => {
    document.querySelectorAll('.green-check').forEach((el) => el.classList.remove('green-check'));
    document.querySelectorAll('.yellow-check').forEach((el) => el.classList.remove('yellow-check'));
    currentState.currentLevel = 0;
    currentState.userLevels.length = 0;
    currentState.helpUsed.length = 0;
    viewNewLevel(0);
};

export const lastLvlNotification = () => {
    const last = document.createElement('div');
    last.className = 'last';
    const lastRem = document.createElement('p');
    lastRem.classList.add('win-heading');
    lastRem.innerText = "It was the last level! But you haven't completed some tasks, please continue to win the game!";
    const lastBtn = document.createElement('button');
    lastBtn.className = 'winBtn lastBtn';
    lastBtn.textContent = 'Ok';
    last.append(lastRem);
    last.append(lastBtn);
    document.querySelector('body')?.append(last);
    lastBtn?.addEventListener('click', () => {
        last?.classList.add('hidden');
    });
};

export const viewOnCheck = (value: string) => {
    if (Number(value) >= 1 && Number(value) <= 12) {
        currentState.currentLevel = (Number(value) - 1) as levels;
        viewNewLevel((Number(value) - 1) as levels);
    } else {
        doubleCheck(
            spellCheck(value, levelParams[currentState.currentLevel].answer),
            targetCheck(value, levelParams[currentState.currentLevel].answer)
        );
    }
};
