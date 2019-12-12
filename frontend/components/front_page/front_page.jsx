import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import PostPreview from './post_preview';
import {Link} from 'react-router-dom';

class FrontPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            columns: 1
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount(){
        // Watch for window size changes
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        // Add posts to state
        this.props.fetchPosts();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions(){
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
            columns: Math.max(Math.floor((window.innerWidth - 100) / 240), 1)
        });
    }

    render () {
        // TODO: is there better way change the class of the body depending on the page?
        const body = document.getElementsByTagName('body')[0];
        // body.classList.forEach(c => body.classList.remove(c));
        body.classList.remove(...body.classList);
        body.classList.add("bg-front-page");

        
        // This works way better than I expected it to...
        let gridColumns = null;
        if (this.props.posts.length > 0) {
            gridColumns = new Array(this.state.columns);
            gridColumns.fill('');
            gridColumns = gridColumns.map(() => new Array());
            this.props.posts.forEach((post, i) => {
                    gridColumns[i % this.state.columns].push(<PostPreview post={post} key={i} />)
                }
            );
        } else {
            return <div></div>
        }
        
        return (
            <div>
                <NavbarContainer/>
                <br /><br />

                {/* <div className="grid-column-container">
                    {gridColumns.map((col, i) => (<div className="grid-column" key={i}>{col}</div>))}
                </div> */}
                
            </div>
        )
    }
}

export default FrontPage;