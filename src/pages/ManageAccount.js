import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import axiosInstance from '../helpers/axios';
import * as yup from "yup";
import { toast } from 'react-toastify';
import handleError from '../helpers/axiosErrorHandler';

const ManageAccount = () => {
    const auth = useAuth();

    const [formData, setFormData] = useState({
        username: auth.user.username,
        email: auth.user.email
    })

    const userFormSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        email: yup
            .string()
            .email("Invalid Email Format")
            .required("Email is required"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitForm = (e) => {
        e.preventDefault();

        userFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    axiosInstance
                        .put("accounts/edit-user/", formData)
                        .then(res => {
                            console.log(res.data);
                            toast.success("User edited")
                        })
                        .catch(err => {
                            handleError(err);
                        })
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div>
            <Navbar />
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h1 className="mb-2">Manage Account</h1>
                                <form onSubmit={submitForm}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="Username"
                                            onChange={handleInputChange}
                                            value={formData.username}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Email"
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    type="submit"
                                                    value="Save"
                                                    className="btn btn-success btn-block"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Link
                                                    to="/update-password"
                                                    className="btn btn-secondary btn-block"
                                                >Update Password</Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ManageAccount;
