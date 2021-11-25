import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import BootcampForm from '../components/Bootcamps/BootcampForm';

import { useParams } from 'react-router';
import { getBootcamp } from '../helpers/bootcamps';

const EditBootcamp = () => {
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
            <section className="container mt-5">
                <h1 className="mb-2">Edit Bootcamp</h1>
                <p>
                    Important: You must be affiliated with a bootcamp to add to DevCamper
                </p>
                <BootcampForm editing={true} bootcamp={bootcamp} />
            </section>
        </div>
    )
}

export default EditBootcamp
