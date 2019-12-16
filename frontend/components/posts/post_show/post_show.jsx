import React from 'react';
import PostShowImage from './post_show_image';
import NavbarContainer from '../../navbar/navbar_container';
import CommentContainer from '../../comments/comment_container';
import CommentForm from '../../comments/comment_form';

class PostShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.loadPost();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.postId != prevProps.match.params.postId) {
            this.props.loadPost();
        }
    }

    componentWillUnmount() {
        this.props.clearComments();
    }

    render() {
        const images = this.props.images.map((image, i) => {
            return <PostShowImage image={image} key={i}/>
        });
        const rootComments = this.props.rootComments.map((comment, i) => {
            return (
                <CommentContainer
                    key={i}
                    comment={comment}
                    root={true}
                />
            )
        });


        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-show-pages");
        return (
            <div>
                <NavbarContainer />
                <div className="postShowBody">
                    <div className="postShowMain">
                        <div className="postShowMainHeader">
                            <h1>{this.props.post.title}</h1>
                            <h3>by <strong>{this.props.post.user.username}</strong></h3>
                        </div>
                        <ul>{images}</ul>

                        <div className="comment-container">
                            <CommentForm
                                submitComment={this.props.submitComment}
                            />
                            <ul>{rootComments}</ul>
                        </div>
                    </div>
                    <div className="postShowSidebar">

                    </div>
                </div>
            </div>
            
        )
    }
}

export default PostShow;







/*
entities:
    posts:
        1: als;dkfja;lskdf
    comments:
        root:
            1 asld;fjkaks;ldf
            2 a;sldfkja;sldfkja
        1:
            4 a;lsdkfja;lsdfkj
            5 a;sldkfja;lskdfj
*/