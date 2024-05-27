export interface Photo {
    id: number;
    path: string;
}

export interface Pet {
    id: number;
    name: string;
    gender: string;
    breed: string;
    weight: string;
    age: string;
    location: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    photos: Photo[];
    photoUrls?: string[];
} 

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    pets: Pet[];
}

export interface Like {
    id: number;
    user1Id: number;
    user2Id: number;
    user: User;
}

export interface LikesResponse {
    mislikes: Like[];
    losqlikequemedan: Like[];
}

export interface ChatRoom {
    id: number;
    user1: User;
    user2: User;
    messages: Message[];
    createdAt: string;
}

export interface Message {
    id: number;
    content: string;
    sender: User;
    chatRoom: ChatRoom;
    createdAt: string;
}