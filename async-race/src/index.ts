import { API } from './app/model/API';
import generateApp from './app/view/view';
import './main.scss';

generateApp();
for (let i = 5; i < 71; i++) {
     API.deleteCar(i);
}

API.deleteCar(74);