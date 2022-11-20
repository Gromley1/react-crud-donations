import { ReactElement, ReactNode, useEffect, useState } from "react";
import { getDonations, deleteDonation, addDonation } from "../../services/donations.service";
import { AddDonatonRequet, Donation, GetDonationsResponse } from "../../services/models";
import { DonationStatus } from "../donation-status/dontation-status.component";
import { centsToDollars } from "../../shared/helpers";
import { FaRegTrashAlt } from 'react-icons/fa'

import styles from './donations.module.scss';
import { AddDonation } from "../add-donation/add-donation.component";

interface AddDonationFormData {
    donor: string;
    amount: number;
    status: string;
    comment: string;
}

export const Donations = (): ReactElement => {
    const [donationsData, setDonationsData] = useState<GetDonationsResponse>();

    const handleGetDonations = () =>  {
        getDonations(1)
            .then((resp) => {
                setDonationsData(resp?.data?.data)
            })
    }

    useEffect(() => {
        handleGetDonations()
    }, [])

    const onDeleteDonation = (id: string): void => {
        deleteDonation(id)
            .then(resp => {
                if (resp.request.status === 200) {
                    const donations = donationsData?.donations?.filter(x => x.id !== id);
                    setDonationsData({...donationsData, donations}) 
                }
            })
        }

    const onCreateDonation = (data: AddDonationFormData): void => {
        const request = {
                data: {
                    donation: {...data}
                }
            }

        addDonation(request)
            .then(resp => {
                if (resp.status === 200) {
                    handleGetDonations();
                }
            })
    }

    const renderTableData = (): ReactNode => {
        let content = null;

        if (donationsData) {
            content = donationsData?.donations?.map((x) => {
                const { id, timestamp, donor, status, amount, comment} = x;
    
                return (
                    <tr key={id} className={styles.table__row}>
                        <td className={styles.table__data}>{timestamp.toString()}</td>
                        <td className={styles.table__data}>{donor}</td>
                        <td className={styles.table__data}><DonationStatus status={status} /></td>
                        <td className={styles.table__data}>{centsToDollars(amount)}</td>
                        <td className={styles.table__data}>{comment}</td>
                        <td className={styles.table__data}><FaRegTrashAlt tabIndex={1} className={styles.table__delete} onClick={() => onDeleteDonation(x.id)}/></ td>
                    </tr>
                )
            })
        }

        return content;
    }

    const renderTableHeaders = (): ReactNode => {
        const headers = ['Date', 'Donor', 'Status', 'Amount', 'Comment'];

        return headers.map((x, index) => <th key={`${index} ${x}`} className={styles.table__header}>{x}</th>)
    }

    const totalInCents = donationsData?.donations 
        ? donationsData.donations.map(x => x.amount).reduce((a, b) => a + b)
        : 0;


    return (
        <>
            <div className={styles.donations}>
                <h1>Donations</h1>
                <AddDonation onSubmit={(data: any) => onCreateDonation(data as AddDonationFormData)}/>

                <h2>Existing Donations</ h2>
                <table className={styles.table}>
                    <tbody>
                        <tr>{renderTableHeaders()}</ tr>
                        {renderTableData()}
                    </ tbody>
                </ table>

                <p className={styles.total}>
                    Total Donations: <span className={styles.total__count}>{centsToDollars(totalInCents)}</span>
                </p>
            </ div>
        </>
    )
}