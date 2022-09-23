import React from 'react'
import IMG from '../../../../t-shirt_white.png'
import BG from '../backGround'


function Loading() {
    return (
        <>
            <div id="mouse-point" className='mouse-point'></div>
            <div className='card'>
                <div className='circle'></div>
                <img src={IMG} className='img-l'></img>
                <img src={IMG} className='img-r'></img>
                {/* <div className='content'>
                <p> ABC</p>
            </div> */}
            </div>
            <script src={BG}></script>
        </>
    )
}


export default Loading