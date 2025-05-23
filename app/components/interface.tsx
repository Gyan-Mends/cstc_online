export interface ContactInterface {
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    number: string,
    company:string,
    description:string
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
    name: string
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
export interface TrainingResponse {
    success: boolean;
    message: string;
}

export interface TrainingInterface {
    _id: string;
    title: string;
    description: string;
    date: string;
    duration: string;
    format: string;
    image: string;
    client: string;
}

export interface EventInterface {
    _id: string;
    title: string;
    description: string;
    date: string;
    duration: string;
    location: string;
    image: string;
}

