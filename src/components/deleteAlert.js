import React from 'react';
import trash from './assets/Trash_Icon_Gold.png';

class DeleteAlert extends React.Component {
    render() {
        const {lastname, firstname, closeDelete, deleteMsg} = this.props;
        return (
            <React.Fragment>
                    <div className="deleteMsg">
                        <img src={trash} />
                        <h2>Are you sure you wish to delete
                            {" " + String(lastname)[0].toUpperCase() + String(lastname).slice(1) + ", " + String(firstname)[0].toUpperCase() + String(firstname).slice(1) + " "}
                             from the database?
                        </h2>
                        <h3>This cannot be undone!</h3>
                        <div className="btFlex">
                            <button
                            onClick={closeDelete}
                            >Cancel</button>
                            <button
                            onClick={deleteMsg}
                            >Delete</button>
                        </div>
                    </div>
                    <div></div>
            </React.Fragment>
        )
    }
}

export default DeleteAlert;