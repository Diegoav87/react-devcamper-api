import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

import BootcampList from '../components/Bootcamps/BootcampList';
import Spinner from '../components/Spinner';
import axiosInstance from '../helpers/axios';
import { toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import handleError from '../helpers/axiosErrorHandler';

const PAGE_SIZE = 5;

const Bootcamps = () => {
    const [bootcamps, setBootcamps] = useState([]);
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState();
    const [distanceFilters, setDistanceFilters] = useState({
        km: "",
        zipcode: ''
    })
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getBootcamps = (currentPage) => {

        axiosInstance
            .get(`bootcamps/?page=${currentPage}`, {
                params: filters,
            })
            .then(res => {
                console.log(res.data);
                setBootcamps(res.data.results);
                setPageCount(Math.ceil(res.data.count / PAGE_SIZE));
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    const handleInputChange = (e) => {
        setDistanceFilters({ ...distanceFilters, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getBootcamps(1);
    }, [])

    const handleSelectChange = (e) => {
        const newFilters = { ...filters };
        const value = e.target.value;

        if (value === "any") {
            delete newFilters[e.target.name];
        } else {
            newFilters[e.target.name] = value;
        }

        setFilters(newFilters);
    }

    const submitFilters = (e) => {
        e.preventDefault();
        getBootcamps(currentPage);
    }

    const submitDistanceFilters = (e) => {
        e.preventDefault();

        axiosInstance
            .get(`bootcamps/get-bootcamps-within-radius/${distanceFilters.km}/${distanceFilters.zipcode}/`)
            .then(res => {
                console.log(res.data);
                setBootcamps(res.data);
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    const handlePageClick = (data) => {
        const newPage = data.selected + 1;
        setCurrentPage(newPage);
        getBootcamps(newPage);
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Navbar />
            <section className="browse my-5">
                <div className="container">
                    <div className="row">

                        <div className="col-md-4">
                            <div className="card card-body mb-4">
                                <h4 className="mb-3">By Location</h4>
                                <form onSubmit={submitDistanceFilters}>

                                    <div className="form-group">
                                        <input
                                            onChange={handleInputChange}
                                            type="number"
                                            className="form-control"
                                            name="km"
                                            placeholder="Radius in Kilometers"
                                        />
                                    </div>


                                    <div className="form-group">
                                        <input
                                            onChange={handleInputChange}
                                            type="text"
                                            className="form-control"
                                            name="zipcode"
                                            placeholder="Zipcode or Address"
                                        />
                                    </div>


                                    <input
                                        type="submit"
                                        value="Find Bootcamps"
                                        className="btn btn-primary btn-block"
                                    />
                                </form>
                            </div>

                            <h4>Filter</h4>
                            <form onSubmit={submitFilters}>
                                <div className="form-group">
                                    <label> Career</label>
                                    <select onChange={handleSelectChange} name="career" className="custom-select mb-2">
                                        <option value="any" selected>Any</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile Development">Mobile Development</option>
                                        <option value="UI/UX">UI/UX</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Business">Business</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label> Rating</label>
                                    <select name="average_rating" onChange={handleSelectChange} className="custom-select mb-2">
                                        <option value="any" selected>Any</option>
                                        <option value="9">9+</option>
                                        <option value="8">8+</option>
                                        <option value="7">7+</option>
                                        <option value="6">6+</option>
                                        <option value="5">5+</option>
                                        <option value="4">4+</option>
                                        <option value="3">3+</option>
                                        <option value="2">2+</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label> Budget</label>
                                    <select name="average_cost" onChange={handleSelectChange} className="custom-select mb-2">
                                        <option value="any" selected>Any</option>
                                        <option value="20000">$20,000</option>
                                        <option value="15000">$15,000</option>
                                        <option value="10000">$10,000</option>
                                        <option value="8000">$8,000</option>
                                        <option value="6000">$6,000</option>
                                        <option value="4000">$4,000</option>
                                        <option value="2000">$2,000</option>
                                    </select>
                                </div>
                                <input
                                    type="submit"
                                    value="Find Bootcamps"
                                    className="btn btn-primary btn-block"
                                />
                            </form>
                        </div>
                        <div className="col-md-8">
                            <BootcampList bootcamps={bootcamps} />
                            <ReactPaginate
                                pageCount={pageCount}
                                breakLabel={"..."}
                                onPageChange={handlePageClick}
                                containerClassName='pagination'
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousClassName='page-item'
                                nextClassName='page-item'
                                previousLinkClassName='page-link'
                                nextLinkClassName='page-link'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                activeClassName='active'

                            />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Bootcamps
