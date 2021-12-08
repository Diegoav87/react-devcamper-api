import React, { useState } from 'react';

import { useNavigate } from 'react-router';
import * as yup from "yup";
import axiosInstance from '../../helpers/axios';
import { toast } from 'react-toastify';
import handleError from '../../helpers/axiosErrorHandler';

const ReviewForm = (props) => {
    const navigate = useNavigate();

    const reviewData = props.editing ? {
        title: props.review.title,
        rating: props.review.rating,
        text: props.review.text
    } : {
        title: "",
        rating: 1,
        text: ""
    }

    const [formData, setFormData] = useState(reviewData);

    const reviewFormSchema = yup.object().shape({
        title: yup.string().max(255, "Title can not be longer than 255 characters").required("Title is required"),
        rating: yup.number().required("Rating is required"),
        text: yup.string().max(500, "Your review can not have more than 500 characters").required("Your review is required"),
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleRatingChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    }

    const submitReview = (e) => {
        e.preventDefault();

        reviewFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    if (props.editing) {
                        axiosInstance
                            .put(`reviews/update-review/${props.review.id}/`, formData)
                            .then(res => {
                                console.log(res.data);
                                toast.success("Review updated");
                                navigate(`/manage-reviews`)
                            })
                            .catch(err => {
                                handleError(err);
                            })
                    } else {
                        axiosInstance
                            .post(`reviews/create-review/${props.bootcamp.id}/`, formData)
                            .then(res => {
                                console.log(res.data);
                                toast.success("Review added");
                                navigate(`/manage-reviews`)
                            })
                            .catch(err => {
                                handleError(err);
                            })
                    }


                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    return (
        <form onSubmit={submitReview}>
            <div className="form-group">
                <label for="rating"
                >Rating: <span className="text-primary">{formData.rating}</span></label
                >
                <input
                    onChange={handleRatingChange}
                    name="rating"
                    type="range"
                    className="custom-range"
                    min="1"
                    max="10"
                    step="1"
                    value={formData.rating}
                    id="rating"
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleInputChange}
                    value={formData.title}
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Review title"
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleInputChange}
                    name="text"
                    value={formData.text}
                    rows="10"
                    className="form-control"
                    placeholder="Your review"
                ></textarea>
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-dark btn-block"
                />
            </div>
        </form>
    )
}

export default ReviewForm;
