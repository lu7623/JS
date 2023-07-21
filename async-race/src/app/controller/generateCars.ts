import { API } from '../model/API';
import makeRandomCar from '../utils/randomCar';

export default async function generateCars() {
  let i = 0;
  const randCars = [];
  while (i < 100) {
    const newCar = makeRandomCar();
    randCars.push(newCar);
    i += 1;
  }
  await Promise.all(randCars.map((car) => API.createCar(car)));
}
