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
                    addTagDialogue: false
                });
            }
        );
    }

    returnSelected(tag) {
        this.props.handleAddTag(tag);
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
        const dialogueTags = this.state.tagSearchResults.length > 0 ? this.state.tagSearchResults : this.state.popularTags;

        const tagList = dialogueTags.map(tag => {
            return (
                <li
                    key={tag.id}
                    className="addTagLi"
                    onMouseDown={() => this.returnSelected(tag)}
                >
                    <div>{tag.name}</div>
                    <div>{tag.post_count} posts</div>
                    
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
                        if (e.keyCode === 13 || e.keyCode === 9) {
                            e.preventDefault();
                            this.attemptNewTag(this.state.tagSearchString);
                        }
                    }}
                />
                {this.state.addTagDialogue &&
                    // <AddTagsDialogue
                    //     tags={dialogueTags}
                    //     addTag={this.handleAddTag}
                    // />
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