export interface Event {
    _id?: string;
    name: string;
    description: string;
    category: 'sports' | 'movies' | 'music' | 'fun' | 'theatre';
    city: 'Beograd' | 'Nis' | 'Novi Sad' | 'Subotica' | 'Kragujevac';
    address: string;
    startsAt: Date;
    endsAt: Date;
    rating?: number;
    expectedAttendance: number;
    status?: 'Active' | 'Cancelled' | 'Regular';
}
