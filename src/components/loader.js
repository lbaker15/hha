import React from 'react';

class Loader extends React.Component {
    render() {
        const {loading} = this.props;
        return (
            <div className="loader">
                 
                    <div className="pulse"> 
                    </div>
              
            </div>
        )
    }
}

export default Loader;