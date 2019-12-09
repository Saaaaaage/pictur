import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
    return (
        <div className='navbar-center'>
            <input className="search-bar"
                placeholder="Images, #tags, @users oh my!"
                type="text"
            />
        </div>
    )
};