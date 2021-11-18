import React, { useState, createContext } from "react";

import useProvideAuth from "../hooks/useProvideAuth";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    )
}
