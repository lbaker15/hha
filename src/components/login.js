import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css';
import logo from './assets/Hannahs-Heart-Logo_with-halo.png';
import userIcon from './assets/User_Icon_Blue_Login.png';
import trashIcon from './assets/Lock_Icon_Blue_Login.png';
import Loader from './loader';

class Login extends React.Component {
    state = {
        name: '', password: '', prop: '', loader: false, alert: ''
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }   
    handleSubmit = () => {
        let {name, password} = this.state;
        if (name.length > 0 && password.length > 0) {
            this.setState({
                loader: true
            })
            fetch('https://hannahs-heart-2.herokuapp.com/login/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name, 
                    password: password
                })
            })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                let {Token, Priv} = data;
                if (Token) {
                    this.setState({
                        prop: data.Name
                    })
                    let now = new Date()
                    let time = now.getTime()
                    time += 1 * 3600 * 1000
                    now.setTime(time)
                    document.cookie = 'token' + "=" + Token + ";expires=" + now.toUTCString() +";path=/";
                    document.cookie = 'admin' + "=" + Priv + ";expires=" + now.toUTCString() +";path=/";
                    document.cookie = 'name' + "=" + data.Name + ";expires=" + now.toUTCString() +";path=/";
                    document.cookie = 'id' + "=" + data.Id + ";expires=" + now.toUTCString() +";path=/";
                    setTimeout(() => {
                        this.forceUpdate()
                    }, 100)
                } else {
                    let {Failure} = data;
                    this.setState({
                        alert: Failure,
                        loader: false
                    })
                    setTimeout(() => {
                        this.setState({
                            alert: ''
                        })
                    }, 3000)
                }
            })
        } else {
            this.setState({
                alert: 'Please ensure both fields are entered correctly before submitting.'
            })
            setTimeout(() => {
                this.setState({
                    alert: ''
                })
            }, 3000)
        }
    }
    render() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        const {alert, name, password, prop, loader} = this.state;
        if (cookie && adminCookie) {
            if (adminCookie[2] === 'true') {
                return (
                    <React.Fragment>
                        <Redirect to={{pathname: "/admin-landing", state: {prop: prop} }} />
                    </React.Fragment>
                )
            } else if (adminCookie[2] === 'false') {
                return (
                    <React.Fragment>
                        <Redirect to={{pathname: "/editor-landing", state: {prop: prop} }} />
                    </React.Fragment>
                )
            } 
        } else {
            return (
                <React.Fragment>
                    {loader && (
                        <Loader />
                    )}
                    <div className="loginCenter">
                    <div className="loginImage">
                        <img src={logo} />
                    </div>
                    <div className="loginInfo">
                        <h3>Non members please return to</h3>
                        <h4>
                            <Link to="/form">
                            Find a Professional
                            </Link>
                        </h4>
                    </div>
                    <div className="loginForm">
                        <div>
                        <img src={userIcon} />
                        <input
                        name="name"
                        onChange={this.handleInput}
                        placeholder="Username"
                        value={name}
                        ></input>
                        </div>
                        <div>
                        <img src={trashIcon} />
                        <input
                        value={password}
                        onChange={this.handleInput}
                        name="password"
                        placeholder="Password"
                        ></input>
                        </div>
                    </div>
                    <div className="forgotPswd">
                        <h5>
                            <Link to="/reset-password">
                            Forgot your password?
                            </Link>
                        </h5>
                    </div>
                    {alert && (
                        <div className="alertNew">
                            {alert}
                        </div>
                    )}
                    <button
                    onClick={this.handleSubmit}
                    >Login</button>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Login;