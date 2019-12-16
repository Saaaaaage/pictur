import React from 'react';

export default props => {
    return (
        <img className="postImage"
            src={props.image.url}
            alt={props.image.fileName}
            key={props.image.id}
        />
    )
}