import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {TweenMax, TimelineMax} from 'gsap';
import {gsap} from 'gsap';

class Delete extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
        if (this.props.refe()) {
            let val = this.props.refe().current
            this.animation = new TimelineMax({paused: true})
            this.animation.to(val, 0.5, {x: '-100vw', opacity: 0.6})
        }
        }, 100)
    
    }
    handleDelete = (e) => {
        let obj = {id: e.target.id}
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
            this.animation.play().then(() => {
                this.props.refreshData()
            })
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