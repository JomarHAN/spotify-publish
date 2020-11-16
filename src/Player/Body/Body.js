import { Favorite, MoreHoriz, PlayCircleFilled } from '@material-ui/icons'
import React from 'react'
import './Body.css'
import Header from './children/Header'
import SongRow from './children/SongRow'
function Body() {
    return (
        <div className="body">
            <Header/>
            <div className="body__info">
                <img src="https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png" alt=""/>
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Nhac Rap Viet</h2>
                    <p>description</p>
                </div>
            </div>
                <div className="body__songs">
                    <div className="body__icons">
                        <PlayCircleFilled className="body__shuffle"/>
                        <Favorite/>
                        <MoreHoriz/>
                    </div>
                    <SongRow/>
                    <SongRow/>
                    <SongRow/>
                    <SongRow/>
                    <SongRow/>
                    <SongRow/>
                    <SongRow/>
                    <SongRow/>
                    <SongRow/>
                </div>
        </div>
    )
}

export default Body
