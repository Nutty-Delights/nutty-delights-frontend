import React from 'react'
import Error from '../assets/images/Error404.jpg'
import Image from 'mui-image'

const ErrorPage = () => {
    return (
        <div>
            <Image height={'100vh'} src={Error} duration={0} />
        </div>
    )
}

export default ErrorPage
