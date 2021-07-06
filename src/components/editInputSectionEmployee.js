import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';


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
        const {edit, editItem} = this.props;
        if (editItem) {
            this.setState({
                firstname: editItem.firstname,
                lastname: editItem.lastname,
                discipline: editItem.discipline, 
                username: editItem.username,
                password: editItem.password,
                email: editItem.email,
                businessAddress: editItem.businessAddress
            })
        }
    }
    handleChange = (e) => {
        let id = e.target.id;
        this.setState({
            [id]: e.target.value
        })
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
                fetch('https://hannahs-heart-2.herokuapp.com/employee/edit-employee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': cookie
                    },
                    body: JSON.stringify(obj)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.Success) {
                        this.props.refreshData()
                    }
                })
            }, 1000)
        } else {
            const {username, password, firstname, lastname, discipline, email, businessAddress} = this.state;
                if (username.length > 0 && password.length > 0 && firstname.length > 0  && lastname.length > 0 && discipline.length > 0 && email.length > 0 && businessAddress.length > 0) {
                    let cookieId = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
                    if (cookieId) {
                        let obj = {...this.state, author: cookieId[2]}
                        let obj2 = {name: username, password, admin: false}
                        //ADD USER AS WELL??
                        fetch('https://hannahs-heart-2.herokuapp.com/login/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(obj2)
                        })
                        .then(res => res.json())
                        .then(data => console.log(data))

                        fetch('https://hannahs-heart-2.herokuapp.com/employee/add-employee', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(obj)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.Data) {
                                this.setState({
                                    alert: 'Employee Added'
                                })
                                this.props.refreshData()
                                //ANIMATION HERE? THIS IS CAUSING MEMORY LEAK
                                setTimeout(() => {
                                    this.setState({
                                        alert: ''
                                    })
                                }, 5000)
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
        const {username, firstname, lastname, password, name, discipline, email, businessAddress} = this.state;
        return (
            <React.Fragment>
                <button
                onClick={(!editItem) ? handleAdd : handleEdit}
                className="closeBtnEdit">X</button>
                <div className="editSection">
                    <div className="topRow">
                        { editItem ? 
                            <FontAwesomeIcon style={{fontSize: 80}} icon={faPencilAlt} /> : 
                            <FontAwesomeIcon style={{fontSize: 80}} icon={faPlusCircle} />
                        }
                    </div>
                    <div className="row">
                        <label>Username</label>
                        <input
                        id="username"
                        onChange={this.handleChange}
                        value={username}
                        ></input>
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input
                        id="password"
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                        ></input>
                    </div>
                    <div className="row">
                        <label>First Name</label>
                        <input
                        id="firstname"
                        onChange={this.handleChange}
                        value={firstname}
                        ></input>
                    </div>
                    <div style={{height: 60}} className="row">
                        <label>Last Name</label>
                        <input
                        id="lastname"
                        onChange={this.handleChange}
                        value={lastname}
                        ></input>
                    </div>
                    <div className="row">
                        <label>Discipline</label>
                        <input
                        id="discipline"
                        onChange={this.handleChange}
                        value={discipline}
                        ></input>
                    </div>
                    <div className="row">
                        <label>Email</label>
                        <input
                        id="email"
                        onChange={this.handleChange}
                        value={email}
                        ></input>
                    </div>
                    <div className="row">
                        <label>Business Address</label>
                        <input
                        id="businessAddress"
                        onChange={this.handleChange}
                        value={businessAddress}
                        ></input>
                    </div>
                    {!this.props.editItem && this.state.alert && (
                        <div className="justAddedAlert">
                            {this.state.alert}
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