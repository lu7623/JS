import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '3ced0750fb544de691945d4559e4b04f', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
