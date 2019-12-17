import React from 'react';


export default ({tag}) => {
  
  return (
    <div>
        <div className="tag-gallery-header-container">
            <div className="tag-gallery-title">{tag.name}</div>
            <div className="tag-gallery-subtitle">{tag.post_count} posts</div>
            <div className="tricky-header-bg user-banner-bg"></div>
        </div>
    </div>
  )
};