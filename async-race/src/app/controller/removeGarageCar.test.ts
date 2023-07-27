import { FetchMock } from 'jest-fetch-mock';
import { deleteWinner } from './removeGarageCar';

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
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
