import "./main.scss";

const BASE_URL = "http://127.0.0.1:3000/";

type carStatus = "started" | "stopped" | "drive";

type carParams = {
  id?: number;
  name: string;
  color: string;
};

type options = {
  _page?: number;
  _limit?: number;
  _sort?: "id" | "wins" | "time";
  _order?: "ASC" | "DESC";
};

type winnerParams = {
  id?: number;
  wins: number;
  time: number;
};

async function getAllCars() {
  const url = `${BASE_URL}garage`;
  const res = await fetch(url);
  const data = await res.json();
  for (let i = 0; i < data.length; i += 1) {
    console.log(data[i].id, data[i].name, data[i].color);
  }
}

//  getAllCars();

async function getCar(id: number) {
  const url = `${BASE_URL}garage/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.id, data.name, data.color);
}

//  getCar(1);

async function createCar(param: carParams) {
  const url = `${BASE_URL}garage/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
  const data = await res.json();
  console.log(data.id, data.name, data.color);
}

//  createCar({ name: "volvo", color: "#444444" });

async function deleteCar(id: number) {
  const url = `${BASE_URL}garage/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log(data.id, data.name, data.color);
}

//  deleteCar(5);

async function updateCar(id: number, param: carParams) {
  const url = `${BASE_URL}garage/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
  const data = await res.json();
  console.log(data.id, data.name, data.color);
}

//  updateCar(1, { name: 'oka', color: '#000000' });

async function startEngineCar(id: number, status: carStatus) {
  const url = `${BASE_URL}engine?id=${id}&status=${status}`;
  const res = await fetch(url, {
    method: "PATCH",
  });
  const data = await res.json();
  console.log(data.velocity, data.distance, data);
}

//  startEngineCar(1, 'started');

async function driveCar(id: number, status = "drive") {
  const url = `${BASE_URL}engine?id=${id}&status=${status}`;
  const res = await fetch(url, {
    method: "PATCH",
  });
  const data = await res.json();
  console.log(data.success);
}

// driveCar(1);

async function getWinners(optional?: options) {
  let url = `${BASE_URL}winners`;
  if (optional) {
    url += "?";
    for (const [key, value] of Object.entries(optional)) {
      url += `&${key}=${value}`;
    }
  }
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data.id, data.wins, data.time);
}

//  getWinners({_sort: 'id'});

async function getWinner(id: number) {
  const url = `${BASE_URL}winners/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.id, data.wins, data.time);
}

//  getWinner(1);

async function createWinner(param: winnerParams) {
  const url = `${BASE_URL}winners`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
  const data = await res.json();
  console.log(data.id, data.wins, data.time);
}

createWinner({ id: 10, wins: 2, time: 10 });

async function deleteWinner(id: number) {
  const url = `${BASE_URL}winners/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log(data.id, data.name, data.color);
}

//  deleteWinner(10);

async function updateWinner(id: number, param: winnerParams) {
  const url = `${BASE_URL}winners/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wins: param.wins,
      time: param.time,
    }),
  });
  const data = await res.json();
  console.log(data.id, data.wins, data.time);
}

//  updateWinner(10, { time: 100, wins: 7 });
