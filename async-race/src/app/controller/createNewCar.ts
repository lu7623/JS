import { CarParams, API } from '../model/API';
import { paginationView } from '../view/garage/garage';
import { updateWinnersList } from './winnersList';

export default async function createNewCar() {
  const carName = document.querySelector('.createName');
  const carColor = document.querySelector('.createColor');
  if ((carName instanceof HTMLInputElement) && (carColor instanceof HTMLInputElement)) {
    const newCar: CarParams = {
      name: carName.value, color: carColor.value,
    };
    await API.createCar(newCar);
    paginationView();
    carName.value = '';
    carColor.value = '#000000';
    updateWinnersList();
  }
}
