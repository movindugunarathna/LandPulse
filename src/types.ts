export interface UserData {
    userId?: number;
    username?: string;
    fullName?: string;
    email?: string;
    contactNumber?: string;
    password?: string;
    passwordRepeat?: string;
}

export interface AdData {
    adId?: number;
    title?: string;
    description?: string;
    locationURL?: string;
    landImages?: string[];
    price?: number;
    userId?: number;
    isSold?: boolean;
    createdDate?: Date;
    modifiedDate?: Date;
}