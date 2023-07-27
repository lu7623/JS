import makeRandomCar from './randomCar';

describe('Random car creation test', () => {
  test('Car name to be from 3 parts, color to be 6 digit hex', () => {
    const car = makeRandomCar();

    expect(car.name.split(' ').length).toEqual(3);
    expect(car.color.length).toEqual(7);
  });
});
