import Modal from '../../utils/modal';
import React from 'react';
import NavbarContainer from '../../navbar/navbar_container';
import { fetchPost } from '../../../actions/post_actions';

class PostEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: this.props.post
        }
        this.handleTitleInput = this.handleTitleInput.bind(this);
    }

    componentDidMount() {
        this.props.fetchPost();
        this.setState({post: this.props.post})
    }

    handleTitleInput(e) {
        this.setState({title: e.target.value})
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


        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-post-edit-page");

        const bgIndicator = this.state.title ? "pe-banner-titled" : "pe-banner-untitled";
        
        // debugger
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
                            value={this.props.post.title}
                        />
                        {images}
                        <div className="add-image-container">
                            <button
                                className="add-image-button"
                                onClick={() => this.props.openModal('upload')}
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
                                <button className="pe-sidebar-btn pe-community-post-btn">
                                    To Community
                                </button>
                                <button className="pe-sidebar-btn pe-community-hidden-btn">
                                    Hidden
                                </button>
                            </div>
                            <div className='pe-sidebar-section'>
                                <div className="pe-sidebar-section-header">
                                    ADD TAGS
                                </div>
                                <button className="pe-add-tags">+ Tag</button>
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