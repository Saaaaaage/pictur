import Modal from '../../utils/modal';
import React from 'react';
import NavbarContainer from '../../navbar/navbar_container';
import AddTags from './add_tags';
import PostEditTag from './post_edit_tag';


class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            tags: {},
        };
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.pushTitleChange = _.debounce(this.pushTitleChange, 1000).bind(this);

        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleRemoveTag = this.handleRemoveTag.bind(this);
        this.pushTagsChange = _.debounce(this.pushTagsChange, 1000).bind(this);
        
        this.publish = this.publish.bind(this);
    }

    componentDidMount() {
        this.props.fetchPost().then(
            () => {this.setState(this.props.post);}
        );
    }

    handleTitleInput(e) {
        this.setState({ title: e.target.value });
        this.pushTitleChange();
    }

    pushTitleChange() {
        this.props.updatePostAttributes({
            title: this.state.title,
            id: this.props.post.id
        });
    }

    handleRemoveTag(tagId) {
        let stateTags = this.state.tags;
        delete stateTags[tagId];
        this.setState({tags: stateTags});
        this.pushTagsChange();
    }

    handleAddTag(tag) {
        let stateTags = this.state.tags;
        stateTags[tag.id] = tag;
        this.setState({
            tags: stateTags
        });
        this.pushTagsChange();
    }

    pushTagsChange() {
        this.props.updatePostAttributes({
            id: this.props.post.id,
            tag_ids: Object.keys(this.state.tags)
        });
    }

    publishable() {
        return (this.state.title && this.state.title.length > 0);
    }

    publish(type) {
        const payload = {
            title: this.state.title,
            id: this.props.post.id
        };
        switch (type) {
            case 'public':
                payload["public"] = true;
                break;
            case 'hidden':
                payload["public"] = false;
                break;
            default:
                break;
        }

        this.props.updatePostAttributes(payload).then(
            (
                () => {
                    this.props.history.push(`/posts/${this.props.post.id}`);
                }
            ).bind(this)
        );
    }

    render () {
        const images = this.props.images.map((img, i) => {
            return (
                <div className="pe-upload" key={i}>
                    <div key={i} className="pe-image">
                        <img src={img.url} />
                    </div>
                    <div className="pe-upload-desc">
                        <input type="text" placeholder="Add a description"/>
                    </div>
                </div>
            )
        })

        const tags = Object.values(this.state.tags).map(tag => {
            return (
                <PostEditTag tag={tag} key={tag.id} removeTag={this.handleRemoveTag}/>
            )
        })

        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-post-edit-page");

        let bgIndicator = "pe-banner-untitled";
        let peSidebarBtnActive = 'pe-comm-post-btn-inactive';
        if (this.publishable()) {
            bgIndicator = "pe-banner-titled";
            peSidebarBtnActive = 'pe-community-post-btn';
        }
        
        return (
            <div>
                <Modal postId={this.props.post.id} />
                <div className={`pe-banner ${bgIndicator}`}></div>
                <div style={{position: "static"}}>
                    <NavbarContainer/>
                </div>
                <div className="pe-main">
                    <div className="pe-upload-container">
                        <input
                            type="text"
                            className="pe-title-input"
                            placeholder="Give your post a title..."
                            onChange={this.handleTitleInput}
                            value={this.state.title}
                        />
                        {images}
                        <div className="add-image-container">
                            <button
                                className="add-image-button"
                                onClick={() => this.props.openModal('edit-upload')}
                            >
                                + Add image
                            </button>
                        </div>
                    </div>
                    <div className="pe-sidebar-container">
                        <div className='pe-sidebar-content'>
                            <div className='pe-sidebar-section'>
                                <div className="pe-sidebar-section-header">
                                    POST
                                </div>
                                <button
                                    className={`pe-sidebar-btn ${peSidebarBtnActive}`}
                                    disabled={!this.publishable()}
                                    onClick={() => this.publish('public')}
                                >
                                    To Community
                                </button>
                                <button
                                    className="pe-sidebar-btn pe-community-hidden-btn"
                                    onClick={() => this.publish('hidden')}
                                >
                                    Hidden
                                </button>
                            </div>

                            <div className='pe-sidebar-section'>
                                <div className="pe-sidebar-section-header">
                                    ADD TAGS
                                </div>
                                <div className="pe-tag-container">
                                    {tags}
                                    <AddTags handleAddTag={this.handleAddTag} />
                                </div>
                            </div>

                            <div className='pe-sidebar-section'>
                                <div className="pe-sidebar-section-header">
                                    IMG TOOLS
                                </div>
                                <ul className='pe-sidebar-tools'>
                                    <li
                                        onClick={() => this.props.openModal('edit-upload')}
                                    >
                                        <i className="fas fa-plus"></i>Add more images
                                    </li>
                                    <li><i className="fas fa-code"></i>Embed post</li>
                                    <li><i className="fas fa-download"></i>Download post</li>
                                    <li
                                        onClick={() => this.props.openModal('delete-post-confirmation')}
                                    >
                                        <i className="fas fa-trash"></i>Delete post
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostEdit;