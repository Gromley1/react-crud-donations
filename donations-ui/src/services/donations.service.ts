import axios, { AxiosPromise, AxiosResponse } from 'axios';
import {AddDonatonRequet, Donation, GetDonationsResponse } from './models';

export const getDonations = (page: number): AxiosPromise<AxiosResponse<GetDonationsResponse>> => {
	return axios.get(`api/donations?page=${page}`)
	    .then((res: AxiosResponse<GetDonationsResponse>) => res)
	    .catch(err => err)
} 

export const deleteDonation = (id: string): AxiosPromise<AxiosResponse<any>> => {
    return axios.delete(`api/donations/${id}`)
        .then((resp: AxiosResponse<any>) => resp)
        .catch(err => err)
}

export const addDonation = (request: any): AxiosPromise<AxiosResponse<any>> => {
    return axios.post('api/donations', request)
        .then((resp: AxiosResponse<any>) => resp)
        .catch(err => err)
}