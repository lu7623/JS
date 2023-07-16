import { currentGarage } from '../model/state';
import { paginationView } from '../view/garage/garage';

export function onPrev() {
  if (currentGarage.page > 0) {
    currentGarage.page -= 1;
    paginationView();
  }
}

export function onNext() {
  if (currentGarage.maxPage) {
    if (currentGarage.page < currentGarage.maxPage - 1) {
      currentGarage.page += 1;
    }
    paginationView();
  }
}
