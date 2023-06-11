export interface Responce {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

export interface sourceAPI {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface allSources {
    status: string;
    sources: sourceAPI[];
}
