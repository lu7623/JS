import { levels } from "../../model/levels";
import { currentState } from "../../model/state";

const levelsDescription = document.querySelectorAll('.level-description');
const levelsName = document.querySelectorAll('.level-name');


export const levelChange = (i: levels) => {
    levelsDescription.forEach((elem) => {
     elem.classList.remove('level-description-open');
     elem.classList.add('level-description-hidden');
  }) 
  levelsName.forEach((name) =>  name.classList.remove('level-checked')) 
     
    if (levelsDescription[i].classList.contains('level-description-hidden')) {
          levelsDescription[i].classList.remove('level-description-hidden');
          levelsDescription[i].classList.add('level-description-open');
          levelsName[i].classList.add('level-checked');        
      }
      else {
          levelsDescription[i].classList.add('level-description-hidden');
          levelsDescription[i].classList.remove('level-description-open');
          levelsName[i].classList.remove('level-checked');
      }
  }

  export const showUserProgress = () => {
  const userLevels =  document.querySelector('.user-levels');
  if (userLevels) userLevels.textContent = `${currentState.userLevels.length}/12`;
  }