import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import defaultPic from "../assets/img/default_bootcamp.jpg";

import { useParams } from 'react-router';

import mediaUrl from '../helpers/mediaUrl';

import { getBootcamp } from '../helpers/bootcamps';

const Bootcamp = () => {
    const { id } = useParams();
    const [bootcamp, setBootcamp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBootcamp(setBootcamp, setLoading, id);
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Navbar />
            <section className="bootcamp mt-4 mb-4">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8">
                            <h1>{bootcamp.name}</h1>

                            <p>{bootcamp.description}</p>
                            {bootcamp.courses.length > 0 ? (
                                <React.Fragment>
                                    <p className="lead mb-4">Average Course Cost: <span className="text-primary">${bootcamp.average_cost}</span></p>
                                    {bootcamp.courses.map(course => {
                                        return (
                                            <div className="card mb-3">
                                                <h5 className="card-header bg-primary text-white">{course.title}</h5>
                                                <div className="card-body">
                                                    <h5 className="card-title">Duration: {course.weeks} weeks</h5>
                                                    <p className="card-text">{course.description}</p>
                                                    <ul className="list-group mb-3">
                                                        <li className="list-group-item">Cost: ${course.tuition} USD</li>
                                                        <li className="list-group-item">Skill Required: {course.minimum_skill}</li>
                                                        <li className="list-group-item">Scholarship Available: {course.scolarship_available ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times text-danger"></i>)}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </React.Fragment>
                            ) : (
                                <p className="lead mb-4">This bootcamp has no courses yet.</p>
                            )}

                        </div>

                        <div className="col-md-4">

                            <img src={bootcamp.photo ? `${mediaUrl}${bootcamp.photo}` : defaultPic} className="img-thumbnail" alt="bootcamp-photo" />

                            <h1 className="text-center my-4"><span className="badge badge-secondary badge-success rounded-circle p-3">{bootcamp.average_rating}</span> Rating</h1>

                            <Link to={`/reviews/${bootcamp.id}`} className="btn btn-dark btn-block my-3"><i className="fas fa-comments"></i>  Read Reviews</Link>
                            <Link to={`/add-review/${bootcamp.id}`} className="btn btn-light btn-block my-3"><i className="fas fa-pencil-alt"></i>  Write a Review</Link>
                            <a href={bootcamp.website} rel="noreferrer" target="_blank" className="btn btn-secondary btn-block my-3"><i className="fas fa-globe"></i>  Visit Website</a>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{bootcamp.housing ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times text-danger"></i>)} Housing</li>
                                <li className="list-group-item">{bootcamp.job_assistance ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times text-danger"></i>)} Job Assistance</li>
                                <li className="list-group-item">{bootcamp.job_guarantee ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times text-danger"></i>)} Job Guarantee</li>
                                <li className="list-group-item">{bootcamp.accept_gi ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times text-danger"></i>)} Accepts GI Bill</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Bootcamp;
