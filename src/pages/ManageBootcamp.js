import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Bootcamp from "../components/Bootcamps/Bootcamp";

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import axiosInstance from '../helpers/axios';

const ManageBootcamp = () => {
    const [bootcamp, setBootcamp] = useState(null);
    const [loading, setLoading] = useState(true);

    const getBootcamp = () => {
        axiosInstance
            .get("bootcamps/get-bootcamp-for-user/")
            .then(res => {
                console.log(res.data);
                setBootcamp(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response);
                setBootcamp(null);
                setLoading(false);
            })
    }

    useEffect(() => {
        getBootcamp();
    }, [])

    if (loading) {
        return <Spinner />
    }

    const deleteBootcamp = () => {
        axiosInstance
            .delete(`bootcamps/delete-bootcamp/${bootcamp.id}/`)
            .then(res => {
                console.log(res.data);
                toast.success("Bootcamp deleted");
                getBootcamp();
            })
            .catch(err => {
                console.log(err.response);
                toast.error("Something went wrong, please try again");
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
                                <h1 className="mb-4">Manage Bootcamp</h1>
                                {bootcamp ? (
                                    <React.Fragment>
                                        <Bootcamp bootcamp={bootcamp} />
                                        <form className="mb-4">
                                            <div className="form-group">
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        name="photo"
                                                        className="custom-file-input"
                                                        id="photo"
                                                    />
                                                    <label className="custom-file-label" for="photo"
                                                    >Add Bootcamp Image</label
                                                    >
                                                </div>
                                            </div>
                                            <input type="submit" className="btn btn-light btn-block" value="Upload Image" />
                                        </form>
                                        <a href="add-bootcamp.html" className="btn btn-primary btn-block"
                                        >Edit Bootcamp Details</a
                                        >
                                        <a href="manage-courses.html" className="btn btn-secondary btn-block"
                                        >Manage Courses</a
                                        >
                                        <a href="#" data-toggle="modal" data-target="#exampleModal" className="btn btn-danger btn-block">Remove Bootcamp</a>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <p className="lead">
                                            You have not yet added a bootcamp
                                        </p>
                                        <Link to="/add-bootcamp" className="btn btn-primary btn-block">
                                            Add Bootcamp

                                        </Link>
                                    </React.Fragment>
                                )}

                                <p className="text-muted mt-5">
                                    * You can only add one bootcamp per account.
                                </p>
                                <p className="text-muted">
                                    * You must be affiliated with the bootcamp in some way in order
                                    to add it to DevCamper.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete bootcamp</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            This action is permament and can not be reversed
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Keep Bootcamp</button>
                            <button onClick={deleteBootcamp} type="button" className="btn btn-primary">Delete bootcamp</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ManageBootcamp
