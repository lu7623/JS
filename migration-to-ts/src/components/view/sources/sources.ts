import './sources.css';
import { sourceAPI } from '../../../types';

class Sources {
    draw(data: sourceAPI[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp !== null) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
                if (sourceClone !== null) {
                    const sourceItemName = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName) sourceItemName.textContent = item.name;
                    const sourceItemID = sourceClone.querySelector('.source__item');
                    if (sourceItemID) sourceItemID.setAttribute('data-source-id', item.id);
                    fragment.append(sourceClone);
                }
            });
        }
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
