import { CarParams, API } from "../model/API";
import { viewGarageCar } from "../view/garage/garage";

export default async function createNewCar() {
    const carName = document.querySelector(`.createName`);
    const carColor = document.querySelector(`.createColor`);
    if ((carName instanceof HTMLInputElement) && (carColor instanceof HTMLInputElement)) {
        const newCar: CarParams = {
            name: carName.value, color: carColor.value
        };
        await API.createCar(newCar);
        const viewCar = await API.getAllCars()
        viewGarageCar(viewCar[viewCar.length - 1]);
    }
}