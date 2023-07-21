import { FetchMock } from 'jest-fetch-mock';
import { API } from './API';

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

it('get Car test', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    name: 'Tesla',
    color: '#e6e6fa',
    id: 1,
  }));

  const car = (await API.getCar(3)).garageCar;

  expect(car?.name).toEqual('Tesla');
});

it('get All Cars test', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([{
    name: 'Tesla',
    color: '#e6e6fa',
    id: 1,
  },
  {
    name: 'BMW',
    color: '#000000',
    id: 2,
  },
  ]));

  const car = (await API.getAllCars())[1];

  expect(car?.name).toEqual('BMW');
});

it('update Car test', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    name: 'New Red Car',
    color: '#ff0000',
    id: 10,
  }));

  await API.updateCar({
    name: 'Volvo',
    color: '#ffffff',
    id: 10,
  });

  expect(fetchMock.mock.calls[0][1]?.method).toEqual('PUT');
  expect(fetchMock.mock.calls[0][1]?.body).toEqual(JSON.stringify({
    name: 'Volvo',
    color: '#ffffff',
    id: 10,
  }));
});

it('Returns status if wrong id', async () => {
  fetchMock.mockResponse(JSON.stringify({
    name: 'New Red Car',
    color: '#ff0000',
    id: 10,
  }), {
    status: 404,
    statusText: 'Car with such id was not found in the garage.',
  });

  const carCode = (await API.deleteCar(9));

  expect(carCode).toEqual(404);
});
