import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class Edit extends React.Component {
    render() {
        const {id} = this.props;
        return (
            <React.Fragment>
                <button id={id} onClick={this.props.handleEdit} key={Math.random()} className="edit">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
            </React.Fragment>
        )
    }
}

export default Edit;