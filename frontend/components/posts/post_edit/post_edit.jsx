import Modal from '../../utils/modal';
import React from 'react';
import NavbarContainer from '../../navbar/navbar_container';
import { debounce } from 'lodash';
import AddTagsDialogue from './add_tags';

class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            addTagDialogue: false,
            tagSearchString: "",
            tagSearchResults: [],
            tags: {},

        };
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleTagSearchInput = this.handleTagSearchInput.bind(this);
        this.publish = this.publish.bind(this);
        this.pushTitleChange = _.debounce(this.pushTitleChange, 1000).bind(this);
        this.findTags = _.debounce(this.findTags, 500).bind(this);
        this.showAddTagDialogue = this.showAddTagDialogue.bind(this);
        this.hideAddTagDialogue = this.hideAddTagDialogue.bind(this);
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

    handleTagSearchInput(e) {
        this.setState({ tagSearchString: e.target.value });
        this.findTags();
    }

    findTags() {
        if (this.state.tagSearchString.length > 1) {
            this.props.findTags(this.state.tagSearchString).then(
                (tags => {
                    this.setState({tagSearchResults: Object.values(tags)});
                }).bind(this)
            );
        }
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

    showAddTagDialogue(e) {
        console.log("opening");
        console.log(document.activeElement);
        this.setState(
            { addTagDialogue: true },
            () => document.getElementById("tagSearch").focus()
        );
    }
    hideAddTagDialogue(e) {
        console.log("closing");
        console.log(document.activeElement);
        if (
            document.getElementById("tagSearch") != document.activeElement
        ) {
            this.setState({ addTagDialogue: false });
        }
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
                <div
                    className="pe-tags"
                    key={tag.id}
                >{tag.name}</div>
            )
        })

        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-post-edit-page");

        const bgIndicator = this.state.title ? "pe-banner-titled" : "pe-banner-untitled";
        
        return (
            <div>
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
                        <Modal />
                    </div>
                    <div className="pe-sidebar-container">
                        <div className='pe-sidebar-content'>
                            <div className='pe-sidebar-section'>
                                <div className="pe-sidebar-section-header">
                                    POST
                                </div>
                                <button
                                    className="pe-sidebar-btn pe-community-post-btn"
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

                                    <div
                                        className="pe-add-tags"
                                        onClick={this.showAddTagDialogue}
                                        onBlur={this.hideAddTagDialogue}
                                        tabIndex="0"
                                        id="addTagButton"
                                    >
                                        <input
                                            type="text"
                                            id="tagSearch"
                                            placeholder="+ Tag"
                                            onChange={this.handleTagSearchInput}
                                        />
                                        {this.state.addTagDialogue &&
                                            <AddTagsDialogue
                                                tags={this.state.tagSearchResults}
                                            />
                                        }
                                    </div>
                                </div>







                            </div>
                            <div className='pe-sidebar-section'>
                                <div className="pe-sidebar-section-header">
                                    IMG TOOLS
                                </div>
                                <ul className='pe-sidebar-tools'>
                                    <li><i className="fas fa-plus"></i>Add more images</li>
                                    <li><i className="fas fa-code"></i>Embed post</li>
                                    <li><i className="fas fa-download"></i>Download post</li>
                                    <li><i className="fas fa-trash"></i>Delete post</li>
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