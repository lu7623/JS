import AppLoader from './appLoader';

class AppController extends AppLoader {
    protected getSources<T>(callback: (data: T) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    protected getNews<T>(e: Event, callback: (data: T) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId) {
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                }
                return;
            }
            if (target.parentElement) target = target.parentElement;
        }
    }
}

export default AppController;
