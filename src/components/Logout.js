import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

import { useNavigate } from "react-router";

import axiosInstance from "../helpers/axios";

import useAuth from '../hooks/useAuth';


export default function Logout() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const response = axiosInstance.post("accounts/logout/", {
            refresh_token: localStorage.getItem("refresh_token"),
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers["Authorization"] = null;
        auth.getUser();
        navigate("/");
    });
    return <Spinner />;
}