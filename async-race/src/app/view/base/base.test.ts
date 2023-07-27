import { screen } from '@testing-library/dom';
import { basicView, garageVisible } from './base';

describe('Basic view test', () => {
  test('basic view visible', () => {
    basicView();
    const title = screen.getByText('Retro async race');
    const year = screen.getByText('2023');

    expect(title).toBeVisible();
    expect(year).toBeVisible();
  });
});

describe('Winners table on garage view to be hidden', () => {
  test('winners view hidden', () => {
    document.body.innerHTML = `<div class = "garage hidden" data-testid = "garage"> </div>;
      <div class = "panel hidden"> </div>;
      <div class = "winners" data-testid = "winners"> </div>`;

    garageVisible();
    const win = screen.getByTestId('winners');
    const garage = screen.getByTestId('garage');

    expect(win).toHaveClass('hidden');
    expect(garage).not.toHaveClass('hidden');
  });
});
