import React from 'react';

import Navbar from '../components/Navbar';
import LatestBootcamps from '../components/LatestBootcamps';

const Home = () => {
    return (
        <div>
            <Navbar />

            <section className="showcase">
                <div className="dark-overlay">
                    <div className="showcase-inner container">
                        <h1 className="display-4">Find a Code Bootcamp</h1>
                        <p className="lead">
                            Find, rate and read reviews on coding bootcamps
                        </p>
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="miles"
                                            placeholder="Miles From"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="zipcode"
                                            placeholder="Enter Zipcode"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Find Bootcamps</button>
                        </form>
                    </div>
                </div>
            </section>

            <LatestBootcamps />
        </div>
    )
}

export default Home
