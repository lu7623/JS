import { Request, RequestOptions, RequestOptionsBase, RequestMethod } from '../../types';

type Options = RequestOptions & RequestOptionsBase;

class Loader {
    constructor(private baseLink: string, private options: RequestOptionsBase) {}

    protected getResp<T>({ endpoint, options }: Request, callback: (data: T) => void) {
        this.load<T>('GET', endpoint, callback, options);
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
    load<T>(method: RequestMethod, endpoint: string, callback: (data: T) => void, options: RequestOptions = {}) {
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
// import { options } from '../../types';
// import { allSources } from '../../types';
// import { Responce } from '../../types';

// class Loader {
//     constructor(private baseLink: string, private options: options) {}

//     getResp(
//         { endpoint, options = {} },
//         callback = () => {
//             console.error('No callback for GET response');
//         }
//     ) {
//         this.load('GET', endpoint, callback, options);
//     }

//     errorHandler(res) {
//         if (!res.ok) {
//             if (res.status === 401 || res.status === 404)
//                 console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
//             throw Error(res.statusText);
//         }
// console.log(res);
//         return res;
//     }

//     makeUrl(options: options, endpoint: string) : string {
//         const urlOptions = { ...this.options, ...options };
//         let url:string = `${this.baseLink}${endpoint}?`;

//         Object.keys(urlOptions).forEach((key) => {
//             url += `${key}=${urlOptions[key]}&`;
//         });
//         return url.slice(0, -1);
//     }

//     load(method: string, endpoint: string, callback: (data: allSources | Responce) => void, options = {}) {
//         fetch(this.makeUrl(options, endpoint), { method })
//             .then(this.errorHandler)
//             .then((res) => res.json())
//             .then((data) => callback(data))
//             .catch((err) => console.error(err));
//     }
// }

// export default Loader;
