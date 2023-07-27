import { FetchMock } from 'jest-fetch-mock';
import createNewCar from './createNewCar';

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
