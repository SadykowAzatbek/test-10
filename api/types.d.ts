export interface News {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string | null;
}

export type NewsWithoutId = Omit<News, 'id'>