export interface Donation {
    id: string;
    amount: number;
    comment: string;
    donor: string;
    status: string;
    timestamp: Date;
}