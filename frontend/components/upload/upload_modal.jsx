import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect } from 'react-router-dom';

class UploadModal extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            uploads: [],
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.prepareRedirect = this.prepareRedirect.bind(this);
    }

    prepareRedirect() {
        this.setState({uploadSuccess: true});
    }

    handleSubmit(e) {
        // e.preventDefault();
        let formData = new FormData();
        formData.append('post[title]', 'test post please ignore');

        Array.from(this.state.files).forEach(file => {
            formData.append('post[uploads][]', file);
        })

        const that = this;
        this.props.submitPost(formData)
            .then(
                action => {
                    that.setState({ redirect: `/posts/${action.post.id}`})
                }
            );
    }

    handleFile(e) {
        e.preventDefault();
        this.setState({ files: e.currentTarget.files }, this.handleSubmit)
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <form className="box">
                <div className="box_input">
                    <input
                        id="upload"
                        className="box_file"
                        multiple
                        type="file"
                        onChange={this.handleFile}
                    />
                    Drop images here
                </div>
                <label for="upload">
                    Choose Photo(s)
                </label>
                <div className='box_uploading'>Uploading...</div>
                <div className='box_error'>Things have gone pear shaped! <span></span></div>
            </form>
        )
    }
}
export default UploadModal