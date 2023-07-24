import { API } from '../model/API';
import { winnerList } from '../model/state';
import updateWinnersList from './winnersList';

async function deleteWinner(id: number) {
  delete winnerList[id];
  await API.deleteWinner(id);
  updateWinnersList();
}

export default async function removeGarageCar(event: Event) {
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
