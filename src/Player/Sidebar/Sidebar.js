import { HomeOutlined, LibraryMusicRounded, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import SidebarOption from './children/SidebarOption'
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" className="sidebar__logo"/>
            
            <SidebarOption title="Home" Icon={HomeOutlined}/>
            <SidebarOption title="Search" Icon={SearchOutlined}/>
            <SidebarOption title="Your Library" Icon={LibraryMusicRounded}/>
            <br/>
            <strong className="sidebar__title">PLAYLIST</strong>
            <hr/>
        </div>
    )
}

export default Sidebar
