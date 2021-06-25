import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

class Delete extends React.Component {
    handleDelete = (e) => {
        let obj = {id: e.target.id}
        console.log(obj)
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        fetch('https://hannahs-heart-2.herokuapp.com/login/delete', {
            method: 'POST',
            headers: {
                'authorization': cookie[0].split('=')[1],
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //ADD ANIMATION HERE
            //SET TIMEOUT TO REFRESH DATA
            this.props.refreshData()
        })
    }
    render() {
        const {data, id} = this.props;
        return (
            <React.Fragment>
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