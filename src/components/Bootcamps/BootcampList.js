import React, { useEffect, useState } from 'react'
import Bootcamp from './Bootcamp';

const BootcampList = (props) => {

    return (
        <React.Fragment>
            {props.bootcamps.length > 0 ? props.bootcamps.map(bootcamp => {
                return <Bootcamp bootcamp={bootcamp} />
            }) : (
                <p>No bootcamps matched your search criteria</p>
            )}
        </React.Fragment>
    )
}

export default BootcampList
