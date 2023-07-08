import { levelParams } from '../model/levels';
import { currentState } from '../model/state';
import { getHelp, spellCheck, targetCheck } from './controller';
import { screen } from '@testing-library/dom';

describe('Spell check function test', () => {
    test('check answer for lvl 1', () => {
        expect(spellCheck('rice', levelParams[0].answer)).toBe(true);
    });
    test('check answer for lvl 2', () => {
        expect(spellCheck('#spice', levelParams[1].answer)).toBe(false);
    });
});

describe('Target check function test', () => {
    test('check answer for lvl 9', () => {
        document.body.innerHTML = `<board>
        <wasabi></wasabi>
        <plate>
          <roll class="target"></roll>
          <roll class="target"></roll>
          <roll class="target"></roll>
        </plate>
        <sushi class="tuna"></sushi>
        <roll></roll>
        </board>`;

        expect(targetCheck('plate>roll', levelParams[8].answer)).toBe(true);
        expect(targetCheck('plate>rollllll', levelParams[8].answer)).toBe(false);
    });
});

describe('Help function test', () => {
    test('to show right answer and add helpUsed', () => {
        document.body.innerHTML = `
          <button class="help-btn"  data-testid = "btn"></button>
          <input type="text" id="answer" data-testid = "input">`;
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('btn');

        getHelp();
        button.click();

        expect(currentState.helpUsed).toHaveLength(1);
        expect(input).toHaveClass('help');
        expect(input).toHaveValue('rice');
    });
});
