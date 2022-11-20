import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classnames from 'classnames'

import styles from './add-donation.module.scss';

interface AddDonationProps {
    onSubmit: (data: any) => void
}

export const AddDonation = ({ onSubmit }: AddDonationProps): ReactElement => {
    const schema = yup.object().shape({
        donor: yup.string().required('Donor is required'),
        amount: yup.number().required('Amont is required').positive().integer(),
        status: yup.string().required('status is Required'),
        comment: yup.string()
    })


    const { register, handleSubmit, reset, trigger, formState: { errors, isValid}} = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const onCreateDonation = (data: any): void => {
        onSubmit(data)
        reset();
    }
    
    return (
        <>
            <h2>Create New Donation</h2>
            <form className={styles.form} onSubmit={handleSubmit((data) => onCreateDonation(data))}>
                <div className={styles.form__column}>

                    <div className={styles.form__group}>
                        <label htmlFor="donor" className={styles.form__label}>
                            Donor
                        </label>

                        <input id="donor" 
                            type="text" 
                            className={classnames(styles.form__input, {
                                [styles['form__input--error']]: errors.donor
                            })} 
                            {...register('donor')} 
                            aria-invalid={errors.donor ? "true" : "false"}/>

                            {errors.donor && (
                                <p className={styles.form__error} role="alert">
                                    {<span>{errors.donor.message?.toString()}</span>}
                                </p>
                            )}
                    </div>

                    <div className={styles.form__group}>
                        <label htmlFor="amount" className={styles.form__label}>
                            Donation
                        </label>

                        <input id="amount" 
                            type="number" 
                            className={styles.form__input} 
                            {...register('amount')} 
                            aria-invalid={errors.amount ? "true" : "false"} />

                        {errors.amount && (
                            <p className={styles.form__error} role="alert">
                                {errors.amount.type === "typeError" && <span>This is required</span>}
                                {errors.amount.type === "min" && <span>{errors.amount.message?.toString()}</span>}
                            </p>
                        )}
                    </div>
                
                    <div className={styles.form__group}>
                        <label htmlFor="status" className={styles.form__label}>Status</label>

                        <select id="status" 
                            {...register('status')}
                            className={styles.form__input} 
                            aria-invalid={errors.amount ? "true" : "false"}>

                            <option value="">Select status</option>
                            <option value="pending">Pending</option>
                            <option value="successful">Successful</option>
                            <option value="failed">Failed</option>
                        </select>

                        {errors.status && (
                            <p className={styles.form__error} role="alert">
                                {<span>{errors.status.message?.toString()}</span>}
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles.form__column}>
                    <div className={styles.form__group}>
                        <label htmlFor="comment" className={styles.form__label}>
                            Status
                        </label>
                        <textarea id="comment"  {...register('comment')}  className={classnames(styles.form__input, styles['form__input--textarea'])} />
                    </div>

                    <div className={styles.form__actions}>
                        <button type='submit' 
                            className={styles.form__submitBtn}
                            disabled={!isValid}>
                            Create Donation
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}