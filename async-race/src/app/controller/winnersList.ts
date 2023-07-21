import { API, WinnerParams } from '../model/API';
import { winnerList } from '../model/state';

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
}

export async function deleteWinner(id: number) {
  delete winnerList[id];
  await API.deleteWinner(id);
  updateWinnersList();
}

export async function updateWinner(param: WinnerParams) {
  await API.updateWinner(param);
  updateWinnersList();
}
