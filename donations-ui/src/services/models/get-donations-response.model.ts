import { Donation } from "./donation.model";

export interface GetDonationsResponse {
    donations?: Donation[];
    page?: number;
    page_size?: number;
    total?: number;
}