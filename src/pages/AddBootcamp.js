import React from 'react';
import Navbar from '../components/Navbar';
import BootcampForm from '../components/Bootcamps/BootcampForm';


const AddBootcamp = () => {

    return (
        <div>
            <Navbar />
            <section className="container mt-5">
                <h1 className="mb-2">Add Bootcamp</h1>
                <p>
                    Important: You must be affiliated with a bootcamp to add to DevCamper
                </p>
                <BootcampForm editing={false} />
            </section>
        </div>
    )
}

export default AddBootcamp
