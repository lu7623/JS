import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources<T>(callback: (data: T) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: (data: T) => void) {
        if (e.target instanceof HTMLElement) {
            let target = e.target;
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
}

export default AppController;
