import { basicView } from './base/base';
import { garageView } from './garage/garage';
import { winnersView } from './winners/winners';

export default function generateApp() {
  basicView();
  garageView();
  winnersView();
}
