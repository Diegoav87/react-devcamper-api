import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import LatestBootcamps from '../components/LatestBootcamps';
import * as yup from "yup";
import axiosInstance from '../helpers/axios';
import { toast } from 'react-toastify';
import handleError from "../helpers/axiosErrorHandler";

const Home = () => {
    const [bootcamps, setBootcamps] = useState();
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        zipcode: "",
        km: ""
    })

    const validFormSchema = yup.object().shape({
        zipcode: yup.string().required("Please enter a zipcode"),
        km: yup.number().min(1).required("Please enter the kilometers")
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getLatestBootcamps();
    }, [])

    const getLatestBootcamps = (e) => {
        axiosInstance
            .get('bootcamps/get-latest-bootcamps/')
            .then(res => {
                console.log(res.data);
                setBootcamps(res.data);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    const submitLocationForm = (e) => {
        e.preventDefault();

        validFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    axiosInstance
                        .get(`bootcamps/get-bootcamps-within-radius/${formData.km}/${formData.zipcode}/`)
                        .then(res => {
                            console.log(res);
                            setBootcamps(res.data);
                            setLoading(false);
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

            <section className="showcase">
                <div className="dark-overlay">
                    <div className="showcase-inner container">
                        <h1 className="display-4">Find a Code Bootcamp</h1>
                        <p className="lead">
                            Find, rate and read reviews on coding bootcamps
                        </p>
                        <form onSubmit={submitLocationForm}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="km"
                                            placeholder="Radius in Kilometers"
                                            value={formData.km}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            className="form-control"
                                            name="zipcode"
                                            placeholder="Zipcode or Address"
                                            value={formData.zipcode}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Find Bootcamps</button>
                        </form>
                    </div>
                </div>
            </section>

            {loading ? <Spinner /> : (
                <LatestBootcamps bootcamps={bootcamps} />
            )}
        </div>
    )
}

export default Home
