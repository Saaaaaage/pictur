import React from 'react';
import PostShowImage from './post_show_image';

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

    render() {
        const images = this.props.images.map(image => {
            return <PostShowImage image={image} />
        });



        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-show-pages");
        return (
            <div className="postShowBody"> {/*  */}
                <div className="postShowMain">
                    <div className="postShowMainHeader">
                        <h1>{this.props.post.title}</h1>
                        <h3>by <strong>*UsernameGoesHere*</strong></h3>
                    </div>
                    <ul>{images}</ul>
                </div>
                <div className="postShowSidebar">

                </div>
            </div>
        )
    }
}

export default PostShow;