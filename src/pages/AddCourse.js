import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getBootcamp } from '../helpers/bootcamps';

import CourseForm from '../components/Courses/CourseForm';

const AddCourse = () => {
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
            <section className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <Link
                                    to={`/manage-courses/${bootcamp.id}`}
                                    className="btn btn-link text-secondary my-3"
                                ><i className="fas fa-chevron-left"></i> Manage Courses</Link>
                                <h1 className="mb-2">{bootcamp.name}</h1>
                                <h3 className="text-primary mb-4">Add Course</h3>
                                <CourseForm editing={false} bootcamp={bootcamp} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddCourse;
