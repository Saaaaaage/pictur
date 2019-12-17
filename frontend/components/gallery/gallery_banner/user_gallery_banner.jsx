import React from 'react';


export default ({user}) => {
  return (
    <div>
      <div className="user-banner">
        {user.username}
      </div>
      <div>{user.post_count} posts</div>
      <div className="tricky-header-bg user-banner-bg"></div>
    </div>
  )
};