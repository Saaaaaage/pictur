import React, { useState } from 'react';
import {Link} from 'react-router-dom'

export default props => {
    const post = props.post;
    const [ showEdit, setShowEdit ] = useState(false);
    const determined = props.currentUserId === post.user_id && showEdit ? "block" : "none";

    return (
        <div
            className="post-preview-container"
            onMouseOver={() => setShowEdit(true)}
            onMouseOut={() => setShowEdit(false)}
        >
            <Link to={`/posts/${post.id}`} key={post.id}>
                <img src={post.thumbnail} />
                <div className="post-preview-info">
                    <span className="post-preview-description">
                        {post.title}
                        {!post.public &&
                            <p>Hidden</p>
                        }
                    </span>
                </div>
            </Link>
            <div className="post-preview-edit" style={{display: determined}}>
                <Link to={`/posts/${post.id}/edit`}>
                    <i className="fas fa-pen-square"></i>
                </Link>
            </div>
        </div>
    );
};