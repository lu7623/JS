import { API } from '../model/API';
import { currentGarage, currentRace } from '../model/state';

function disableButton(id: number, btn1:string, btn2: string) {
  const btnA = document.querySelector(`.car${id} .${btn1}`);
  if (btnA instanceof HTMLButtonElement) btnA.disabled = true;
  const btnB = document.querySelector(`.car${id} .${btn2}`);
  if (btnB instanceof HTMLButtonElement) btnB.disabled = false;
}

async function animateElem(id: number, time: number) {
  const raceCar = document.querySelector(`.img${String(id)}`);
  if (raceCar instanceof HTMLElement) {
    disableButton(id, 'a', 'b');
    const move = new KeyframeEffect(raceCar, [{ translate: 'calc(100vw - 200px)' }], { duration: time, fill: 'forwards' });
    const animation = new Animation(move, document.timeline);
    animation.play();
    const drive = await API.driveCar(id, 'drive');
    if (drive.status === 500) {
      animation.pause();
      return 100000;
    }
  } return time;
}

export async function animate(id?: number) {
  if (id) {
    const raceParam = (await API.startEngineCar(id, 'started')).engineCar;
    if (raceParam) {
      const time = raceParam?.distance / raceParam?.velocity;
      animateElem(id, time);
    }
  }
}

export async function stopAnimate(id?: number) {
  if (id) {
    const raceCar = document.querySelector(`.img${id}`);
    console.log(raceCar);
    if (raceCar instanceof HTMLElement) {
      raceCar.getAnimations().forEach((animation) => {
        console.log(animation);
        animation.cancel();
      });
      console.log('anim cancel');
      disableButton(id, 'b', 'a');
    }
  }
}

export async function animateRace() {
  const pageCars = await API.getAllCars({ _page: currentGarage.page + 1, _limit: 7 });
  currentRace.carsCount = pageCars.length;
  const participants = [];
  for (let i = 0; i < pageCars.length; i++) {
    participants.push(API.startEngineCar(Number(pageCars[i].id), 'started'));
  }
  const winners = [];
  const res = await Promise.all(participants);
  for (let i = 0; i < pageCars.length; i++) {
    const raceParam = res[i].engineCar;
    if (raceParam) {
      const time = raceParam?.distance / raceParam?.velocity;
      winners.push([pageCars[i].id, time]);
    }
  }
  const times = [];
  for (let i = 0; i < pageCars.length; i++) {
    times.push(animateElem(Number(winners[i][0]), Number(winners[i][1])));
  }
  const results = await Promise.all(times);
  const minTime = Math.min(...results);
  currentRace.winnerTime = Number((minTime/1000).toFixed(3));
  for (let i = 0; i < pageCars.length; i++) {
    if (results[i] === minTime) currentRace.winner = winners[i][0];
    winners[i][1] = results[i];
  }
  currentRace.results = winners;
if (currentRace.winner && currentRace.winnerTime) saveWinner(currentRace.winner, currentRace.winnerTime)
  if (currentRace.winner) alert(`Winner is ${(await API.getCar(currentRace.winner)).garageCar?.name}, time ${currentRace.winnerTime}s`);
}

export async function stopAnimateRace() {
  const pageCars = currentRace.results;
  if (pageCars) {
    pageCars.forEach((car) => {
      const raceCar = document.querySelector(`.img${car[0]}`);
      console.log(raceCar);
      if (raceCar instanceof HTMLElement) {
        raceCar.getAnimations().forEach((animation) => {
          console.log(animation);
          animation.cancel();
        });
      }
    });
  }
}

async function saveWinner(winner: number, winnerTime: number) {
  const prevWinner = (await API.getWinner(winner));
  if (prevWinner.status === 200) {
    if (prevWinner.winnerCar?.time)
       winnerTime < prevWinner.winnerCar?.time ? winnerTime : prevWinner.winnerCar?.time
    if (prevWinner.winnerCar?.wins ) await API.updateWinner({ id: winner, wins: prevWinner.winnerCar.wins + 1, time: winnerTime })
  } else {
    await API.createWinner({id: winner, wins: 1, time: winnerTime })
  }
}
