import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import * as yup from "yup";
import axiosInstance from '../helpers/axios';
import { toast } from 'react-toastify';
import handleError from '../helpers/axiosErrorHandler';

import { Link } from 'react-router-dom';

const RequestPasswordReset = () => {

    const [formData, setFormData] = useState({ email: "" })

    const emailFormSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendResetPasswordRequest = (e) => {
        e.preventDefault();

        emailFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("auth/users/reset_password/", formData)
                        .then((res) => {
                            console.log(res.data);
                            toast.success("An email was sent to you with further instructions")
                        })
                        .catch((err) => {
                            handleError(err);
                        });
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    return (
        <div>
            <Navbar />
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <Link to="/login">Back to login</Link>
                                <h1 className="mb-2">Reset Password</h1>
                                <p>	Use this form to reset your password using the registered email address.</p>
                                <form onSubmit={sendResetPasswordRequest}>
                                    <div className="form-group">
                                        <label>Enter Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email address"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Reset Password"
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

export default RequestPasswordReset
