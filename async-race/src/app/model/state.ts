import { CarParams, Options } from './API';

export type Garage = {
  carsCount: number;
  page: number;
  maxPage?: number;
  cars?: CarParams[];
};

export const currentGarage: Garage = {
  carsCount: 0,
  page: 0,
};

type Race = {
  carsCount: number;
  results?: (number | undefined)[][];
  winner?: number;
  winnerTime?: number;
};

export const currentRace: Race = {
  carsCount: 0,
};

export type Winner = {
  carName: string,
  carColor: string,
  wins: number,
  time: number
};

export interface Winners {
  [id: number]: Winner
}

export const winnerList: Winners = {
};

export type WinnersView = {
  carsCount: number;
  page: number;
  maxPage?: number;
  cars?: Winners,
  sortParams?: Options
};

export const currentWinners: WinnersView = {
  carsCount: 0,
  page: 0,
};
