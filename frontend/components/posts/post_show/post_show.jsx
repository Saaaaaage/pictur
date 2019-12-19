import React from 'react';
import PostShowImage from './post_show_image';
import NavbarContainer from '../../navbar/navbar_container';
import CommentContainer from '../../comments/comment_container';
import CommentForm from '../../comments/comment_form';
import {Link} from 'react-router-dom';

class PostShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false
        };

        this.randomBackgrounds = {
            purple: 'linear-gradient(rgba(74, 88, 251, .9), rgba(46, 48, 53, 1))',
            pink: 'linear-gradient(rgba(255, 81, 186, .9), rgba(46, 48, 53, 1))',
            orange: 'linear-gradient(rgba(255, 125, 0, .9), rgba(46, 48, 53, 1))',
            green: 'linear-gradient(rgba(1, 185, 107, .9), rgba(46, 48, 53, 1))',
            teal: 'linear-gradient(rgba(32, 190, 232, .9), rgba(46, 48, 53, 1))',
            blue: 'linear-gradient(rgba(34, 126, 250, .9), rgba(46, 48, 53, 1))',
            lavender: 'linear-gradient(rgba(198, 193, 255, .9), rgba(46, 48, 53, 1))',
            navy: 'linear-gradient(rgba(28, 44, 93, .9), rgba(46, 48, 53, 1))',
        };
        this.setShowEdit = this.setShowEdit.bind(this);
    }

    componentDidMount(){
        this.props.loadPost();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.postId != prevProps.match.params.postId) {
            console.log('Updating component');
            // this.props.clearComments();
            this.props.loadPost();
        }
    }

    componentWillUnmount() {
        console.log('Unmounting');
        this.props.clearComments();
    }

    setShowEdit(value) {
        this.setState({showEdit: value});
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
            );
        });
        
        const bgKeys = Object.keys(this.randomBackgrounds);
        
        const tags = Object.values(this.props.post.tags || {}).map((tag, i) => {
            const background = this.randomBackgrounds[bgKeys[i % bgKeys.length]];
            return (
                <Link
                    to={`/tags/${tag.id}`}
                    style={{background:background}}
                    key={i}
                    className="postShowTags"
                >
                    {tag.name}
                </Link>
            )
        });

        const showEdit = this.props.currentUserId === this.props.post.user_id && this.state.showEdit ? "block" : "none";


        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-show-pages");
        return (
            <div>
                <div>
                    <NavbarContainer />
                </div>
                <div className="postShowBody">
                    <div className="postShowMain">
                        <div
                            className="postShowMainHeader"
                            onMouseOver={() => this.setShowEdit(true)}
                            onMouseOut={() => this.setShowEdit(false)}
                        >
                            <h1>{this.props.post.title}</h1>
                            <h3>by <strong>{this.props.post.user.username}</strong></h3>
                            <div className="post-edit" style={{ display: showEdit }}>
                                <Link to={`/posts/${this.props.post.id}/edit`}>
                                    <i className="fas fa-pen-square"></i>
                                </Link>
                            </div>
                        </div>
                        <ul>{images}</ul>

                        <div className="postShowFooter">
                            {tags}
                        </div>

                        <div className="comment-container">
                            <CommentForm
                                submitComment={this.props.submitComment}
                                currentUserId={this.props.currentUserId}
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