import React from 'react';
import Tag from './tag';

class TagBanner extends React.Component {
    constructor(props) {
        super(props)

        this.randomBackgrounds = {
            purple: 'linear-gradient(rgb(74, 88, 251), rgb(46, 48, 53))',
            pink: 'linear-gradient(rgb(255, 81, 186), rgb(46, 48, 53))',
            orange: 'linear-gradient(rgb(255, 125, 0), rgb(46, 48, 53))',
            green: 'linear-gradient(rgb(1, 185, 107), rgb(46, 48, 53))',
            teal: 'linear-gradient(rgb(32, 190, 232), rgb(46, 48, 53))',
            blue: 'linear-gradient(rgb(34, 126, 250), rgb(46, 48, 53))',
            lavender: 'linear-gradient(rgb(198, 193, 255), rgb(46, 48, 53))',
            navy: 'linear-gradient(rgb(28, 44, 93), rgb(46, 48, 53))',
        }
    }
    componentDidMount () {
        this.props.fetchTags()
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
            <div
                className='tag-banner'
            >
                {tags}
            </div>
        )
    }
}

export default TagBanner;