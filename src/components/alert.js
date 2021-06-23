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
                            <h4>Hotline Name</h4>
                            <h5>4322 432 4321</h5>
                        </div>
                        <div className="hotline">
                            <h4>Hotline Name</h4>
                            <h5>4322 432 4321</h5>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Alert;