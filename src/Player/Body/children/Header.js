import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <Search/>
                <input type="text" placeholder="Search for Artists, Songs or Podcast"/>
            </div>
            <div className="header__right">
                <Avatar/>
                <h4>Jomar Nguyen</h4>
            </div>
        </div>
    )
}

export default Header
