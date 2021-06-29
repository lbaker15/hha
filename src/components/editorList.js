import React from 'react';

class EditorList extends React.Component {
    state = {
        validated: false
    }
    componentDidMount() {
        //Set validated state here - check editor priv & token
    }
    render() {
        //Conditionally render based upon validated state
        return (
            <React.Fragment>
                EDITOR LIST WILL GO HERE
            </React.Fragment>
        )
    }
}

export default EditorList;