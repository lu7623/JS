import { API } from "../model/API";
import { currentGarage } from "../model/state";


export async function animate(id?: number) {
  if (id) {
    const raceParam = (await API.startEngineCar(id, "started")).engineCar;
    if (raceParam) {
      const time = raceParam?.distance / raceParam?.velocity;
      const raceCar = document.querySelector(`.img${String(id)}`);
        if (raceCar instanceof HTMLElement) {
            const btnA = document.querySelector(`.car${id} .a`);
            if (btnA instanceof HTMLButtonElement) btnA.disabled = true;
            const btnB = document.querySelector(`.car${id} .b`);
            if (btnB instanceof HTMLButtonElement) btnB.disabled = false;
        raceCar.style.transitionDuration = `${time}ms`;
          raceCar.classList.add("animate");
          
      }
    }
    } 
}


export async function stopAnimate(id?: number) {
    if (id) {
        const raceCar = document.querySelector(`.img${String(id)}`);
        if (raceCar instanceof HTMLElement) {
            raceCar.classList.remove("animate");
            raceCar.style.transitionDuration = '0s';
            const btnA = document.querySelector(`.car${id} .a`);
            if (btnA instanceof HTMLButtonElement) btnA.disabled = false;
            const btnB = document.querySelector(`.car${id} .b`);
            if (btnB instanceof HTMLButtonElement) btnB.disabled = true;
        }
    }
}

export async function animateRace() {
    const pageCars = await API.getAllCars({ _page: currentGarage.page+1, _limit: 7 });
    pageCars.forEach((car) => {
        animate(car.id);
    }) 
}

export async function stopAnimateRace() {
    const pageCars = await API.getAllCars({ _page: currentGarage.page+1, _limit: 7 });
    pageCars.forEach((car) => {
        stopAnimate(car.id);
    }) 
}