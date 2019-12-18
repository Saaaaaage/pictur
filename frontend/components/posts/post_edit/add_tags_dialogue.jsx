import React from 'react';

class AddTags extends React.Component {
    constructor(props) {
        super(props);
        this.returnSelected = this.returnSelected.bind(this);
    }

    returnSelected(tag) {
        this.props.addTag(tag);
    }

    render () {
        const tagList = this.props.tags.map(tag => {
            return (
                <li
                    key={tag.id}
                    className="addTagLi"
                    onMouseDown={() => this.returnSelected(tag)}
                >
                    <div>{tag.name}</div>
                    <div>{tag.post_count} posts</div>
                    
                </li>
            )
        });
        return (
            <div className="addTagPositioning">
                <div className="addTagContainer">
                    <ul>
                        {tagList}
                    </ul>
                </div>
            </div>
        )
    }
}

export default AddTags;