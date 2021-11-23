import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import * as yup from "yup";
import axiosInstance from '../helpers/axios';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router';

const AddBootcamp = () => {
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        careers: [],
        housing: false,
        job_assistance: false,
        job_guarantee: false,
        accept_gi: false
    })

    const bootcampFormSchema = yup.object().shape({
        name: yup.string().max(255, "Name can not be longer than 255 characters").required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
        website: yup.string().url("Invalid website URL format"),
        description: yup.string().max(500, "Description can not have more than 500 characters"),
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked })
    }

    const handleSelectChange = (e) => {
        const selectedItems = e.target.selectedOptions;
        const careers = []

        for (let i = 0; i < selectedItems.length; i++) {
            careers.push(selectedItems[i].value);
        }

        setFormData({ ...formData, careers: careers })
    }

    const submitBootcamp = (e) => {
        e.preventDefault();

        bootcampFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    axiosInstance
                        .post("bootcamps/create-bootcamp/", formData)
                        .then(res => {
                            console.log(res.data);
                            toast.success("Bootcamp created");
                            navigate("/manage-bootcamp");
                        })
                        .catch(err => {
                            console.log(err.response);
                            Object.keys(err.response?.data).forEach(key => {
                                err.response.data[key].forEach(error => {
                                    toast.error(error);
                                })
                            })
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
            <section className="container mt-5">
                <h1 className="mb-2">Add Bootcamp</h1>
                <p>
                    Important: You must be affiliated with a bootcamp to add to DevCamper
                </p>
                <form onSubmit={submitBootcamp}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card bg-white py-2 px-4">
                                <div className="card-body">
                                    <h3>Location & Contact</h3>
                                    <p className="text-muted">
                                        If multiple locations, use the main or largest
                                    </p>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Bootcamp Name"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            placeholder="Full Address"
                                            required
                                            onChange={handleInputChange}
                                        />
                                        <small className="form-text text-muted"
                                        >Street, city, state, etc</small
                                        >
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Phone"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            placeholder="Contact Email"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Website</label>
                                        <input
                                            type="text"
                                            name="website"
                                            className="form-control"
                                            placeholder="Website URL"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card bg-white py-2 px-4">
                                <div className="card-body">
                                    <h3>Other Info</h3>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            rows="5"
                                            className="form-control"
                                            placeholder="Description (What you offer, etc)"
                                            maxlength="500"
                                            onChange={handleInputChange}
                                        ></textarea>
                                        <small className="form-text text-muted"
                                        >No more than 500 characters</small
                                        >
                                    </div>
                                    <div className="form-group">
                                        <label>Careers</label>
                                        <select onChange={handleSelectChange} name="careers" className="custom-select" multiple>
                                            <option selected>Select all that apply</option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="Mobile Development"
                                            >Mobile Development</option
                                            >
                                            <option value="UI/UX">UI/UX</option>
                                            <option value="Data Science">Data Science</option>
                                            <option value="Business">Business</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="housing"
                                            id="housing"
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" for="housing">
                                            Housing
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="job_assistance"
                                            id="jobAssistance"
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" for="jobAssistance">
                                            Job Assistance
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="job_guarantee"
                                            id="jobGuarantee"
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" for="jobGuarantee">
                                            Job Guarantee
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="accept_gi"
                                            id="acceptGi"
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" for="acceptGi">
                                            Accepts GI Bill
                                        </label>
                                    </div>
                                    <p className="text-muted my-4">
                                        *After you add the bootcamp, you can add the specific courses
                                        offered
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit Bootcamp"
                            className="btn btn-success btn-block my-4"
                        />
                        <a href="manage-bootcamp.html" className="btn btn-danger btn-block mb-4"
                        >Cancel</a>

                    </div>
                </form>
            </section>
        </div>
    )
}

export default AddBootcamp
