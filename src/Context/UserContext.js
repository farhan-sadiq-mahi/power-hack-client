import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [totalPaid, setTotalPaid] = useState(0);
    const user = localStorage.getItem("userMail");


    const authInfo = {
        user,
        totalPaid,
        setTotalPaid
    }
    return (
        <UserContext.Provider value={authInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthProvider;