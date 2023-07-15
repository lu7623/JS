import { API } from '../model/API';
import makeRandomCar from '../utils/randomCar';
import { viewGarageCar } from '../view/garage/garage';

export default async function generateCars() {
  const viewCar = await API.getAllCars();
  let i = viewCar.length + 1;
  while (i < 8 + viewCar.length) {
    const newCar = makeRandomCar();
    newCar.id = i;
    const res = (await API.createCar(newCar)).status;
    if (res === 201) {
      viewGarageCar(newCar);
      i += 1;
    }
  }
}
