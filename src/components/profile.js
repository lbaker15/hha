import React from 'react';
import './profile.css';
import AdminIcon from './assets/Admin_Icon_White.png';
import { Redirect } from 'react-router';

class Profile extends React.Component {
    state = {
        name: '', username: '', password: '', 
        discipline: '', email: '', businessAddress: '', 
        alert: '', redirect: false, admin: ''
    }
    closeProfile = () => {
        this.setState({
            redirect: true
        })
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let cookieName = document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        let idCookie = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
        if (cookie && adminCookie) {
            if (cookieName) {
                this.setState({
                    adminName: cookieName[2],
                    cookie,
                    admin: adminCookie
                })
            }
        }
        fetch('https://hannahs-heart-2.herokuapp.com/data/get-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idCookie[2]
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                let {username, firstname, lastname, password, discipline, email, businessAddress} = data.Data[0];
                this.setState({
                    id: idCookie[2], firstname, lastname, username, password, discipline, email, businessAddress
                })
            }
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleClick = () => {
        let {cookie} = this.state;
        let obj = {...this.state}
        delete obj.cookie;
        delete obj.adminName;
        obj.firstname = obj.firstname.toLowerCase()
        obj.lastname = obj.lastname.toLowerCase()
        obj.username = obj.username.toLowerCase()
        if (cookie) {
        setTimeout(() => {
        fetch('https://hannahs-heart-2.herokuapp.com/login/edit-employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': cookie[2]
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.Success) {
                this.setState({
                    alert: 'Changes successful.'
                })
            } else {
                this.setState({
                    alert: 'Changes unsuccessful, please try again.'
                })
            }
        })
        }, 500)
        } else {
            this.setState({
                alert: 'Please ensure you are logged in before making any changes.'
            })
        } 
    }
    render() {
        const {redirect, admin, alert, adminName, firstname, lastname, username, password, discipline, email, businessAddress} = this.state;
        return (
            <React.Fragment>
                {redirect && admin && (
                    <Redirect to="/admin-landing" />
                )}
                {redirect && !admin && (
                    <Redirect to="/editor-landing" />
                )}
                <div className="myProfile">
                    <div className="topSectionP">
                        <div className="left">
                            <h2>My Profile</h2>
                        </div>
                        <div className="right">
                            <img src={AdminIcon} />
                            <h3>{adminName}</h3>
                        </div>
                    </div>
                    <button 
                    onClick={this.closeProfile}
                    className="closeProfile">X</button>
                    <div className="inner">
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
                            type="password"
                            id="password"
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
                        <div className="row">
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
                    </div>
                    <div className="profileAlert">
                        {alert}
                    </div>
                    <button
                    className="profileSave"
                    onClick={this.handleClick}
                    >Save</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;