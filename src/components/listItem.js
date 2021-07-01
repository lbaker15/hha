import React from 'react';
import Delete from './delete';
import Edit from './edit';
import trash from './assets/Trash_Icon_Gold.png';
import {TweenMax, TimelineMax} from 'gsap';
import {gsap} from 'gsap';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.refe = React.createRef();
        this.state = {deleteAlert: false}
    }
    componentDidMount() {
        setTimeout(() => {
            let val = this.refe.current
            this.animation = new TimelineMax({paused: true})
            this.animation.to(val, 0.5, {x: '-100vw', opacity: 0.6})
        }, 100)
    }
    getElem = () => {
        return this.refe;
    }
    deleteMsg = (e) => {
        const {deleteAlert} = this.state;
        const {employee} = this.props;
        if (!deleteAlert) {
            this.setState({
                deleteAlert: true,
                id: e.target.id
            })
        }
        if (deleteAlert && !employee) {
            let obj = {id: this.state.id}
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
        if (deleteAlert && employee) {
            let obj = {id: this.state.id}
            let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
            fetch('https://hannahs-heart-2.herokuapp.com/login/delete-employee', {
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
    }
    render() {
        const {data, handleEdit, employee} = this.props;
        const {deleteAlert} = this.state;
        console.log(data._id)
        return (
            <React.Fragment key={data._id} >
                {deleteAlert && (
                    <div className="deleteMsg">
                        <img src={trash} />
                        <h2>Are you sure you wish to delete
                            {" " + String(data.lastname)[0].toUpperCase() + String(data.lastname).slice(1) + ", " + String(data.firstname)[0].toUpperCase() + String(data.firstname).slice(1) + " "}
                             from the database?
                        </h2>
                        <h3>This cannot be undone!</h3>
                        <div className="btFlex">
                            <button>Cancel</button>
                            <button
                            onClick={this.deleteMsg}
                            >Delete</button>
                        </div>
                    </div>
                )}
                <div ref={this.refe} key={data._id} id={data._id} className="item">
                    <div>
                        <Edit handleEdit={handleEdit} id={data._id} />
                    </div>
                    <div style={employee ? {width: '60%'} : null}>
                        {!employee && (
                            <React.Fragment>
                            <h1>
                                {(data.discipline === 'psychiatrist') ? 'Dr ' : null} 
                                <span>{String(data.lastname)[0].toUpperCase() + String(data.lastname).slice(1) + " "}</span>
                                {String(data.firstname)[0].toUpperCase() + String(data.firstname).slice(1)}
                            </h1>
                            <h2>{data.discipline[0].toUpperCase() + data.discipline.slice(1)}</h2>
                            </React.Fragment>
                        )}
                        {employee && (
                            <h1 
                                style={{marginTop: 45}}
                                className="employeeName"><span> {String(data.lastname)[0].toUpperCase() + String(data.lastname).slice(1)} </span> 
                                {String(data.firstname)[0].toUpperCase() + String(data.firstname).slice(1)} 
                            </h1>
                        )}
                    </div>
                    <div style={employee ? {width: '20%'} : null}>
                        {!employee && (
                            <h3 style={{color: 'white'}}>{(data.gender) === 'female' ? 'F' : 'M' }</h3>
                        )}
                        {employee && (
                            <h3 style={{color: 'white', fontSize: 22, marginTop: 13, fontWeight: 400, opacity: 0.8}}>{data.discipline}</h3>
                        )}
                    </div>
                    <div>
                        <Delete 
                        deleteMsg={this.deleteMsg}
                        refe={this.getElem} 
                        refreshData={this.props.refreshData} 
                        data={data} 
                        id={data._id} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ListItem;