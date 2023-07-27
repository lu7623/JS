import { FetchMock } from 'jest-fetch-mock';
import generateCars from './generateCars';

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

it('generate 100 Cars test', async () => {
  fetchMock.mockResponse(JSON.stringify({
    name: 'Tesla',
    color: '#e6e6fa',
    id: 1,
  }));

  generateCars();

  expect(fetchMock.mock.calls.length).toEqual(100);
});
