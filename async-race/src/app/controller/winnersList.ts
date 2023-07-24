import { API } from '../model/API';
import { currentWinners, winnerList } from '../model/state';

export default async function updateWinnersList() {
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
