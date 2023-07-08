import { levelParams } from '../../model/levels';
import { htmlChange, node2Text } from './html';

describe('Node2Text test', () => {
    test('HTML code elements creating from node', () => {
        const table = document.createElement('div');

        node2Text(levelParams[4].node, table);

        expect(table).toContainHTML('sushi');
        expect(table).not.toContainHTML('plate');
        expect(table).toContainHTML('wasabi');
    });
});

describe('Code html elem test', () => {
    test('html on 12 lvl contains needed elements', () => {
        const code = document.createElement('div');

        htmlChange(11, code);

        expect(code).not.toContainHTML('sushi');
        expect(code).toContainHTML('plate');
        expect(code).toContainHTML('roll');
    });
});
