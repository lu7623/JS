import { getLocalStorage } from "../../controller/controller";
import { currentState } from "../../model/state";
import { viewNewLevel } from "../view";


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
    currentState.helpUsed.length =0; 
    viewNewLevel(0);
}

export const lastLvlNotification = () => {
    const last = document.createElement('div');
            last.className = 'last';
            const lastRem = document.createElement('p');
            lastRem.classList.add('win-heading');
            lastRem.innerText = "It was the last level! But you haven't completed some tasks, please continue to win the game!"
            const lastBtn = document.createElement('button');
            lastBtn.className = "winBtn lastBtn";
            lastBtn.textContent = "Ok";
            last.append(lastRem);
            last.append(lastBtn);
            document.querySelector('body')?.append(last);
            lastBtn?.addEventListener('click', () => {
                   last?.classList.add('hidden');
            })

}