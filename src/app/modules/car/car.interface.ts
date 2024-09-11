export interface ICar {
    name: string;
    model: string;
    year: number;
    totalPassengers: number;
    images: string[];
    totalDoors: number;
    description: string;
    color: string;
    isElectric: boolean;
    carType: string;
    status: 'available' | 'unavailable';
    features: string[];
    additionalFeatures: string[];
    pricePerHour: number;
    isDeleted: boolean;
}
