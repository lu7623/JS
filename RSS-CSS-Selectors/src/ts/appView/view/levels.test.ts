import { screen } from '@testing-library/dom';
import { levelChange } from './levels';

describe('Lvls description test', () => {
    test('Description for lvl 2 to be open', () => {
        document.body.innerHTML = `<ul class="level-list">
        <li>
            <h3 class="level-name" data-testid="lvl-name">Level 1</h3>
            <p class="level-description level-description-hidden" data-testid="lvl-desc">
                description
            </p>
        </li>
        <li>
            <h3 class="level-name" data-testid="lvl-name">Level 2</h3>
            <p class="level-description level-description-hidden" data-testid="lvl-desc">
                description
            </p>
        </li>
        </ul>`;

        levelChange(1);
        const levelsDescription = screen.getAllByTestId('lvl-desc');
        const levelsName = screen.getAllByTestId('lvl-name');

        expect(levelsName[1]).toHaveClass('level-checked');
        expect(levelsDescription[1]).not.toHaveClass('level-description-hidden');
        expect(levelsDescription[1]).toHaveClass('level-description-open');
        expect(levelsDescription[0]).not.toHaveClass('level-description-open');
    });
});
