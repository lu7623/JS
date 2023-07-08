import { levels, levelParams, check } from '../model/levels';
import { currentState } from '../model/state';
import { viewNewLevel } from '../appView/view';
import { lastLvlNotification, resetView, viewOnCheck, viewOnWin } from '../appView/view/viewApp';

export function setLocalStorage<T>(item: string, param: T): void {
    if (typeof param === 'number') localStorage.setItem(item, param.toString());
    if (param instanceof Array) localStorage.setItem(item, param.join());
}

export const getLocalStorage = () => {
    if (localStorage.getItem('currLvl')) {
        currentState.currentLevel = Number(localStorage.getItem('currLvl')) as levels;
    }
    if (localStorage.getItem('userLvls')) {
        currentState.userLevels = localStorage
            .getItem('userLvls')
            ?.split(',')
            .map((x) => Number(x)) as levels[];
        currentState.userLevels.forEach((lvl) => {
            const userLevels = document.querySelector('.user-levels');
            if (userLevels) userLevels.textContent = `${currentState.userLevels.length}/12`;
            document.querySelector(`.level${lvl + 1}`)?.classList.add('green-check');
        });
    }
    if (localStorage.getItem('userHelp')) {
        currentState.helpUsed = localStorage
            .getItem('userHelp')
            ?.split(',')
            .map((x) => Number(x)) as levels[];
        currentState.helpUsed.forEach((help) =>
            document.querySelector(`.level${help + 1}`)?.classList.add('yellow-check')
        );
    }
};

export const saveState = () => {
    window.addEventListener('beforeunload', () => {
        setLocalStorage('currLvl', currentState.currentLevel);
        setLocalStorage('userLvls', currentState.userLevels);
        setLocalStorage('userHelp', currentState.helpUsed);
    });
};

export const levelsDirectChange = () => {
    const levelsName = document.querySelectorAll('.level-name');
    for (let i = 0; i < 12; i += 1) {
        levelsName[i].addEventListener('click', () => {
            viewNewLevel(i as levels);
            currentState.currentLevel = i as levels;
        });
    }
};

export const inputCheck = () => {
    const input = document.getElementById('answer') as HTMLInputElement;
    const enter = document.querySelector('.enter');
    input?.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') {
            viewOnCheck(input.value);
            input.value = '';
        }
    });
    enter?.addEventListener('click', () => {
        viewOnCheck(input.value);
        input.value = '';
    });
};

export const spellCheck: check = function (value, rightAnwer) {
    if (rightAnwer.every((ans) => value.toLowerCase().includes(ans))) return true;
    else return false;
};

const queryCheck = (s: string) => document.createDocumentFragment().querySelector(s);
const isSelectorValid = (value: string) => {
    try {
        queryCheck(value);
    } catch {
        return false;
    }
    return true;
};

export const targetCheck: check = function (value, rightAnwer) {
    if (rightAnwer.length === 1) return value.toLowerCase().trim() === rightAnwer[0];
    if (isSelectorValid(value)) {
        const userAnswer = document.querySelectorAll(value);
        const target = document.querySelectorAll('.target');
        if (!(target.length === userAnswer.length)) return false;
        if (userAnswer.length === 0) return false;
        const res: boolean[] = [];
        userAnswer.forEach((el) => {
            if (el instanceof HTMLElement) res.push(el.classList.contains('target'));
        });
        if (res.every((x) => x === true)) return true;
        return false;
    } else return false;
};

export const doubleCheck = (res1: boolean, res2: boolean) => {
    if (res1 && res2) onRightAnswer();
    else onWrongAnswer();
};

const onRightAnswer = () => {
    document.querySelector(`.level${currentState.currentLevel + 1}`)?.classList.add('green-check');
    if (!currentState.userLevels.includes(currentState.currentLevel))
        currentState.userLevels.push(currentState.currentLevel);
    if (currentState.currentLevel < 11) currentState.currentLevel += 1;
    else {
        if (currentState.userLevels.length < 12) {
            lastLvlNotification();
        }
        currentState.currentLevel = 0;
    }
    const userLevels = document.querySelector('.user-levels');
    if (userLevels) userLevels.textContent = `${currentState.userLevels.length}/12`;
    if (currentState.userLevels.length === 12) viewOnWin();
    else {
        document.querySelector('board')?.classList.add('right');
        setTimeout(() => {
            document.querySelector('board')?.classList.remove('right');
        }, 1000);
        setTimeout(() => viewNewLevel(currentState.currentLevel as levels), 1000);
    }
};

const onWrongAnswer = () => {
    document.getElementById('table-area')?.classList.add('wrong');
    setTimeout(() => {
        document.getElementById('table-area')?.classList.remove('wrong');
    }, 1000);
};

export const resetUserProgress = () => {
    const reset = document.querySelector('.reset');
    if (reset)
        reset.addEventListener('click', () => {
            resetView();
        });
};

export const getHelp = () => {
    const helpBtn = document.querySelector('.help-btn');
    helpBtn?.addEventListener('click', () => {
        const input = document.getElementById('answer') as HTMLInputElement;
        input.value = levelParams[currentState.currentLevel].answer.join(' ');
        input.classList.add('help');
        document.querySelector(`.level${currentState.currentLevel + 1}`)?.classList.add('yellow-check');
        if (!currentState.helpUsed.includes(currentState.currentLevel))
            currentState.helpUsed.push(currentState.currentLevel);
        setTimeout(() => {
            input.classList.remove('help');
        }, 4000);
    });
};
