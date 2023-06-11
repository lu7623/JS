export interface Responce {
    author: string;
    title: string;
    description: string;
    source: {
        id: string;
        name: string;
    };
    url: string;
    urlToImage: string;
    content: string;
    publishedAt: string;
}
