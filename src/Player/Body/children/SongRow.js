import React from 'react'
import './SongRow.css'

function SongRow() {
    return (
        <div className="songRow">
            <img src="https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png" alt="" className="songRow__album"/>
            <div className="songRow__info">
                <h1>Co Chang trai Viet Len Cay</h1>
                <p>Phan Manh Quynh</p>
                <p>Mat Biec Album</p>
            </div>
        </div>
    )
}

export default SongRow
