import { Request, RequestOptions, Method, RequestOptionsAPI } from '../../types';

type Options = RequestOptions & RequestOptionsAPI;

class Loader {
    constructor(private baseLink: string, private options: RequestOptionsAPI) {}

    protected getResp<T>({ endpoint, options }: Request, callback: (data: T) => void) {
        this.load<T>(Method.get, endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (res.ok === false) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: Options = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }
    protected load<T>(method: Method, endpoint: string, callback: (data: T) => void, options: RequestOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => {
                callback(data);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
