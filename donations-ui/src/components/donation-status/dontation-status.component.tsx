import { ReactElement } from "react";
import { DonationStatusType } from '../../shared/enums';
import styles from './donation-status.module.scss';
import classnames from 'classnames'

interface DonationStatusProps {
    status: string;
}

export const DonationStatus = ({ status }: DonationStatusProps): ReactElement => {
    const isStatusSuccessful = status === DonationStatusType[2]

    return (
        <>
            <div className={classnames(styles.status, {
                [styles['status--success']]: isStatusSuccessful 
            })}>
                <p className={styles.status__text}>
                    {status}
                </p>
            </ div>
        </>
    );
};