import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({ onSubmit, error }) => {
    const { register, handleSubmit } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
            <input type="text" placeholder="Full Name" className="input input-bordered input-error w-full rounded-md" {...register("fullName")} required />
            <input type="email" placeholder="Email" className="input input-bordered input-error w-full rounded-md" {...register("email")} required />
            <input type="number" placeholder="Phone Number" className="input input-bordered input-error w-full rounded-md" {...register("phone")} required />
            <input type="number" placeholder="Payable Amount" className="input input-bordered input-error w-full rounded-md" {...register("payableAmount")} required />

            {
                error && <p className='text-red-300'>{error}</p>
            }


            <input htmlFor="my-modal" type="submit" placeholder='Add Billing' className='btn bg-red-600 border-none text-white rounded-md hover:bg-red-700 mt-8' />

        </form>
    );
};

export default Form;