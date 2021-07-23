import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Discipline from './discipline';
import {submitChange, addEmployee} from './functions/inputSection';
import Row from './row';


class EditInputSectionEmployee extends React.Component {
    state = {
        username: '',
        password: '',
        name: '',
        firstname: '',
        lastname: '',
        discipline: '',
        email: '',
        businessAddress: ''
    }
    componentDidMount() {
        const {edit, editItem, editItemTwo} = this.props;
        if (editItem) {
            this.setState({
                firstname: editItem.firstname,
                lastname: editItem.lastname,
                discipline: editItem.discipline, 
                username: editItemTwo.username,
                password: editItemTwo.password,
                email: editItem.email,
                businessAddress: editItem.businessAddress
            })
        }
    }
    handleChange = (e) => {
        let id = e.target.id;
        if (e.target.id === 'firstname' | e.target.id === 'lastname') {
            let str = e.target.value;
            let letters = /^[A-Za-z]+$/;
            if (str.match(letters)) {
                id = e.target.id;
                this.setState({
                    [id]: e.target.value
                })   
            } else if (str.length === 0) {
                id = e.target.id;
                this.setState({
                    [id]: e.target.value
                })   
            }
        } else {
            this.setState({
                [id]: e.target.value
            })
        }
    }
    handleClick = (e) => {
        let {editItem} = this.props;
        if (editItem) {
            let obj = {
                ...this.state,
                id: this.props.editItem._id
            };
            let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'))[0].split('=')[1];
            setTimeout(() => {
                submitChange(cookie, obj)
                .then(data => {
                    if (data.Success) {
                        this.setState({
                            alert: 'Employee successfully changed.'
                        })
                        this.props.refreshData()
                    }
                })
            }, 1000)
        } else {
            //VALIDATE TYPES?? EG EMAIL AND AGE AS NUMBER?
            const {username, password, firstname, lastname, discipline, email, businessAddress} = this.state;
                if (username.length > 0 && password.length > 0 && firstname.length > 0  && lastname.length > 0 && discipline.length > 0 && email.length > 0 && businessAddress.length > 0) {
                    let cookieId = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
                    if (cookieId) {
                        let obj2 = {username: username, password, admin: false, hcProvider: false}
                        //ADD USER AS WELL??
                        addEmployee(cookieId, this.state, obj2)
                        .then(data => {
                            if (data.Data) {
                                this.setState({
                                    alert: 'Employee Added'
                                })
                                this.props.refreshData()        
                            }
                        })
                        .catch(err => {
                            if (err) {
                                this.setState({
                                    alert: err
                                })
                            }
                        })
                    } else {
                        this.setState({
                            alert: 'Please ensure you are correctly logged in.'
                        })
                    }
                } else {
                    this.setState({
                        alert: 'Please ensure all fields are filled in correctly.'
                    })
                }
        }
    }
    render() {
        const {edit, editItem, handleAdd, handleEdit} = this.props;
        const {username, firstname, lastname, password, name, discipline, email, businessAddress, alert} = this.state;
        return (
            <React.Fragment>
                <button
                onClick={(!editItem) ? handleAdd : handleEdit}
                className="closeBtnEdit">X</button>
                <div className="editSection">
                    <div className="topRow">
                        {editItem ? 
                            <FontAwesomeIcon style={{fontSize: 80}} icon={faPencilAlt} /> : 
                            <FontAwesomeIcon style={{fontSize: 80}} icon={faPlusCircle} />
                        }
                    </div>
                    <Row type="email" label="Username" id="username" value={username} onChange={this.handleChange} />
                    <Row type="password" label="Password" id="password" value={password} onChange={this.handleChange} />
                    <Row type="text" label="First Name" id="firstname" value={firstname} onChange={this.handleChange} />
                    <Row type="text" label="Last Name" id="lastname" value={lastname} onChange={this.handleChange} />                    
                    <div style={{height: 65}} className="row">
                        <label>Discipline</label>
                        <Discipline 
                        handleChange={this.handleChange}  
                        value={discipline}
                        />
                    </div>
                    <Row type="email" label="Email" id="email" value={email} onChange={this.handleChange} />
                    <Row type="text" label="Business Address" id="businessAddress" value={businessAddress} onChange={this.handleChange} />
                    {alert && (
                        <div style={{justifyContent: 'center'}} className="row">
                            <h4>{alert}</h4>
                        </div>
                    )}
                    <div style={{marginBottom: 80}} className="row">
                        <button
                        className="submit"
                        onClick={this.handleClick}
                        >Save</button>
                    </div>
                </div>
            </React.Fragment>
        )   
    }
}

export default EditInputSectionEmployee;