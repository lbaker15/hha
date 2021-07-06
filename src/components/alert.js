import React from 'react';

class Alert extends React.Component {
    render() {
        const {closeOverlay} = this.props;
        return (
            <React.Fragment>
                <div className="overlay"></div>
                <div className="alert">
                    <button
                    onClick={closeOverlay}
                    className="closeBtn">X</button>
                    <div className="alertText">
                        <h3>
                        For immediate support and assistance, please
                        phone 911 or call a number below.
                        </h3>
                        <div className="hotline">
                            <h4>Crisis Services Canada</h4>
                            <h5>Call: <span>1 833 456 4566</span></h5>
                            <h5>Text: <span>45645</span> (4pm - midnight) </h5>
                        </div>
                        <div className="hotline">
                            <h4>Crisis Line</h4>
                            <h5>Call: <span>1 866 996 0991</span></h5>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Alert;