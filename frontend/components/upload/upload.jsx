import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import DragAndDrop from '../utils/drag_and_drop';
import { withRouter } from 'react-router-dom'


class Upload extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            redirect: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleManualUpload = this.handleManualUpload.bind(this);
        this.prepareRedirect = this.prepareRedirect.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    prepareRedirect() {
        this.setState({uploadSuccess: true});
    }

    handleSubmit(e) {

        let formData = new FormData();
        formData.append('post[id]', this.props.match.params.postId);
        // formData.append('post[title]', "this is going to be the title of the post");

        if (this.state.files.every(file => {
            let size = file.size / 1024 / 1024;
            return size <= 5;
        })) {
            this.state.files.forEach(file => {
                formData.append('post[uploads][]', file);
            });

            const that = this;
            this.props.formAction(formData)
                .then(
                    action => {
                        that.setState({ redirect: `/posts/${action.post.id}/edit` });
                        that.props.closeModal();
                    }
                );
        } else {
            alert('One or more of your files exceeds 5MB');
            this.setState({files: []});
        }
        
    }

    handleManualUpload(e) {
        e.preventDefault();
        this.setState({ files: Array.from(e.currentTarget.files) }, this.handleSubmit);
    }

    handleDrop(fileList) {
        this.setState({ files: Array.from(fileList) }, this.handleSubmit);
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect}/>);
        }
        return (
            <div className="upload-modal">
                <div className="upload-drop">
                    <DragAndDrop handleDrop={this.handleDrop}>
                        <div className="drop-here">
                            <span>Drop images here</span>
                        </div>
                    </DragAndDrop>
                </div>
                <div className="upload-manual">
                    <form>
                        <label htmlFor="upload">
                            <i className="fas fa-image"></i>
                            Choose Photo/Video
                            <input
                                accept=".jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp,.xcf,.webp"
                                id="upload"
                                multiple
                                type="file"
                                style={{display: 'none'}}
                                onChange={this.handleManualUpload}
                            />
                        </label>
                    </form>
                    <div className="action-divider">
                        <div className='small-divider'></div>
                        or
                        <div className='small-divider'></div>
                    </div>
                    <div className="url-upload">
                        <input type="text" placeholder="Paste image or URL"/>
                    </div>
                    <div className="disabled-actions">
                        <button className="disabled-button">
                            <i className="fas fa-brush"></i>
                            Meme Gen
                        </button>
                        <button className="disabled-button">
                            <i className="fas fa-film"></i>
                            Video to Gif
                        </button>
                        <button className="disabled-button">
                            <i className="fas fa-cloud-upload-alt"></i>
                            My Uploads
                        </button>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default withRouter(Upload)