import React from 'react';


export default ({user}) => {
    return (
        <div>
            <div
                className="user-banner-container"
            >
                <div className="user-banner-icon">
                    {!!user.username &&
                        user.username[0].toUpperCase()
                    }
                </div>
                <div className="user-banner-info">
                    <div className="user-banner-username">{user.username}</div>
                    <div className="user-banner-subtext">{user.post_count || '0'} posts</div>
                </div>
            </div>
            <div className="tricky-header-bg user-banner-bg"></div>
        </div>
    )
};