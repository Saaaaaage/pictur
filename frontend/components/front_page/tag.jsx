import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    
    return (
        <Link
            to={`/tags/${props.tag.id}`}
            style={{background: props.background}}
            className="banner-tag"
        >
            <div
                className="tag-title"
            >
                <span className='tag-name'>{props.tag.name}</span>
                <span className='tag-posts'>{props.tag.post_count} Posts</span>
            </div>
            
        </Link>
    )
}