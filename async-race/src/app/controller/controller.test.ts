import { FetchMock } from 'jest-fetch-mock';
import { createNewCar, deleteWinner, generateCars } from './controller';

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Create new car test', () => {
  test('new car send to server', () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      name: 'New Red Car',
      color: '#ff0000',
      id: 10,
    }));
    document.body.innerHTML = `<input class="createName" type="text" value = "Tesla">;
    <input class="createColor" type="color" value = "#000000">`;

    createNewCar();

    expect(fetchMock.mock.calls[0][1]?.body).toEqual(JSON.stringify({
      name: 'Tesla',
      color: '#000000',
    }));
  });
});

describe('Create 100 new car test', () => {
  it('to generate 100 cars', async () => {
    fetchMock.mockResponse(JSON.stringify({
      name: 'Tesla',
      color: '#e6e6fa',
      id: 1,
    }));

    generateCars();

    expect(fetchMock.mock.calls.length).toEqual(100);
  });
});

describe('Winners table view test', () => {
  test('Winners table be visible', () => {
    fetchMock.mockResponse(JSON.stringify([{
      id: 1,
      wins: 2,
      time: 2.55,
    },
    {
      id: 2,
      wins: 3,
      time: 5.55,
    },
    ]));

    deleteWinner(1);

    expect(fetchMock.mock.calls[0][1]?.method).toEqual('DELETE');
    expect(fetchMock.mock.calls[0][0]).toEqual('http://127.0.0.1:3000/winners/1');
  });
});
