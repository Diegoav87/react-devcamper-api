import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';

import { toast } from 'react-toastify';
import axiosInstance from '../helpers/axios';
import { Link } from 'react-router-dom';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewId, setReviewId] = useState(null)

    const getReviews = () => {
        axiosInstance
            .get("reviews/get-reviews-for-user/")
            .then(res => {
                console.log(res.data);
                setReviews(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response);
                setLoading(false);
            })
    }

    useEffect(() => {
        getReviews();
    }, [])

    if (loading) {
        return <Spinner />
    }

    const deleteReview = () => {
        axiosInstance
            .delete(`reviews/delete-review/${reviewId}/`)
            .then(res => {
                console.log(res.data);
                toast.success("Review deleted");
                getReviews();
            })
            .catch(err => {
                console.log(err.response);
                toast.error("Something went wrong, please try again");
            })
    }

    const changeReviewId = (id) => {
        setReviewId(id);
    }

    return (
        <div>
            <Navbar />
            <section className="container mt-5">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h1 className="mb-4">Manage Reviews</h1>
                                {reviews.length > 0 ? (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Bootcamp</th>
                                                <th scope="col">Rating</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reviews.map(review => {
                                                return (
                                                    <tr>
                                                        <td>{review.bootcamp.name}</td>
                                                        <td>{review.rating}</td>
                                                        <td>
                                                            <Link to={`/edit-review/${review.id}`} className="btn btn-secondary"
                                                            ><i className="fas fa-pencil-alt"></i></Link>
                                                            <button onClick={() => changeReviewId(review.id)} className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>You have not made any reviews yet</p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            This action is permament and can not be reversed
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Keep review</button>
                            <button onClick={deleteReview} data-dismiss="modal" type="button" className="btn btn-primary">Delete review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageReviews;
