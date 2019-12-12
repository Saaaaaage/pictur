import React from 'react';
import { withRouter } from 'react-router-dom'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            parent_id: this.props.parentId
        }
        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCommentInput(e) {
        this.setState({ body: e.target.value })

        e.target.style.height = "5px";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.submitComment(this.state);
        this.setState({ body: "" })

        if (this.props.submitCallback) {
            this.props.submitCallback();
        }
    }

    render () {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="comment-form"
                >
                <textarea
                    placeholder="Write a comment"
                    onChange={this.handleCommentInput}
                    value={this.state.body}
                    ></textarea>
                <button
                    type="submit"
                    className="comment-submit"
                    >Post</button>
            </form>
        )
    }
}

export default withRouter(CommentForm)