import { CarParams, WinnerParams } from './API';

type Garage = {
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


type Winner = {
  carName: string,
  carColor: string, 
  wins: number,
  time: number
}

export interface Winners {
  [id: number]: Winner
}

export const winnerList: Winners = {
  1: {
    carName: "Tesla",
    carColor: "#e6e6fa",
    wins: 1,
    time: 10
  }
}