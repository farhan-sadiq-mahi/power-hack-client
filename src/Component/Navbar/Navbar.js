import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const Navbar = () => {

    const navigate = useNavigate();
    const { totalPaid } = useContext(UserContext);




    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userMail');
        navigate('/');
    }


    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <p className="btn btn-ghost normal-case text-xl logo">Power Hack</p>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <h1>Total Paid $<span>{totalPaid ? totalPaid : 0}</span></h1>
                    </div>
                    <div className="dropdown dropdown-end">
                        <button className='btn btn-warning rounded-md mx-4' onClick={logOut}>Log Out</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;