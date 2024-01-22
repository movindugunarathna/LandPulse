export interface UserData {
    userId?: number;
    username?: string;
    fullName?: string;
    email?: string;
    number?: string;
    password?: string;
    passwordRepeat?: string;
}

export interface AdData {
    adId?: string;
    title?: string;
    desc?: string;
    locationURL?: string;
    img?: string[];
    price?: number;
    userId?: number;
    sold?: boolean;
    createdDate?: Date;
    modifiedDate?: Date;

}