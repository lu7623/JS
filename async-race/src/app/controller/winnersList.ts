import { API, WinnerParams } from "../model/API";
import { winnerList } from "../model/state";

export async function updateWinnersList() {
  const winners = await API.getWinners();
  for (let i = 0; i < winners.length; i += 1) {
    if (winners[i]?.id) {
      const params = await API.getCar(Number(winners[i].id));
      if (params.garageCar) {
        winnerList[Number(winners[i].id)] = {
          carColor: params.garageCar?.color,
          carName: params.garageCar.name,
          wins: winners[i].wins,
          time: winners[i].time,
        };
      }
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



