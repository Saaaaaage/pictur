import React from 'react';
import {Link} from 'react-router-dom'

export default props => {
    const post = props.post;
    return (
        <div className="post-preview-container">
            <Link to={`/posts/${post.id}`} key={post.id}>
                <img src={post.thumbnail} />
                <div className="post-preview-info">
                    <span className="post-preview-description">
                        {post.title}
                    </span>
                </div>
            </Link>
        </div>
    );
};