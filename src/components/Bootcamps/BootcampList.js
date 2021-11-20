import React, { useEffect, useState } from 'react'

import axiosInstance from '../../helpers/axios'
import { toast } from 'react-toastify';

import Bootcamp from './Bootcamp';

const BootcampList = () => {
    const [bootcamps, setBootcamps] = useState([]);
    const [loading, setLoading] = useState(true)

    const getBootcamps = () => {
        axiosInstance
            .get("bootcamps/")
            .then(res => {
                console.log(res.data);
                setBootcamps(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Something went wrong");
            })
    }

    useEffect(() => {
        getBootcamps();
    }, [])

    return (
        <div className="col-md-8">
            {bootcamps.map(bootcamp => {
                return <Bootcamp bootcamp={bootcamp} />
            })}

            {/* <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#">Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav> */}
        </div>
    )
}

export default BootcampList
