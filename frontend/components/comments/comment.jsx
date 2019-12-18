import React from 'react';
import CommentContainer from './comment_container';
import CommentForm from './comment_form';
import { Link } from 'react-router-dom';


class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            replyForm: false,
            replyDisplay: 'none',
            
            showChildren: false,
            fetchedChildren: false,

            body: ""
        };

        this.hideForm = this.hideForm.bind(this);
        this.showChildrenClick = this.showChildrenClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.fetchComment().then((comment => {this.setState(comment);}).bind(this));
    }

    // TODO: When a user submits a comment, the parent comment's children should be shown, and it should be told that it has a child to increment the counter
    hideForm () {
        this.setState({ replyForm: false });
        this.showChildrenClick();
    }

    showChildrenClick() {
        this.setState({showChildren: !this.state.showChildren});
        if (!this.state.fetchedChildren) {
            this.props.fetchChildren(this.props.comment.id);
            this.setState({fetchedChildren: true});
        }
    }

    handleDelete(e) {
        this.props.deleteComment(this.props.comment.id);
    }

    
    render() {
        let childComments 
        if (this.state.showChildren) {
            childComments = this.props.children.map((comment, i) => {
                return (
                    <CommentContainer
                        key={i}
                        comment={comment}
                    />
                )
            });
        }

        let showChildrenButton;
        if (this.props.comment.child_count > 0) {
            const text = this.state.showChildren ? (
                '- collapse'
            ) : (
                `+ ${this.props.comment.child_count} replies`
            );
            showChildrenButton = (
                <span
                    className="show-replies"
                    onClick={this.showChildrenClick}
                >{text}</span>
            )
        }

        const embeddedReplyForm = this.state.replyForm ? (
            <div className="indented-child">
                <div className="comment">
                    <CommentForm
                        submitComment={this.props.submitComment}
                        parentId={this.props.comment.id}
                        submitCallback={this.hideForm}
                        />
                </div>
            </div>
        ) : (
            null
        );
        
        let cssClass;
        let indentationContainer;
        if (this.props.root) {
            cssClass = "comment root-comment";
            indentationContainer = "";
        } else {
            cssClass = "comment";
            indentationContainer = "indented-child";
        }
        
        return (
            <div className={indentationContainer}>
                <div
                    className={cssClass}
                    onMouseOver={() => this.setState({ replyDisplay: 'flex' })}
                    onMouseOut={() => this.setState({ replyDisplay: 'none' })}
                >
                    <div className="comment-header">
                        <Link to={`/users/${this.props.comment.user_id}`}>{this.props.comment.username}</Link>
                        {this.props.comment.user_id === this.props.currentUserId &&
                            <button onClick={this.handleDelete}>delete</button>
                        }
                    </div>
                    <div className="comment-body">{this.props.comment.body}</div>
                    <div
                        className="comment-reply-botton"
                        style={{ display: this.state.replyDisplay }}
                        onClick={() => this.setState({ replyForm: true })}
                    > Reply</div >
                    {showChildrenButton}
                </div>
                {embeddedReplyForm}
                <ul>{childComments}</ul>
            </div>
        )
    }
};

export default Comment;
