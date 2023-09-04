import Image from 'mui-image'
import React from 'react'
import ComingSoon from '../assets/images/coming_soon.jpg'

const Gifts = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
            <Image duration={0} height={'30vw'} width={'55vw'} src={ComingSoon} alt='coming Soon'>

            </Image>
        </div>
    )
}

export default Gifts
