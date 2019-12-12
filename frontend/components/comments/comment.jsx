import React from 'react';
import CommentContainer from './comment_container';
import CommentForm from './comment_form';


class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            replyForm: false,
            replyDisplay: 'none',
            
            showChildren: false,
            fetchedChildren: false,
        }

        this.comment = this.props.comment;
        this.fetchChildren = this.props.fetchChildren;
        this.deleteComment = this.props.deleteComment;

        this.hideForm = this.hideForm.bind(this);
        this.showChildrenClick = this.showChildrenClick.bind(this);
    }

    // TODO: When a user submits a comment, the parent comment's children should be shown, and it should be told that it has a child to increment the counter
    hideForm () {
        this.setState({ replyForm: false })
        this.showChildrenClick()
    }

    showChildrenClick() {
        this.setState({showChildren: !this.state.showChildren})
        if (!this.state.fetchedChildren) {
            this.fetchChildren(this.comment.id);
            this.setState({fetchedChildren: true})
        }
    }

    // TODO: Will clicking deleteMe propagate deletions up the chain of children?
    // TODO: deleting a parent level comment should cascade? or just null out comment text
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
        if (this.comment.child_count > 0) {
            const text = this.state.showChildren ? (
                '- collapse'
            ) : (
                `+ ${this.comment.child_count} replies`
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
                        parentId={this.comment.id}
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
                    <div className="comment-body">{this.comment.body}</div>
                    {/* <button onClick={() => this.deleteComment(this.comment.id)}>Delete Me</button> */}
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
