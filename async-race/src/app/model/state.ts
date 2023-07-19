import { CarParams, WinnerParams } from './API';

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

type Race = {
    carsCount: number,
  results?: (number | undefined)[][],
    winner?: number
}

export const currentRace: Race = {
    carsCount: 0,
}
