import { CarParams, API } from '../model/API';
import makeRandomCar from '../utils/randomCar';
import { currentWinners, winnerList } from '../model/state';

export async function createNewCar() {
  const carName = document.querySelector('.createName');
  const carColor = document.querySelector('.createColor');
  if ((carName instanceof HTMLInputElement) && (carColor instanceof HTMLInputElement)) {
    const newCar: CarParams = {
      name: carName.value, color: carColor.value,
    };
    await API.createCar(newCar);
    carName.value = '';
    carColor.value = '#000000';
  }
}

export async function generateCars() {
  let i = 0;
  const randCars = [];
  while (i < 100) {
    const newCar = makeRandomCar();
    randCars.push(newCar);
    i += 1;
  }
  await Promise.all(randCars.map((car) => API.createCar(car)));
}

export async function deleteWinner(id: number) {
  delete winnerList[id];
  await API.deleteWinner(id);
  updateWinnersList();
}

export async function removeGarageCar(event: Event) {
  if (event) {
    const tar = event.target;
    if (tar instanceof Element) {
      const parent = tar.parentElement;
      if (parent) {
        const { id } = parent;
        await API.deleteCar(Number(id));
        await deleteWinner(Number(id));
      }
    }
  }
}

export async function updateWinnersList() {
  const winners = await API.getWinners();
  const winList:number[] = [];
  winners.forEach((win) => {
    if (win?.id) {
      winList.push(win.id);
    }
  });
  const params = await Promise.all(winList.map((win) => API.getCar(win)));
  for (let i = 0; i < params.length; i += 1) {
    const color = params[i].garageCar?.color;
    const carName = params[i].garageCar?.name;
    if (color && carName) {
      winnerList[winList[i]] = {
        carColor: color,
        carName,
        wins: winners[i].wins,
        time: winners[i].time,
      };
    }
  }
  currentWinners.cars = winnerList;
  currentWinners.maxPage = Math.ceil(winList.length / 10);
}

export async function saveWinner(winner: number, winnerTime: number) {
  const prevWinner = (await API.getWinner(winner));
  if (prevWinner.status === 200) {
    if (prevWinner.winnerCar?.wins && prevWinner.winnerCar?.time && winnerTime) {
      await API.updateWinner({
        id: winner,
        wins: prevWinner.winnerCar.wins + 1,
        time: Math.min(winnerTime, prevWinner.winnerCar.time),
      });
    }
  } else {
    await API.createWinner({ id: winner, wins: 1, time: winnerTime });
  }
  const winnerName = (await API.getCar(winner)).garageCar;
  if (winner in winnerList) {
    winnerList[winner].wins += 1;
    winnerList[winner].time = Math.min(winnerTime, winnerList[winner].time);
  } else if (winnerName) {
    winnerList[winner] = {
      carColor: winnerName.name,
      carName: winnerName.name,
      wins: 1,
      time: winnerTime,
    };
  }
}
