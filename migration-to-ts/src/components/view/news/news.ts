import './news.css';
import { Article } from '../../../types';

class News {
    public draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp !== null) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
                if (idx % 2) {
                    const newsItemElement: HTMLElement | null = newsClone.querySelector('.news__item');
                    if (newsItemElement) {
                        newsItemElement.classList.add('alt');
                    }
                }
                const newsMetaPhotoElement: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
                if (newsMetaPhotoElement) {
                    newsMetaPhotoElement.style.backgroundImage = `url(${
                        item.urlToImage || '../img/news_placeholder.jpg'
                    })`;
                }
                const newsAuthorElement: HTMLElement | null = newsClone.querySelector('.news__meta-author');
                if (newsAuthorElement) {
                    newsAuthorElement.textContent = item.author || item.source.name;
                }
                const newsDateElement: HTMLElement | null = newsClone.querySelector('.news__meta-date');
                if (newsDateElement) {
                    newsDateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }
                const newsDescriptionElement: HTMLElement | null = newsClone.querySelector('.news__description-title');
                if (newsDescriptionElement) {
                    newsDescriptionElement.textContent = item.title;
                }
                const newsSourceElement: HTMLElement | null = newsClone.querySelector('.news__description-source');
                if (newsSourceElement) {
                    newsSourceElement.textContent = item.source.name;
                }
                const newsContentElement: HTMLElement | null = newsClone.querySelector('.news__description-content');
                if (newsContentElement) {
                    newsContentElement.textContent = item.description;
                }
                const newsMoreElement: HTMLElement | null = newsClone.querySelector('.news__read-more a');
                if (newsMoreElement) {
                    newsMoreElement.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            });
        }
        const newsElem = document.querySelector('.news');
        if (newsElem !== null) {
            newsElem.innerHTML = '';
            newsElem.appendChild(fragment);
        }
    }
}

export default News;
