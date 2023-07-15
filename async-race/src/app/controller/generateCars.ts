import { API } from "../model/API";
import makeRandomCar from "../utils/randomCar";
import garageView from "../view/garage/garage";


export default async function generateCars() {
    let i = 0;
    while (i < 100) {
        const newCar = makeRandomCar();
        const res = (await API.createCar(newCar)).status;
        if (res === 201) i++; 
    }
    document.querySelector('.garage-container')?.replaceChildren();
    garageView();
}