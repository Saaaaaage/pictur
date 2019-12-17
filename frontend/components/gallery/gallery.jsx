import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import PostPreview from './post_preview';
import TagBannerContainer from './gallery_banner/index_banner_container';
import {Link} from 'react-router-dom';

class Gallery extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            columns: 1,
            scrollPos: 0,
            trickyHeaderClasses: "tricky-header",
            trickyHeaderTop: 0

        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.listenToScroll = this.listenToScroll.bind(this);
    }

    componentDidMount(){
        // Watch for window size changes
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        // Add posts to state
        this.props.clearPosts(); // TODO: is this the best way to make sure we only display the appropriate images??
        this.props.fetchPosts();
        this.props.fetchOwner();

        this.listenToScroll();
        window.addEventListener('scroll', this.listenToScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener('scroll', this.listenToScroll);
    }

    listenToScroll() {
        // scroll position!
        const scrollPos = document.documentElement.scrollTop;
        
        // height of the window!
        // const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // percent of the way down the page!
        // const scrolled = winScroll / height;

        this.setState({ scrollPos: scrollPos});
        
        let newState = { scrollPos: scrollPos };
        scrollPos > 202 ? (
            newState.trickyHeaderTop = -312,
            newState.trickyHeaderClasses = "tricky-header is-fixed"
        ) : (
            newState.trickyHeaderTop = scrollPos / -2,
            newState.trickyHeaderClasses = "tricky-header"
        )

        this.setState(newState);

    }
    
    updateWindowDimensions(){
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
            columns: Math.max(Math.floor((window.innerWidth - 100) / 240), 1),
        });
    }

    render () {
        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-front-page");

        
        // This works way better than I expected it to...
        let gridColumns = [];
        if (this.props.posts.length > 0) {
            gridColumns = new Array(this.state.columns);
            gridColumns.fill('');
            gridColumns = gridColumns.map(() => new Array());
            this.props.posts.forEach((post, i) => {
                    gridColumns[i % this.state.columns].push(<PostPreview post={post} key={i} />)
                }
            );
        }
        
        return (
            <div>
                <div
                    className={this.state.trickyHeaderClasses}
                    style={{ top: this.state.trickyHeaderTop }}                    
                >
                    {this.props.bannerObject}
                </div>
                <NavbarContainer/>

                { gridColumns.length > 0 ? (
                    <div className="grid-column-container">
                        {gridColumns.map((col, i) => (<div className="grid-column" key={i}>{col}</div>))}
                    </div>
                ) : (
                        <div className="grid-column-container" style={{ margin: '380px 0 0 0'}}>
                        <h2>...</h2>
                    </div>
                )
                }
                
            </div>
        )
    }
}

export default Gallery;