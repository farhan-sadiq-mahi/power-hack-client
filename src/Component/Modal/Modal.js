import React, { useContext, useState } from 'react';
import { ImCross } from 'react-icons/im'
import { UserContext } from '../../Context/UserContext';
import Form from '../Form/Form';

const Modal = ({ setShowModal, refetch, addBillingData }) => {

    const { user } = useContext(UserContext);
    const [error, setError] = useState(null);


    const onSubmit = data => {

        if (data.phone.length < 11) {
            setError("Phone Number Can't be less then 11 numbers")
        }
        else if (data.phone.length > 11) {
            setError("Phone Number Can't be more then 11 numbers")
        }
        else {
            data.user = user;
            data.addedTime = new Date();
            addBillingData(data);
            refetch();
            setError(null);
            setShowModal(null);
        }

    };

    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className='flex items-center justify-between mb-8'>
                        <h3 className="font-bold text-3xl text-center">Add New Billing</h3>
                        <div className="modal-action">
                            <label htmlFor="my-modal" className="btn-sm cursor-pointer"><ImCross /></label>
                        </div>
                    </div>


                    {/* <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
                        <input type="text" placeholder="Full Name" className="input input-bordered input-error w-full rounded-md" {...register("fullName")} required />
                        <input type="email" placeholder="Email" className="input input-bordered input-error w-full rounded-md" {...register("email")} required />
                        <input type="number" placeholder="Phone Number" className="input input-bordered input-error w-full rounded-md" {...register("phone")} required />
                        <input type="number" placeholder="Payable Amount" className="input input-bordered input-error w-full rounded-md" {...register("payableAmount")} required />

                        {
                            error && <p className='text-red-300'>{error}</p>
                        }


                        <input htmlFor="my-modal" type="submit" placeholder='Add Billing' className='btn bg-red-600 border-none text-white rounded-md hover:bg-red-700 mt-8' />

                    </form> */}
                    <Form onSubmit={onSubmit} error={error}></Form>

                </div>
            </div>
        </div>
    );
};

export default Modal;