import React, { useState } from 'react'
import Navbar from '../components/Navbar';

import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleError from '../helpers/axiosErrorHandler';
import axiosInstance from '../helpers/axios';


const ResetPasswordConfirm = () => {
    let { uid, token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        password_confirm: "",
    });

    const passwordFormSchema = yup.object().shape({
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must have at least 8 characters"),
        password_confirm: yup
            .string()
            .required("Password is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendResetPasswordConfirmation = (e) => {
        e.preventDefault();

        passwordFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("auth/users/reset_password_confirm/", {
                            uid: uid,
                            token: token,
                            new_password: formData.password,
                            re_new_password: formData.password_confirm,
                        })
                        .then((res) => {
                            console.log(res.data);
                            toast.success("Password reseted correctly")
                            navigate("/login");
                        })
                        .catch((err) => {
                            handleError(err);
                        });
                }
            })
            .catch(function (err) {
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
                                <h1 className="mb-2">Reset Password</h1>
                                <form onSubmit={sendResetPasswordConfirmation}>
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
                                            name="password_confirm"
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

export default ResetPasswordConfirm
