import React from 'react';
import NavbarContainer from '../navbar/navbar_container';
import PostPreview from './post_preview';
import TagBannerContainer from './tag_banner_container'
import {Link} from 'react-router-dom';

class FrontPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            columns: 1,
            scrollPos: 0,
            trickyHeaderClasses: "tricky-header",
            trickyHeaderTop: 0

        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.listenToScroll = this.listenToScroll.bind(this);
        this.greetings = [
            '"I don\'t have an ego. My Facebook photo is a landscape."',
            '"Some flies are too awesome for the wall."',
            '"We\'re the only species on earth that observes shark week."',
            '"Hey, did you hear about the turtle in China? Two packs a day!"',
            '"Well, it\'s been real, but I have a date to catch. Or should I say.. A catch to date."',
            '"Cool cool cool."',
            '"Six seasons and a movie!"',
            '"I painted a tunnel on the side of the library. When it dries, I\'m going for it."',
            '"Oh my god! I\'m finally popular enough to be in the yearbook!"',
            '"Everybody loves pelicans, they bring babies!"',
            '"A passing grade? Like a C? Why don\'t I just get pregnant at a bus station?"',
            '"Who the hell are you always texting? Everyone you know is here!"',
            '"It\'s not a pen, it\'s a principle!"',
            '"Accidents don\'t just happen over and over and over again, okay? This isn\'t budget daycare."',
            '"Never change, or do. I\'m not your boss."',
            '"There is a time and place for subtlety, and that time was before Scary Movie."',
            '"Sometimes I think I lost something really important to me, and then it turns out I already ate it."',
            '"First time I was punched in the face, I was like \'Oh no!\', but then I was like \'this is a story..\'"',
            '"Streets ahead."',
            '"I was never one to hold a grudge. My father held grudges, I\'ll always hate him for that."',
            '"We\'re all kind of crazytown bananapants."',
            '"Blaming a bridge collapse on a school is like blaming owls for why I suck at analogies."',
            '"I know what a metaphor is! It\'s like a thought with another thought\'s hat on."',
            '"Fire can\'t go through doors, stupid. It\'s not a ghost."',
            '"Shut your pompous vortex of overlapping fangs!"',

            '"Augh! Ghost pirate!!"',
            '"Ya live by the ghost...ya die by the ghost."',
            '"The guy from Labyrinth just turned into a bird!"',
            '"Ow! My arm came off! I can\'t belive that happened"',
            '"Was something supposed to happen? Are we invisible now, or something?"',
            '"It\'s like he channels dead crazy people!"',
            '"Are these they?"',
            '"Jock rock my ass! Listen to those lyrics, man! It’s all about love, and longing!"',
            '"You were a daydreamer. A sassmouth! And, not infrequently, a bit of a gigglepuss!"',
            '"I gotta admit I always wanted to get Edgar Allan Poe in a headlock. That thing is like a pumpkin!"',
        ]
        this.chosenGreeting = this.greetings[Math.floor(Math.random() * this.greetings.length)]
    }

    componentDidMount(){
        // Watch for window size changes
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        // Add posts to state
        this.props.fetchPosts();

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
        console.log(scrollPos);
        
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
                    <div className="greeting">{this.chosenGreeting}</div>
                    <TagBannerContainer />
                    <div className="tricky-header-bg"></div>
                </div>
                <NavbarContainer/>

                { gridColumns.length > 0 ? (
                    <div className="grid-column-container">
                        {gridColumns.map((col, i) => (<div className="grid-column" key={i}>{col}</div>))}
                    </div>
                ) : (
                        <div className="grid-column-container" style={{ margin: '380px 0 0 0'}}>
                        <h2>It appears there's nothing here... Why not make an account and do some posting?</h2>
                    </div>
                )
                }
                
            </div>
        )
    }
}

export default FrontPage;