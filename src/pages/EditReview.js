import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReviewForm from '../components/Reviews/ReviewForm';
import Spinner from '../components/Spinner';

import { Link } from 'react-router-dom';

import { useParams } from 'react-router';
import { getReview } from '../helpers/reviews';

const EditReview = () => {
    const { id } = useParams();

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReview(setReview, setLoading, id);
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Navbar />
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <Link to="/manage-reviews" className="btn btn-link text-secondary my-3"
                                ><i className="fas fa-chevron-left"></i> Manage Reviews</Link>
                                <h1 className="mb-2">{review.bootcamp.name}</h1>
                                <h3 className="text-primary mb-4">Edit your review</h3>
                                <p>
                                    You must have attended and graduated this bootcamp to review
                                </p>
                                <ReviewForm editing={true} bootcamp={review.bootcamp} review={review} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditReview
