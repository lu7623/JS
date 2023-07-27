import { screen } from '@testing-library/dom';
import { FetchMock } from 'jest-fetch-mock';
import {
  disableButton, paginationView, upgradeFromInput, viewGarageCar, viewWinnerWindow,
} from './garage';
import { Garage } from '../../model/state';
import { API } from '../../model/API';

const currentGarage: Garage = {
  page: 0,
  carsCount: 3,
};

describe('View on win test', () => {
  test('Modal window visible', () => {
    viewWinnerWindow({
      carColor: '#ffffff',
      carName: 'Tesla',
      wins: 1,
      time: 10,
    });
    const win = screen.getByText('Winner is Tesla, time 10');

    expect(win).toBeVisible();
  });
});

const fetchMock = fetch as FetchMock;
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Upgrade name and color from input test', () => {
  it('update Car test', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        name: 'New Red Car',
        color: '#ff0000',
        id: 10,
      }),
    );
    document.body.innerHTML = `<input class="upgradeName" type="text" value = "Tesla">;
      <input class="upgradeColor" type="color" value = "#000000">`;

    upgradeFromInput({
      id: 10,
      name: 'Volvo',
      color: '#ffffff',
    });

    expect(fetchMock.mock.calls[0][1]?.method).toEqual('PUT');
    expect(fetchMock.mock.calls[0][1]?.body).toEqual(
      JSON.stringify({
        id: 10,
        color: '#000000',
        name: 'Tesla',
      }),
    );
  });
});

describe('View garage car test', () => {
  test('Garage car to be visible', () => {
    document.body.innerHTML = '<div class = "garage-container"> </div>';

    viewGarageCar({
      id: 3,
      color: '#000000',
      name: 'Mazda',
    });
    const car = screen.getByText('Mazda');

    expect(car).toBeVisible();
  });
});

describe('Disable start/stop buttons', () => {
  test('Button A to be disabled', () => {
    document.body.innerHTML = `<div class="car1">;
    <button class="a">A</button>;
    <button class="b" disabled>B</button>;
    </div>`;
    disableButton(1, 'a', 'b');

    const a = screen.getByText('A');
    const b = screen.getByText('B');

    expect(a).toBeDisabled();
    expect(b).not.toBeDisabled();
  });
});

describe('Pagination view test', () => {
  it('pagination page to view correctly', async () => {
    fetchMock.mockResponse(
      JSON.stringify([{
        id: 1,
        color: '#000000',
        name: 'Mazda',
      }, {
        id: 2,
        color: '#000f00',
        name: 'BMW',
      },
      {
        id: 3,
        color: '#000f00',
        name: 'KIA',
      }]),
    );
    document.body.innerHTML = `
    <div class = "garage-container"> </div>
      <span class="page-number" data-testid = "page-number"></span>;
      <span class="all-cars" data-testid = "all-cars"></span>;
      <button class="pagination prev-garage">Prev</button>;
      <button class="pagination next-garage">Next</button>`;

    paginationView();
    const car = (await API.getAllCars())[0];
    const car1 = screen.getByText('Mazda');
    const car2 = screen.getByText('KIA');
    const car3 = screen.getByText('BMW');
    const next = screen.getByText('Next');
    const allCars = screen.getByTestId('all-cars');
    const pageNum = screen.getByTestId('page-number');

    expect(car?.id).toEqual(1);
    expect(car1).toBeVisible();
    expect(car2).toBeVisible();
    expect(car3).toBeVisible();
    expect(currentGarage.carsCount).toEqual(3);
    expect(next).toBeDisabled();
    expect(allCars).toHaveTextContent('3');
    expect(pageNum).toHaveTextContent('1');
  });
});
