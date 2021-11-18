import React, { useState } from 'react'
import Navbar from '../components/Navbar';

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';

import useAuth from '../hooks/useAuth';

import axiosInstance from '../helpers/axios';
import * as yup from "yup";
import { toast } from 'react-toastify';

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ email: "", password: "" })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const loginFormSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid Email Format")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        loginFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    axiosInstance
                        .post("token/", formData)
                        .then((res) => {
                            console.log(res.data);
                            localStorage.setItem("access_token", res.data.access);
                            localStorage.setItem("refresh_token", res.data.refresh);
                            axiosInstance.defaults.headers["Authorization"] =
                                "JWT " + localStorage.getItem("access_token");
                            toast.success("Login successful");
                            auth.getUser();
                            navigate(location.state?.from === undefined ? "/" : location.state.from.pathname, { replace: true });
                        })
                        .catch((err) => {
                            console.log(err.response);
                            toast.error("Invalid credentials");
                        });
                }
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message);
            })


    };

    return (
        <div>
            <Navbar />
            <section className="form mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="card bg-white p-4 mb-4 mt-4">
                                <div className="card-body">
                                    <h1><i className="fas fa-sign-in-alt"></i> Login</h1>
                                    <p>
                                        Log in to list your bootcamp or rate, review and favorite
                                        bootcamps
                                    </p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter password"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="submit"
                                                value="Login"
                                                className="btn btn-primary btn-block"
                                            />
                                        </div>
                                    </form>
                                    <p>	Forgot Password? <a href="reset-password.html">Reset Password</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
