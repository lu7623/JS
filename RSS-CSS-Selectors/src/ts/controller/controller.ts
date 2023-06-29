import { levels, levelParams } from '../model/levels';
import { currentState } from '../model/state';
import { viewNewLevel } from '../appView/view';

export function setLocalStorage<T>(item: string, param: T): void {
    if (typeof param === 'number') localStorage.setItem(item, param.toString());
    if (param instanceof Array) localStorage.setItem(item, param.join());
}

// export function setLocalStorage() {
//     localStorage.setItem('currLvl', currentState.currentLevel.toString());
//     localStorage.setItem('userLvls', currentState.userLevels.join());
// }

export function getLocalStorage() {
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
      if (Number(input.value) >=1 && Number(input.value) <= 12 ) return viewNewLevel(Number(input.value)-1 as levels); 
        doubleCheck(spellCheck(input.value), targetCheck(input.value));
            input.value = '';
        }
    });
    enter?.addEventListener('click', () => {
        spellCheck(input.value);
        input.value = '';
    });
};

const spellCheck = (value: string) => {
    const rightAnwer = levelParams[currentState.currentLevel].answer;
     if (rightAnwer.every(ans => value.includes(ans))) return true;
    else return false;
};

const targetCheck = (value: string) => {
   if (levelParams[currentState.currentLevel].answer.length === 1) return true;
const userAnswer = document.querySelectorAll(value);
console.log(userAnswer);
const res: boolean[] = [];
userAnswer.forEach(el => {
    if (el instanceof HTMLElement)  res.push(el.classList.contains('target'))});
    console.log(res);
   if ( res.every(x => x === true)) return true;
   return false;
}

const doubleCheck = (res1:boolean, res2: boolean) => {
if (res1 && res2) onRightAnswer();
else onWrongAnswer();
}

const onRightAnswer = () => {
    document.querySelector(`.level${currentState.currentLevel + 1}`)?.classList.add('green-check');
    if (currentState.currentLevel < 11) {
        if (!currentState.userLevels.includes(currentState.currentLevel))
            currentState.userLevels.push(currentState.currentLevel);
        currentState.currentLevel += 1;
        const userLevels = document.querySelector('.user-levels');
        if (userLevels) userLevels.textContent = `${currentState.userLevels.length}/12`;
        viewNewLevel(currentState.currentLevel as levels);
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
            document.querySelectorAll('.green-check').forEach((el) => el.classList.remove('green-check'));
            currentState.currentLevel = 0;
            currentState.userLevels.length = 0;
            viewNewLevel(0);
        });
};

export const getHelp = () => {
    const helpBtn = document.querySelector('.help-btn');
    helpBtn?.addEventListener('click', () => {
        const input = document.getElementById('answer') as HTMLInputElement;
        input.value = levelParams[currentState.currentLevel].answer.join('');
        input.classList.add('help');
        setTimeout(() => {
            input.classList.remove('help');
        }, 4000);
    });
};


