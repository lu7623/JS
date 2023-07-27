import { screen } from '@testing-library/dom';
import { FetchMock } from 'jest-fetch-mock';
import { sortByParams, viewWinnerCar, winnersView } from './winners';
import { Winner } from '../../model/state';

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('View winner car test', () => {
  test('Winner car to be visible', () => {
    document.body.innerHTML = '<div class = "winners-list"> </div>';

    const car:Winner = {
      carColor: '#ffffff', carName: 'Tesla', wins: 1, time: 10,
    };
    viewWinnerCar(2, car);
    const win = screen.getByText('Tesla');

    expect(win).toBeVisible();
  });
});

describe('Sort by params test', () => {
  it('winners sorting check', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, wins: 2, time: 2.5 },
      { id: 2, wins: 1, time: 4 },
      { id: 3, wins: 1, time: 3 }]));

    const a = await sortByParams({
      page: 1, limit: 10, sort: 'time', order: 'ASC',
    });

    expect(a[0]).toEqual({ id: 1, wins: 2, time: 2.5 });
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'http://127.0.0.1:3000/winners?&_page=1&_limit=10&_sort=time&_order=ASC',
    );
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
    document.body.innerHTML = '<div class = "main-container"> </div>';

    winnersView();
    const prev = screen.getByText('Prev');
    const time = screen.getByText('Best time');
    const winners = screen.getByText('Winners');

    expect(time).toBeVisible();
    expect(winners).toBeVisible();
    expect(prev).toBeDisabled();
  });
});
