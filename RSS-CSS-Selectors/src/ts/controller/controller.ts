import { levels } from '../model/levels';
import { currentState } from '../model/state';
import { viewNewLevel } from '../appView/view';
import { levelParams } from '../model/levels';

export function setLocalStorage() {
    localStorage.setItem('currLvl', currentState.currentLevel.toString());
    localStorage.setItem('userLvls', currentState.userLevels.join());
}

export function getLocalStorage() {
    if (localStorage.getItem('currLvl')) {
        currentState.currentLevel = Number(localStorage.getItem('currLvl')) as levels;
    }
    if (localStorage.getItem('userLvls')) {
        currentState.userLevels = localStorage
            .getItem('userLvls')
            ?.split(',')
            .map((x) => Number(x)) as levels[];
            currentState.userLevels.forEach(lvl => { 
            const userLevels =  document.querySelector('.user-levels');
            if (userLevels) userLevels.textContent = `${currentState.userLevels.length}/12`;
            document.querySelector(`.level${lvl + 1}`)?.classList.add('green-check')})
    }
}

export const viewOnLoad = () => {
    window.addEventListener('load', function () {
        getLocalStorage();
        viewNewLevel(currentState.currentLevel);
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
    input?.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') {
            console.log(input.value);
            if (input.value === levelParams[currentState.currentLevel].answer) onRightAnswer();
            else onWrongAnswer();
            input.value = '';
        }
    });
};

const onRightAnswer = () => {
    document.querySelector(`.level${currentState.currentLevel + 1}`)?.classList.add('green-check')
    if (currentState.currentLevel < 11) {
        if (!currentState.userLevels.includes(currentState.currentLevel))
        currentState.userLevels.push(currentState.currentLevel);
        currentState.currentLevel += 1;
        const userLevels =  document.querySelector('.user-levels');
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
    if (reset) reset.addEventListener('click', () => {
        document.querySelectorAll('.green-check').forEach(el => el.classList.remove('green-check'))
        currentState.currentLevel = 0;
        currentState.userLevels.length = 0;
        viewNewLevel(0);
    }
    )
}

export const getHelp = () => {
    const helpBtn = document.querySelector('.help-btn');
    helpBtn?.addEventListener('click', () =>{
        const input = document.getElementById('answer') as HTMLInputElement;
        input.value = levelParams[currentState.currentLevel].answer;
        input.classList.add('help');
        setTimeout(() => {input.classList.remove('help');}, 4000)
    })
}