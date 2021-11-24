import React from 'react'

import { Link } from 'react-router-dom'

import defaultPic from "../../assets/img/default_bootcamp.jpg";

const Bootcamp = ({ bootcamp }) => {

    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={bootcamp.photo ? `http://127.0.0.1:8000${bootcamp.photo}` : defaultPic} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"><Link to={`/bootcamps/${bootcamp.id}`}>{bootcamp.name}</Link><span className="float-right badge badge-success">{bootcamp.average_rating}</span>
                        </h5>
                        <span className="badge badge-dark mb-2">Boston, MA</span>
                        <p className="card-text">
                            {bootcamp.careers.map(career => {
                                return `${career.name}, `
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bootcamp
