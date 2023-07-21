import { API } from '../model/API';
import { winnerList } from '../model/state';

export default async function saveWinner(winner: number, winnerTime: number) {
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
