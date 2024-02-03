export interface News {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string | null;
}

export type NewsWithoutId = Omit<News, 'id'>

export interface Comments {
    id: string;
    newsId: string;
    author: string;
    comment: string;
}

export type CommentWithoutId = Omit<Comments, 'id'>

export interface Data {
    news: News[];
    comments: Comments[];
}