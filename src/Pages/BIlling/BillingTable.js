import React from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-hot-toast';


const BillingTable = ({ data, refetch }) => {

    const handleDelete = (id) => {
        fetch(`https://power-hack-server-tau.vercel.app/delete-billing/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                    toast.success('Successfully Deleted')
                }


                // console.log(data)
            })
    }



    return (
        <div className="overflow-x-auto rounded-none">
            <table className="table table-zebra w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Billing ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Paid Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(bill => <tr key={bill._id}>
                            <td>{bill._id ? bill._id : 'Generating ID'}</td>
                            <td>{bill.fullName}</td>
                            <td>{bill.email}</td>
                            <td>{bill.phone}</td>
                            <td>{bill.payableAmount}</td>
                            <td><MdOutlineDelete className='inline cursor-pointer' onClick={() => { handleDelete(bill._id) }} /> | <FiEdit className='inline cursor-pointer' /></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default BillingTable;