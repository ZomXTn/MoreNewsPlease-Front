interface IUser {
    user_name: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    adress: string;
    id?: number;
    email: string;
    is_first_login?: boolean;
    is_active?: boolean;
    is_staff?: boolean;
    algorithm: string;
}

interface ICategory {
    id: number;
    name: string;
}

interface INewspaper {
    newspaper_id?: string;
    name: string;
    avatar_url: string;
}

interface IArticle {
    article_id?: string;
    title: string;
    descritpion: string;
    publication_date: string;
    image_url?: string;
    author: string;
    content: string;
    newspaper: INewspaper;
    article_interactions?: IInteraction[];
    categories: ICategory[];
    newspaper_id?: string;
    categories_ids?: number[];
}

interface IInteraction {
    id: number;
    article: IArticle;
    interaction_type: string;
    timestamp: string;
    rating: number;
    opinion: string;
    share: string;
    user: number;
}



export type { IUser, IInteraction, IArticle, INewspaper, ICategory };




