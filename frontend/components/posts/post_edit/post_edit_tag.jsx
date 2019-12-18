import React from 'react';

class PostEditTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none'
        };
    }

    render () {
        return (
            <div
                className="pe-tags"
                onMouseOver={() => this.setState({ display: 'flex' })}
                onMouseOut={() => this.setState({ display: 'none' })}
                onClick={() => this.props.removeTag(this.props.tag.id)}
            >
                {this.props.tag.name}
                <div
                    className="pe-remove-tag"
                    style={{ display: this.state.display }}
                >X</div>
            </div>
        )
    }
}

export default PostEditTag;