import { screen } from '@testing-library/dom';
import { disablePrevNext } from './disablePrevNext';

describe('Disable pagination buttons', () => {
  test('Buttons to be disabled', () => {
    document.body.innerHTML = '<button class="pagination prev-garage">Prev</button>;<button class="pagination next-garage">Next</button>';
    disablePrevNext({ prev: true, next: true, section: 'garage' });

    const prev = screen.getByText('Prev');
    const next = screen.getByText('Next');

    expect(prev).toBeDisabled();
    expect(next).toBeDisabled();
  });
});
