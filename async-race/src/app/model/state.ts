import { CarParams } from './API';

type Garage = {
  carsCount: number,
  page: number,
  maxPage?: number,
  cars?: CarParams[]
};

export const currentGarage:Garage = {
  carsCount: 0,
  page: 0,
};
