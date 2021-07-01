import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';


class Delete extends React.Component {
    handleDelete = (e) => {
        this.props.deleteMsg(e)
    }
    render() {
        const {data, id} = this.props;
        return (
            <React.Fragment key={Math.random()}>
               
                <button 
                key={id}
                id={id}
                onClick={this.handleDelete}
                className="delete">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </React.Fragment>
        )
    }
}

export default Delete;