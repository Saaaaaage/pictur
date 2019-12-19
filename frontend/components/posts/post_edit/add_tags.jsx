import React from 'react';
import { findTags, findOrCreateTag } from '../../../util/tag_api_util';


class AddTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addTagDialogue: false,
            tagSearchString: "",
            tagSearchResults: [],
            popularTags: [],
        };
        this.returnSelected = this.returnSelected.bind(this);
        this.handleTagSearchInput = this.handleTagSearchInput.bind(this);
        this.findTags = _.debounce(this.findTags, 500).bind(this);
        this.showAddTagDialogue = this.showAddTagDialogue.bind(this);
        this.hideAddTagDialogue = this.hideAddTagDialogue.bind(this);
        this.attemptNewTag = this.attemptNewTag.bind(this);
    }

    componentDidMount() {
        findTags("").then(
            tags => {
                this.setState({ popularTags: Object.values(tags) });
            }
        );
    }

    handleTagSearchInput(e) {
        const tagSearchResults = e.target.value.length < 2 ? [] : this.state.tagSearchResults;
        this.setState({
            tagSearchString: e.target.value,
            tagSearchResults: tagSearchResults
        });
        this.findTags();
    }

    findTags() {
        if (this.state.tagSearchString.length > 1) {
            findTags(this.state.tagSearchString).then(
                (tags => {
                    this.setState({ tagSearchResults: Object.values(tags) });
                }).bind(this)
            );
        }
    }


    attemptNewTag(tagString) {
        findOrCreateTag(tagString).then(
            tag => {
                this.props.handleAddTag(tag);
                this.setState({
                    tagSearchString: "",
                    tagSearchResults: []
                });
            }
        );
    }

    returnSelected(tag) {
        if (tag.id) {
            this.props.handleAddTag(tag);
        } else {
            this.attemptNewTag(tag.name);
        }
    }

    showAddTagDialogue(e) {
        this.setState(
            { addTagDialogue: true },
            () => document.getElementById("tagSearch").focus()
        );
    }
    hideAddTagDialogue(e) {
        this.setState({
            addTagDialogue: false,
            tagSearchString: "",
            tagSearchResults: []
        });
    }

    render () {
        let dialogueTags = this.state.popularTags;
        if (this.state.tagSearchResults.length > 0) {
            dialogueTags = this.state.tagSearchResults;
        } else if (this.state.tagSearchResults.length === 0 && this.state.tagSearchString.length > 1) {
            const name = this.state.tagSearchString.toLowerCase().split(' ').map((s) => {
                return s.charAt(0).toUpperCase() + s.substring(1);
            }).join(' ');
            dialogueTags = [{
                name: name,
                post_count: null
            }];
        }

        const tagList = dialogueTags.map((tag, i) => {
            return (
                <li
                    key={i}
                    className="addTagLi"
                    onMouseDown={() => this.returnSelected(tag)}
                >
                    <div>{tag.name}</div>
                    <div>
                        {tag.post_count &&
                            <span>{tag.post_count} posts</span>
                        }
                    </div>
                    
                </li>
            )
        });
        
        return (
            <div
                className="pe-add-tags"
                onClick={this.showAddTagDialogue}
                onBlur={this.hideAddTagDialogue}
                tabIndex="0"
                id="addTagButton"
            >
                <input
                    type="text"
                    id="tagSearch"
                    placeholder="+ Tag"
                    value={this.state.tagSearchString}
                    onChange={this.handleTagSearchInput}
                    tabIndex="-1"
                    onKeyDown={e => {
                        // commit on return or tab
                        if (e.keyCode === 13 || e.keyCode === 9) {
                            e.preventDefault();
                            this.attemptNewTag(this.state.tagSearchString);
                        } else if (e.keyCode === 27) {
                            // exit on escape key
                            this.hideAddTagDialogue(e);
                            e.target.blur();
                        }
                    }}
                />
                {this.state.addTagDialogue &&
                    <div className="addTagPositioning">
                        <div className="addTagContainer">
                            <ul>
                                {tagList}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default AddTags;