import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '9c57e05e8c474bd383c2276313637128', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
