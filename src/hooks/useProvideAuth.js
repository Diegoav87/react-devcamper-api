import React, { useState, useEffect } from "react";

import axiosInstance from "../helpers/axios";

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getUser = () => {
        setLoading(true);
        axiosInstance
            .get("accounts/get-user/")
            .then((res) => {
                if (res.data.user) {
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    return {
        user,
        loading,
        isAuthenticated,
        getUser
    }
}

export default useProvideAuth;