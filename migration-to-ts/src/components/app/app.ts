import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { allSources } from '../../types';
import { Responce } from '../../types';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sources = document.querySelector('.sources');
        if (sources)
            sources.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: Responce) => this.view.drawNews(data))
            );
        this.controller.getSources((data: allSources) => this.view.drawSources(data));
    }
}

export default App;
