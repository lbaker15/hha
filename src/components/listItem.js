import React from 'react';
import Delete from './delete';
import Edit from './edit';
import DeleteAlert from './deleteAlert';
import ThirdRow from './thirdRow';
import {TweenMax, TimelineMax} from 'gsap';
import {handleDelete, deleteEmployee} from './functions/listItem';

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
            handleDelete(obj, cookie)
            .then(data => {
                if (data) {
                    this.animation.play().then(() => {
                        this.props.refreshData()
                    })
                }
            })
        }
        if (deleteAlert && employee) {
            let obj = {id: this.state.id}
            let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
            deleteEmployee(obj, cookie)
            .then(data => {
                if (data) {
                    this.animation.play().then(() => {
                        this.props.refreshData()
                    })
                }
            })
        }
    }
    closeDelete = () => {
        this.setState({
            deleteAlert: false
        })
    }
    render() {
        const {data, handleEdit, employee} = this.props;
        const {deleteAlert} = this.state;
        console.log(data._id)
        return (
            <React.Fragment key={data._id} >
                {deleteAlert && (
                    <DeleteAlert 
                    closeDelete={this.closeDelete} deleteMsg={this.deleteMsg}
                    lastname={data.lastname} firstname={data.firstname} />
                )}
                <div ref={this.refe} key={data._id} id={data._id} className="item">
                    <div>
                        <Edit handleEdit={handleEdit} id={data._id} />
                    </div>
                    <div style={employee ? {width: '60%'} : null}>
                        {!employee && (
                            <React.Fragment>
                                <h1>
                                    <span>{(data.discipline === 'psychiatrist') ? 'Dr ' : null} 
                                    {String(data.lastname)[0].toUpperCase() + String(data.lastname).slice(1) + " "}</span>
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
                        <ThirdRow 
                        discipline={data.discipline} gender={data.gender} 
                        employee={employee}
                        />
                    <div>
                        <Delete 
                        deleteMsg={this.deleteMsg}
                        refe={this.getElem} 
                        refreshData={this.props.refreshData} 
                        data={data} 
                        id={data._id} 
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ListItem;