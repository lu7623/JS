import { levels, levelParams } from '../model/levels';
import { check, currentState } from '../model/state';
import { viewNewLevel } from '../appView/view';
import { resetView, viewOnWin } from '../appView/view/viewApp';

export function setLocalStorage<T>(item: string, param: T): void {
    if (typeof param === 'number') localStorage.setItem(item, param.toString());
    if (param instanceof Array) localStorage.setItem(item, param.join());
}

// export function setLocalStorage() {
//     localStorage.setItem('currLvl', currentState.currentLevel.toString());
//     localStorage.setItem('userLvls', currentState.userLevels.join());
// }

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
}

export const saveState = () => {
    window.addEventListener("beforeunload", () => {
        setLocalStorage('currLvl', currentState.currentLevel);
        setLocalStorage('userLvls', currentState.userLevels);
        setLocalStorage('userHelp', currentState.helpUsed)
    });
}


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
            if (Number(input.value) >= 1 && Number(input.value) <= 12)
                return viewNewLevel((Number(input.value) - 1) as levels);
            doubleCheck(spellCheck(input.value), targetCheck(input.value));
            input.value = '';
        }
    });
    enter?.addEventListener('click', () => {
        if (Number(input.value) >= 1 && Number(input.value) <= 12)
            return viewNewLevel((Number(input.value) - 1) as levels);
        doubleCheck(spellCheck(input.value), targetCheck(input.value));
        input.value = '';
    });

};

const spellCheck: check = function (value) {
    const rightAnwer = levelParams[currentState.currentLevel].answer;
    if (rightAnwer.every((ans) => value.toLowerCase().includes(ans))) return true;
    else return false;
};

const targetCheck: check = function (value) {
    if (value.length === 0) return false;
    if (levelParams[currentState.currentLevel].answer.length === 1) return true;
    const userAnswer = document.querySelectorAll(value);
    console.log(userAnswer);
    const res: boolean[] = [];
    userAnswer.forEach((el) => {
        if (el instanceof HTMLElement) res.push(el.classList.contains('target'));
    });
    console.log(res);
    if (res.every((x) => x === true)) return true;
    return false;
};

const doubleCheck = (res1: boolean, res2: boolean) => {
    if (!res1) onWrongAnswer();
    else if (res2) onRightAnswer();
    else onWrongAnswer();
};

const onRightAnswer = () => {
    document.querySelector(`.level${currentState.currentLevel + 1}`)?.classList.add('green-check');

    if (!currentState.userLevels.includes(currentState.currentLevel))
        currentState.userLevels.push(currentState.currentLevel);
    if (currentState.currentLevel < 11) currentState.currentLevel += 1;
    else currentState.currentLevel = 0;
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
