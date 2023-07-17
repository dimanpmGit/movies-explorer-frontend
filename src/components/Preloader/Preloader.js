import React, {useEffect} from 'react'
import './Preloader.css'

const Preloader = ({ notMain }) => {
    useEffect(() => {
        notMain();
    }, [])
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
