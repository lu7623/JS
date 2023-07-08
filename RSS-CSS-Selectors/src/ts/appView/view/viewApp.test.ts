import { viewOnWin } from './viewApp';
import { screen } from '@testing-library/dom';

describe('View on win test', () => {
    test('Modal window visible', () => {
        viewOnWin();

        const win = screen.getByTestId('win');
        expect(win).toBeVisible();
    });
});
