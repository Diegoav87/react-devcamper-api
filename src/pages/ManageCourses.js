import React, { useState, useEffect } from 'react';

import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

import Bootcamp from "../components/Bootcamps/Bootcamp";

import { useParams } from 'react-router';
import { getBootcamp } from '../helpers/bootcamps';
import axiosInstance from '../helpers/axios';
import { toast } from 'react-toastify';

const ManageCourses = () => {
    const { id } = useParams();

    const [bootcamp, setBootcamp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courseId, setCourseId] = useState(null);

    useEffect(() => {
        getBootcamp(setBootcamp, setLoading, id);
    }, [])

    if (loading) {
        return <Spinner />
    }

    const deleteCourse = () => {
        axiosInstance
            .delete(`courses/delete-course/${courseId}/`)
            .then(res => {
                console.log(res.data);
                toast.success("Course deleted");
                getBootcamp(setBootcamp, setLoading, id);
            })
            .catch(err => {
                console.log(err.response);
                toast.error("Something went wrong, please try again");
            })
    }

    const changeCourseId = (id) => {
        console.log(id)
        setCourseId(id);
    }

    return (
        <div>
            <Navbar />
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <Link
                                    to="/manage-bootcamp"
                                    className="btn btn-link text-secondary my-3"
                                ><i className="fas fa-chevron-left"></i> Manage Bootcamp</Link>
                                <h1 className="mb-4">Manage Courses</h1>
                                <Bootcamp bootcamp={bootcamp} />

                                <Link to={`/add-course/${bootcamp.id}`} className="btn btn-primary btn-block mb-4">Add Bootcamp Course</Link>
                                {bootcamp.courses.length > 0 ? (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bootcamp.courses.map(course => {
                                                return (
                                                    <tr>
                                                        <td>{course.title}</td>
                                                        <td>
                                                            <Link to={`/edit-course/${course.id}`} className="btn btn-secondary"
                                                            ><i className="fas fa-pencil-alt"></i
                                                            ></Link>
                                                            <button data-toggle="modal" data-target="#exampleModal" onClick={() => changeCourseId(course.id)} className="btn btn-danger">
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p class="lead">
                                        You have not yet added any courses
                                    </p>
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
                            <h5 className="modal-title" id="exampleModalLabel">Delete course</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            This action is permament and can not be reversed
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Keep course</button>
                            <button onClick={deleteCourse} data-dismiss="modal" type="button" className="btn btn-primary">Delete course</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCourses;
