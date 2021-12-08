import React, { useState } from 'react';

import { useNavigate } from 'react-router';
import * as yup from "yup";
import axiosInstance from '../../helpers/axios';
import { toast } from 'react-toastify';
import handleError from '../../helpers/axiosErrorHandler';

const CourseForm = (props) => {
    const navigate = useNavigate();

    const courseData = props.editing ? {
        title: props.course.title,
        weeks: props.course.weeks,
        tuition: props.course.tuition,
        minimum_skill: props.course.minimum_skill,
        description: props.course.description,
        scolarship_available: props.course.scolarship_available
    } : {
        title: "",
        weeks: "",
        tuition: 0,
        minimum_skill: "",
        description: "",
        scolarship_available: false
    }

    const [formData, setFormData] = useState(courseData);

    const courseFormSchema = yup.object().shape({
        title: yup.string().max(255, "Title can not be longer than 255 characters").required("Title is required"),
        weeks: yup.string().required("Duration is required"),
        tuition: yup.number().required("Tuition is required"),
        minimum_skill: yup.string().required("Minimum skill is required"),
        description: yup.string().max(500, "Description can not have more than 500 characters"),
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    }

    const handleSelectChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitCourse = (e) => {
        e.preventDefault();

        courseFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    if (props.editing) {
                        axiosInstance
                            .put(`courses/update-course/${props.course.id}/`, formData)
                            .then(res => {
                                console.log(res.data);
                                toast.success("Course updated");
                                navigate(`/manage-courses/${props.bootcamp.id}`)
                            })
                            .catch(err => {
                                handleError(err);
                            })
                    } else {
                        axiosInstance
                            .post(`courses/create-course/${props.bootcamp.id}/`, formData)
                            .then(res => {
                                console.log(res.data);
                                toast.success("Course created");
                                navigate(`/manage-courses/${props.bootcamp.id}`)
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
        <form onSubmit={submitCourse}>
            <div className="form-group">
                <label>Course Title</label>
                <input
                    onChange={handleInputChange}
                    value={formData.title}
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                />
            </div>
            <div className="form-group">
                <label>Duration</label>
                <input
                    onChange={handleInputChange}
                    value={formData.weeks}
                    type="text"
                    name="weeks"
                    placeholder="Duration"
                    className="form-control"
                />
                <small className="form-text text-muted"
                >Enter number of weeks course lasts</small
                >
            </div>
            <div className="form-group">
                <label>Course Tuition</label>
                <input
                    onChange={handleInputChange}
                    value={formData.tuition}
                    type="number"
                    name="tuition"
                    placeholder="Tuition"
                    className="form-control"
                />
                <small className="form-text text-muted">USD Currency</small>
            </div>
            <div className="form-group">
                <label>Minimum Skill Required</label>
                <select name="minimum_skill" className="form-control" defaultValue={formData.minimum_skill} onChange={handleSelectChange}>
                    <option value="Beginner" selected>Beginner (Any)</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleInputChange}
                    value={formData.description}
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Course description summary"
                    maxlength="500"
                ></textarea>
                <small className="form-text text-muted"
                >No more than 500 characters</small
                >
            </div>
            <div className="form-check">
                <input
                    onChange={handleCheckboxChange}
                    checked={formData.scolarship_available}
                    className="form-check-input"
                    type="checkbox"
                    name="scolarship_available"
                    id="scholarshipAvailable"
                />
                <label className="form-check-label" for="scholarshipAvailable">
                    Scholarship Available
                </label>
            </div>
            <div className="form-group mt-4">
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-dark btn-block"
                />
            </div>
        </form>
    )
}

export default CourseForm;
