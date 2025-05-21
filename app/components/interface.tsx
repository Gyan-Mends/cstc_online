export interface ContactInterface {
    _id: string,
    name: string,
    email: string,
    phone: string,
    message: string,
}

export interface ContactResponse {
    success: boolean;
    message: string;
}

export interface LoginInterface {
    _id: string,
    email: string,
    password: string,
}

export interface UsersInterface {
    fullName: string;
    email: string;
    phone: string;
    position: string;
    password: string;
    base64Image?: string;
    image?: File;
}

export interface BlogInterface {
    _id: string
    title: string
    description: string
    category: string
    admin: string
}

export interface CategoryInterface {
    _id: string;
    name: string
    description: string
    admin: string
}
