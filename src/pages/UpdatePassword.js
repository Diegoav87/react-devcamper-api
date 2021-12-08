import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import useAuth from '../hooks/useAuth';
import axiosInstance from '../helpers/axios';
import * as yup from "yup";
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router';

import handleError from '../helpers/axiosErrorHandler';

const UpdatePassword = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        old_password: "",
        password: "",
        password2: ""
    })

    const passwordFormSchema = yup.object().shape({
        old_password: yup.string().required("Old password is required"),
        password: yup
            .string()
            .required("New password is required")
            .min(8, "Password must have at least 8 characters"),
        password2: yup
            .string()
            .required("Password confirmation is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitPassword = (e) => {
        e.preventDefault();

        passwordFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    axiosInstance
                        .put(`accounts/change-password/${auth.user.id}/`, formData)
                        .then(res => {
                            console.log(res.data);
                            toast.success("Password updated");
                            navigate("/manage-account")
                        })
                        .catch(err => {
                            handleError(err);
                        })
                }
            })
            .catch(err => {
                toast.error(err.message);
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
                                <h1 className="mb-2">Update Password</h1>
                                <form onSubmit={submitPassword}>
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input
                                            type="password"
                                            name="old_password"
                                            className="form-control"
                                            placeholder="Current Password"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="New Password"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="password2"
                                            className="form-control"
                                            placeholder="Confirm New Password"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Update Password"
                                            className="btn btn-dark btn-block"
                                        />

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

export default UpdatePassword
