import React, { useContext, useState } from 'react';
import BillingTable from './BillingTable';
import { HiPlus } from "react-icons/hi"
import Modal from '../../Component/Modal/Modal';
import { UserContext } from '../../Context/UserContext';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const Billing = () => {

    const { setTotalPaid, user } = useContext(UserContext);
    const [active, setActive] = useState(0);
    const chooseActive = (num) => {
        setActive(num);
        refetch();
    }
    const [showModal, setShowModal] = useState(null);
    const url = `https://power-hack-server-tau.vercel.app/billing-list?email=${user}&page=${active}`;


    //Fetch Billing Data
    const { data = {}, isLoading, refetch } = useQuery({
        queryKey: ['billing', user.email, active, setActive],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('access-token')}`
                }
            })
            const data = await res.json()
            return data;
        }
    });

    if (isLoading) {
        return <div className='h-screen flex justify-center items-center text-4xl font-bold text-red-500'>Loading...</div>
    }


    setTotalPaid(data.totalPaid);
    const totalData = data.totalBills;
    const pages = Math.ceil(totalData / 10);


    const handleSearch = (e) => {
        const search = e.target.value;
        // console.log(search);
    }



    const addBillingData = (data) => {


        fetch("https://power-hack-server-tau.vercel.app/add-billing", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(billingData => {
                if (billingData.success) {
                    refetch();
                    toast.success('Successfully added!')
                }
                else {
                    toast.error("Cannot Add Billing")
                }
            })
    };



    return (
        <div className='container mt-4 mx-auto'>
            {/* Table header and searchbar */}
            <div className="navbar bg-red-500">
                <div className="flex-1">
                    <p className="normal-case text-xl font-semibold text-white">Billing</p>
                </div>
                <div className="flex-1 gap-2">
                    <form className="form-control" onChange={handleSearch}>
                        <input type="text" placeholder="Search" className="input input-bordered rounded-md" />
                    </form>
                </div>
                <label htmlFor="my-modal" className='btn btn-primary rounded-md' onClick={() => setShowModal(1)}>Add New  <HiPlus className='ml-1' /> </label>
            </div>
            {/* Billing Table  */}
            <BillingTable data={data.billingData} refetch={refetch} />

            {/* Pagination  */}
            {
                <div className='flex justify-center gap-2 mt-4 mb-12'>
                    {
                        pages > 1 &&
                        [...Array(pages).keys()].map(num => <button key={num} onClick={(() => { chooseActive(num) })} className={`btn btn-square bg-base-100 hover:bg-red-600 hover:text-white shadow-md border-none ${num === active && 'bg-red-500 text-white'}`}> {num + 1}</button>)

                    }
                </div>
            }
            {
                showModal &&
                <Modal refetch={refetch} setShowModal={setShowModal} addBillingData={addBillingData} />
            }

        </div >
    );
};

export default Billing;