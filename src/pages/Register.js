import React, { useState } from 'react'
import Navbar from '../components/Navbar';

import { useNavigate } from "react-router-dom";

import axiosInstance from '../helpers/axios';
import * as yup from "yup";
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })

    const registerFormSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must have at least 8 characters"),
        password2: yup
            .string()
            .required("Password confirmation is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        registerFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("accounts/register/", formData)
                        .then((res) => {
                            console.log(res.data);
                            toast.success("User registered");
                            navigate("/login");

                            //   axiosInstance
                            //     .post("auth/token", {
                            //       email: formData.email,
                            //       password: formData.password,
                            //     })
                            //     .then((loginRes) => {
                            //       console.log(loginRes.data);
                            //       localStorage.setItem("access_token", loginRes.data.access);
                            //       localStorage.setItem("refresh_token", loginRes.data.refresh);
                            //       axiosInstance.defaults.headers["Authorization"] =
                            //         "JWT " + localStorage.getItem("access_token");
                            //       addToast("Login Successful", { appearance: "success" });
                            //       history.push("/home");
                            //       history.go();
                            //     })
                            //     .catch((err) => {
                            //       console.log(err.response);
                            //       addToast("Unable to login user", { appearance: "error" })
                            //     });
                        })
                        .catch((err) => {
                            console.log(err.response)

                            if (err.response.status === 400) {
                                Object.keys(err.response.data.errors).forEach(key => {
                                    err.response.data.errors[key].forEach(error => {
                                        toast.error(error);
                                    })
                                })
                            } else {
                                toast.error("Something went wrong, please try again later")
                            }


                        });
                }
            })
            .catch((err) => {
                console.log(err.message);
                toast.error(err.message);
            });
    }

    return (
        <div>
            <Navbar />
            <section class="form mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="card bg-white p-4 mb-4 mt-4">
                                <div className="card-body">
                                    <h1><i className="fas fa-user-plus"></i> Register</h1>
                                    <p>
                                        Register to list your bootcamp or rate, review and favorite
                                        bootcamps
                                    </p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                placeholder="Enter username"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
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
                                        <div className="form-group">
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
                                        <div className="form-group mb-4">
                                            <label htmlFor="password2">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="password2"
                                                className="form-control"
                                                placeholder="Confirm password"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="card card-body mb-3">
                                            <h5>User Role</h5>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="role"
                                                    value="user"
                                                    checked
                                                />
                                                <label className="form-check-label">
                                                    Regular User (Browse, Write reviews, etc)
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="role"
                                                    value="publisher"
                                                />
                                                <label className="form-check-label">
                                                    Bootcamp Publisher
                                                </label>
                                            </div>
                                        </div>
                                        <p className="text-danger">
                                            * You must be affiliated with the bootcamp in some way in
                                            order to add it to DevCamper.
                                        </p>
                                        <div className="form-group">
                                            <input
                                                type="submit"
                                                value="Register"
                                                className="btn btn-primary btn-block"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register
