import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Spinner from '../components/Spinner';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axiosInstance from '../helpers/axios';
import { toast } from 'react-toastify';
import { getBootcamp } from '../helpers/bootcamps';

const Reviews = () => {
    const { id } = useParams();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bootcamp, setBootcamp] = useState(null);

    const getReviews = () => {
        axiosInstance
            .get(`reviews/bootcamp/${id}`)
            .then(res => {
                console.log(res.data);
                setReviews(res.data);
            })
            .catch(err => {
                console.log(err.response);
                toast.error("Something went wrong")
            })
    }

    useEffect(() => {
        getReviews();
        getBootcamp(setBootcamp, setLoading, id);
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Navbar />
            <section className="bootcamp mt-5 mb-5">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8">
                            <Link
                                to={`/bootcamps/${id}`}
                                className="btn btn-secondary my-3"
                            ><i className="fas fa-chevron-left"></i> Bootcamp Info</Link>

                            <h1 className="mb-4">{bootcamp.name} Reviews</h1>

                            {reviews.length > 0 ? reviews.map(review => {
                                return (
                                    <div className="card mb-3">
                                        <h5 className="card-header bg-dark text-white">{review.title}</h5>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Rating: <span className="text-success">{review.rating}</span>
                                            </h5>
                                            <p className="card-text">
                                                {review.text}
                                            </p>
                                            <p className="text-muted">Writtern By {review.user.username}</p>
                                        </div>
                                    </div>
                                )
                            }) : (
                                <p>This bootcamp has no reviews yet</p>
                            )}
                        </div>

                        <div className="col-md-4">

                            <h1 className="text-center my-4">
                                <span
                                    className="badge badge-secondary badge-success rounded-circle p-3"
                                >{bootcamp.average_rating}</span
                                >
                                Rating
                            </h1>

                            <Link to={`/add-review/${id}`} className="btn btn-primary btn-block my-3"
                            ><i className="fas fa-pencil-alt"></i> Review This Bootcamp</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Reviews
