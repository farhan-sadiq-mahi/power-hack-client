import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('');
    const [createdEmail, setCreatedEmail] = useState('');
    const [token] = useToken(createdEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }


    const handleSignUp = (data) => {
        setSignUPError('');
        fetch('https://power-hack-server-tau.vercel.app/registration', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(signUpData => {
                if (signUpData.acknowledged) {
                    localStorage.setItem('user', 1);
                    localStorage.setItem('userMail', data.email);
                    setCreatedEmail(data.email);
                    toast.success("Successfully Register");
                }
                else {
                    setSignUPError(signUpData.message);
                }
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-96 p-7 shadow-lg rounded-lg'>
                <p className="text-xl logo text-center">Power Hack</p>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>

            </div>
        </div>
    );
};

export default SignUp;