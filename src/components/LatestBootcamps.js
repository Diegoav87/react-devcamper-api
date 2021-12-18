import React from 'react'

import defaultPic from '../assets/img/default_bootcamp.jpg'
import { Link } from 'react-router-dom'

const LatestBootcamps = (props) => {
    return (

        <section className="latest py-5 bg-light">
            <div className="container">
                <h3>Latest Bootcamps</h3>
                <div className="card-group">
                    {props.bootcamps.length > 0 ? props.bootcamps.map(bootcamp => {
                        return (
                            <div className="card">
                                <img src={bootcamp.photo ? `http://127.0.0.1:8000${bootcamp.photo}` : defaultPic} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/bootcamps/${bootcamp.id}`}
                                        >{bootcamp.name}
                                            <span className="float-right badge badge-success">{bootcamp.average_rating}</span></Link>
                                    </h5>
                                    <span className="badge badge-dark mb-2">{bootcamp.address}</span>
                                    <p className="card-text">
                                        {bootcamp.description}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted"
                                        >{bootcamp.careers.map(career => {
                                            return `${career.name}, `
                                        })}</small>
                                    </p>
                                </div>
                            </div>
                        )
                    }) : (
                        <p>No bootcamps matched your query</p>
                    )}



                </div>
            </div>
        </section>
    )
}

export default LatestBootcamps
