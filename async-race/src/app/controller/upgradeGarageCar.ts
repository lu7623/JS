import { API } from '../model/API';
import setCarColor from '../utils/setCarColor';
import updateWinnersList from './winnersList';

export default async function selectGarageCar(event: Event) {
  const tar = event.target;
  if (tar instanceof Element) {
    const parent = tar.parentElement;
    if (parent) {
      const { id } = parent;
      const upgradeCar = await API.getCar(Number(id));
      if (upgradeCar.garageCar) {
        const upgardeColor = document.querySelector('.upgradeColor') as HTMLInputElement;
        upgardeColor.value = upgradeCar.garageCar.color;
        const upgardeName = document.querySelector('.upgradeName') as HTMLInputElement;
        upgardeName.value = upgradeCar.garageCar.name;
        const upgradeBtn = document.querySelector('.upgrade');
        if (upgradeBtn instanceof HTMLButtonElement) upgradeBtn.disabled = false;
        upgradeBtn?.addEventListener('click', async () => {
          if (upgradeCar.garageCar) {
            upgradeCar.garageCar.color = upgardeColor.value;
            upgradeCar.garageCar.name = upgardeName.value;
            await API.updateCar(upgradeCar.garageCar);
            await updateWinnersList();
            const name = document.querySelector(`.car${upgradeCar.garageCar.id} span`);
            if (name) name.textContent = upgradeCar.garageCar.name;
            const color = document.querySelector(`.car${upgradeCar.garageCar.id} .car-img`);
            if (color) {
              color.innerHTML = setCarColor(
                Number(upgradeCar.garageCar.id),
                upgradeCar.garageCar.color,
              );
            }
            upgardeColor.value = '#000000';
            upgardeName.value = '';
            if (upgradeBtn instanceof HTMLButtonElement) upgradeBtn.disabled = true;
          }
        });
      }
    }
  }
}
