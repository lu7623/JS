import { API } from '../model/API';
import { currentGarage, currentRace, winnerList } from '../model/state';
import { paginationView, viewWinnerWindow } from '../view/garage/garage';

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
  const buttons = document.querySelectorAll('button');
  buttons.forEach((btn) => btn.disabled = true);
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
  }
  currentRace.results = winners;
  buttons.forEach((btn) => btn.disabled = false);
  if (currentRace.winner && currentRace.winnerTime) {
    await saveWinner(currentRace.winner, currentRace.winnerTime)
    viewWinnerWindow(winnerList[currentRace.winner]);
  }
}

export async function stopAnimateRace() {
  const pageCars = currentRace.results;
  if (pageCars) {
    pageCars.forEach((car) => {
      const raceCar = document.querySelector(`.img${car[0]}`);
      if (raceCar instanceof HTMLElement) {
        raceCar.remove;
      }
    });
    paginationView();
  }
}

export async function saveWinner(winner: number, winnerTime: number) {
  const prevWinner = (await API.getWinner(winner));
  if (prevWinner.status === 200) {
    if (prevWinner.winnerCar?.wins && prevWinner.winnerCar?.time) await API.updateWinner({ id: winner, wins: prevWinner.winnerCar?.wins + 1, time: Math.min( winnerTime, prevWinner.winnerCar.time) })
  } else {
    await API.createWinner({id: winner, wins: 1, time: winnerTime })
  }
  const winnerName = (await API.getCar(winner)).garageCar;
  if (winner in winnerList) {
    winnerList[winner].wins += 1;
    winnerList[winner].time = Math.min(winnerTime, winnerList[winner].time);
  } else {
    if (winnerName)
    winnerList[winner] = {
      carColor: winnerName.name,
      carName: winnerName.name,
      wins: 1,
      time: winnerTime
    }
}

}
