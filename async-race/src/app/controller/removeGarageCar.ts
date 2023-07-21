import { API } from '../model/API';
import { paginationView } from '../view/garage/garage';
import { deleteWinner } from './winnersList';

export default async function removeGarageCar(event: Event) {
  if (event) {
    const tar = event.target;
    if (tar instanceof Element) {
      const parent = tar.parentElement;
      if (parent) {
        const { id } = parent;
        await API.deleteCar(Number(id));
        deleteWinner(Number(id));
      }
    }
  }
  paginationView();
 
}
