import { levelParams } from '../../model/levels';
import { node2Elements, tableChange } from './table';

describe('Node2Elements test', () => {
    test('table elements creating from node', () => {
        const table = document.createElement('div');

        node2Elements(levelParams[3].node, table);

        expect(table).toContainHTML('sushi');
        expect(table).toContainHTML('plate');
        expect(table).not.toContainHTML('wasabi');
    });
});

describe('Table elem test', () => {
    test('table on 10 lvl contains needed elements', () => {
        const table = document.createElement('div');

        tableChange(9, table);

        expect(table).toContainHTML('sushi');
        expect(table).toContainHTML('plate');
        expect(table).toContainHTML('roll');
    });
});
