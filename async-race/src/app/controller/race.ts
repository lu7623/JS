import { API } from "../model/API";
import { currentGarage, currentRace } from "../model/state";

function disableButton(id: number, btn1:string, btn2: string) {
    const btnA = document.querySelector(`.car${id} .${btn1}`);
    if (btnA instanceof HTMLButtonElement) btnA.disabled = true;
    const btnB = document.querySelector(`.car${id} .${btn2}`);
    if (btnB instanceof HTMLButtonElement) btnB.disabled = false;
} 

export async function animate(id?: number) {
  if (id) {
    const raceParam = (await API.startEngineCar(id, "started")).engineCar;
    if (raceParam) {
      const time = raceParam?.distance / raceParam?.velocity;
      const raceCar = document.querySelector(`.img${String(id)}`);
        if (raceCar instanceof HTMLElement) {
            disableButton(id, 'a', 'b');
            const move =  new KeyframeEffect(raceCar, [{ translate: "calc(100vw - 200px)" }], {duration: time, fill: 'forwards'});
            const animation = new Animation(move , document.timeline); 
            animation.play();
            const drive = await API.driveCar(id, 'drive');
            if (drive.status === 500) {
                animation.pause();
               return 100000
            }
          
        } return time;
      }
     
    } 
}


export async function stopAnimate(id?: number) {
    if (id) {
        const raceCar = document.querySelector(`.img${String(id)}`);
        if (raceCar instanceof HTMLElement) {
            raceCar.getAnimations().forEach((animation) => animation.cancel());
            disableButton(id, 'b', 'a')
        }
    }
}

export async function animateRace() {
    const pageCars = await API.getAllCars({ _page: currentGarage.page + 1, _limit: 7 });
    currentRace.carsCount = pageCars.length;
    const winners =[]
    for (let i = 0; i < pageCars.length; i++) {
        winners.push(animate(pageCars[i].id));
    }
    console.log(winners);
   console.log(await Promise.all(winners))
}


export async function stopAnimateRace() {
    const pageCars = await API.getAllCars({ _page: currentGarage.page+1, _limit: 7 });
    pageCars.forEach((car) => {
        stopAnimate(car.id);
    }) 
}