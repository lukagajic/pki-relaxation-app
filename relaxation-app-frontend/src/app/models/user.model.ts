export class User {
    id?: string;
    forename: string;
    surname: string;
    email: string;
    password: string;
    city: string;
    bornAt: Date;
    role?: 'user' |'admin';
    interests: 'sports' | 'music' | 'fun' | 'theatre';
    joinedEvents?;
    address: string;
}
