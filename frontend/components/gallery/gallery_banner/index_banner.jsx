import React from 'react';
import Tag from './index_tag';

class TagBanner extends React.Component {
    constructor(props) {
        super(props);

        this.randomBackgrounds = {
            purple: 'linear-gradient(rgb(74, 88, 251), rgb(46, 48, 53))',
            pink: 'linear-gradient(rgb(255, 81, 186), rgb(46, 48, 53))',
            orange: 'linear-gradient(rgb(255, 125, 0), rgb(46, 48, 53))',
            green: 'linear-gradient(rgb(1, 185, 107), rgb(46, 48, 53))',
            teal: 'linear-gradient(rgb(32, 190, 232), rgb(46, 48, 53))',
            blue: 'linear-gradient(rgb(34, 126, 250), rgb(46, 48, 53))',
            lavender: 'linear-gradient(rgb(198, 193, 255), rgb(46, 48, 53))',
            navy: 'linear-gradient(rgb(28, 44, 93), rgb(46, 48, 53))',
        };

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
            '"First time I was punched in the face, I was like \'Oh no!\', but then I was like \'this is a story...\'"',
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
        ];
        this.chosenGreeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
    }
    componentDidMount () {
        this.props.fetchTags();
    }

    render() {
        const bgKeys = Object.keys(this.randomBackgrounds);
        const tags = this.props.tags.map((tag, i) => {
            const background = this.randomBackgrounds[bgKeys[i % bgKeys.length]]
            return (
                <Tag background={background} tag={tag} key={i}/>
            );
        });
        return (
            <div>
                <div className="greeting">{this.chosenGreeting}</div>
                <div
                    className='tag-banner'
                >
                    {tags}
                </div>
                <div className="tricky-header-bg"></div>
            </div>
        )
    }
}

export default TagBanner;