const BASE_URL = 'http://127.0.0.1:3000/';

type CarStatus = 'started' | 'stopped' | 'drive';

export type CarParams = {
  id?: number;
  name: string;
  color: string;
};

type Options = {
  _page?: number;
  _limit?: number;
  _sort?: 'id' | 'wins' | 'time';
  _order?: 'ASC' | 'DESC';
};

type WinnerParams = {
  id?: number;
  wins: number;
  time: number;
};

type Code = 200 | 201 | 400 | 404 | 429 | 500;

type Race = {
  'velocity': 64,
  'distance': 500000
};

interface GarageApi {
  status: Code,
  garageCar?: CarParams
}

interface RaceApi {
  status: Code,
  engineCar?: Race
}

interface DriveApi {
  status: Code,
  success?: boolean
}
interface WinnerApi {
  status: Code,
  winnerCar?: WinnerParams
}

export const API = {
  async getAllCars():Promise<CarParams[]> {
    const url = `${BASE_URL}garage`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(res.headers);
    const garage: CarParams[] = [];
    for (let i = 0; i < data.length; i += 1) {
      garage.push({ id: data[i].id, name: data[i].name, color: data[i].color });
    }
    console.log(garage);
    return garage;
  },
  async getCar(id: number):Promise<GarageApi> {
    const url = `${BASE_URL}garage/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const resCode = res.status as Code;
    if (resCode !== 200) return { status: resCode };
    const car: CarParams = { id: data.id, name: data.name, color: data.color };
    console.log(car);
    return { status: resCode, garageCar: car };
  },
  async createCar(param: CarParams):Promise<GarageApi> {
    const url = `${BASE_URL}garage/`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    });
    const data = await res.json();
    const resCode = res.status as Code;
    const car: CarParams = { id: data.id, name: data.name, color: data.color };
    console.log(car);
    return { status: resCode, garageCar: car };
  },
  async deleteCar(id: number):Promise<Code> {
    const url = `${BASE_URL}garage/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    const resCode = res.status as Code;
    return resCode;
  },
  async updateCar(param: CarParams):Promise<GarageApi> {
    const url = `${BASE_URL}garage/${param.id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    });
    const data = await res.json();
    const resCode = res.status as Code;
    if (resCode !== 200) return { status: resCode };
    const car: CarParams = { id: data.id, name: data.name, color: data.color };
    console.log({ status: resCode, garageCar: car });
    return { status: resCode, garageCar: car };
  },
  async startEngineCar(id: number, status: CarStatus):Promise<RaceApi> {
    const url = `${BASE_URL}engine?id=${id}&status=${status}`;
    const res = await fetch(url, {
      method: 'PATCH',
    });
    const resCode = res.status as Code;
    if (resCode !== 200) return { status: resCode };
    const data = await res.json();
    return {
      status: resCode,
      engineCar: {
        velocity: data.velocity,
        distance: data.distance,
      },
    };
  },
  driveCar: async function driveCar(id: number, status = 'drive'):Promise<DriveApi> {
    const url = `${BASE_URL}engine?id=${id}&status=${status}`;
    const res = await fetch(url, {
      method: 'PATCH',
    });
    const resCode = res.status as Code;
    if (resCode !== 200) return { status: resCode };
    const data = await res.json();
    return { status: resCode, success: data.success };
  },
  async getWinners(optional?: Options):Promise<WinnerParams[]> {
    let url = `${BASE_URL}winners`;
    if (optional) {
      url += '?';
      Object.entries(optional).forEach((key, value) => { url += `&${key}=${value}`; });
    }
    const res = await fetch(url, {
      method: 'GET',
    });
    const data = await res.json();
    const winners: WinnerParams[] = [];
    for (let i = 0; i < data.length; i += 1) {
      winners.push({ id: data[i].id, wins: data[i].wins, time: data[i].time });
    }
    console.log(winners);
    return winners;
  },
  getWinner: async function getWinner(id: number):Promise<WinnerApi> {
    const url = `${BASE_URL}winners/${id}`;
    const res = await fetch(url);
    const resCode = res.status as Code;
    if (resCode !== 200) return { status: resCode };
    const data = await res.json();
    return { status: resCode, winnerCar: { id: data.id, wins: data.wins, time: data.time } };
  },
  async createWinner(param: WinnerParams):Promise<WinnerApi> {
    const url = `${BASE_URL}winners`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    });
    const resCode = res.status as Code;
    if (resCode !== 200) return { status: resCode };
    const data = await res.json();
    return { status: resCode, winnerCar: { id: data.id, wins: data.wins, time: data.time } };
  },
  async deleteWinner(id: number):Promise<Code> {
    const url = `${BASE_URL}winners/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    const resCode = res.status as Code;
    return resCode;
  },
  async updateWinner(param: WinnerParams):Promise<WinnerApi> {
    const url = `${BASE_URL}winners/${param.id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wins: param.wins,
        time: param.time,
      }),
    });
    const resCode = res.status as Code;
    if (resCode !== 200) return { status: resCode };
    const data = await res.json();
    return { status: resCode, winnerCar: { id: data.id, wins: data.wins, time: data.time } };
  },
};

export default API;

// API.getCar(4)
//  API.createCar({ name: "volvo", color: "#444444" });
// API.deleteCar(8);
// API.updateCar( {id: 8, name: 'oka', color: '#000000' });
//  API.startEngineCar(1, 'started');
// API.driveCar(1);
// API.getWinners({_sort: 'id'});
//  API.getWinner(1);
// API.createWinner({ id: 10, wins: 2, time: 10 });
//  API.deleteWinner(10);
// API.updateWinner( {id: 1, time: 99, wins: 7 });
