import React from 'react'

class DragAndDrop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dragging: false
        }
        this.dropRef = React.createRef();

        this.handleDragIn = this.handleDrag.bind(this);
        this.handleDragOut = this.handleDragOut.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    componentDidMount() {
        let component = this.dropRef.current;
        component.addEventListener('dragenter', this.handleDragIn);
        component.addEventListener('dragleave', this.handleDragOut);
        component.addEventListener('dragover', this.handleDrag);
        component.addEventListener('drop', this.handleDrop);
        this.dragCounter = 0;
        // console.log('Mounted DragAndDrop')
    }

    componentWillUnmount() {
        let component = this.dropRef.current;
        component.removeEventListener('dragenter', this.handleDragIn);
        component.removeEventListener('dragleave', this.handleDragOut);
        component.removeEventListener('dragover', this.handleDrag);
        component.removeEventListener('drop', this.handleDrop);
        // console.log('Unmounted DragAndDrop')
    }

    
    handleDragIn (e) { 
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({dragging: true})
        }
        // console.log('Drag in detected');
    }
    handleDragOut (e) { 
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        this.setState({dragging: false})
        // console.log('Drag out detected');
    }
    handleDrop (e) { 
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragging: false});
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.props.handleDrop(e.dataTransfer.files); // <------------- TODO: ???
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
        // console.log('Drop detected');
    }

    // Just to prevent default behavior
    handleDrag (e) {
        e.preventDefault();
        e.stopPropagation();
        // console.log('Preventing default drag');
    }

    render() {
        return (
            // <div
            //     ref={this.dropRef}
            // >
            //     {this.props.children}
            // </div>

            <div style={{ display: 'inline-block', position: 'relative' }} ref={this.dropRef}>
                {this.state.dragging &&
                    <div style={{border: 'dashed grey 4px',backgroundColor: 'rgba(255,255,255,.8)',position: 'absolute',top: 0,bottom: 0,left: 0,right: 0,zIndex: 9999}}>
                        <div style={{position: 'absolute',top: '50%',right: 0,left: 0,textAlign: 'center',color: 'grey',fontSize: 36}}>
                            <div>drop here :)</div>
                        </div>
                    </div>
                }
                {/* Drag area */}
                {this.props.children}
            </div>
        )
    }
}

export default DragAndDrop;