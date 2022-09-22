import React from 'react'
import IMG from '../../../../t-shirt_white.png'
function Loading() {
    return (
        <div className='card'>
            <div className='circle'></div>
            <img src={IMG}></img>
            <div className='content'>
                <p> ABC</p>
            </div>
        </div>
    )
}

export default Loading