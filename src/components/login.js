import React from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';

class Login extends React.Component {
    state = {
        name: '', password: '', prop: ''
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }   
    handleSubmit = () => {
        let {name, password} = this.state;
        console.log('working', name, password)
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
            console.log(Priv)
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
                setTimeout(() => {
                    this.forceUpdate()
                }, 5000)
            }
        })
    }
    render() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        const {name, password, prop} = this.state;
        if (cookie && adminCookie) {
            if (adminCookie[2] === 'true') {
                return (
                    <React.Fragment>
                        <Redirect to={{pathname: "/admin-list", state: {prop: prop} }} />
                    </React.Fragment>
                )
            } else if (adminCookie[2] === 'false') {
                return (
                    <React.Fragment>
                        <Redirect to={{pathname: "/editor-list", state: {prop: prop} }} />
                    </React.Fragment>
                )
            } 
        } else {
            return (
                <React.Fragment>
                    <div className="loginForm">
                        <label>Name</label>
                        <input
                        name="name"
                        onChange={this.handleInput}
                        value={name}
                        ></input>
                        <label>Password</label>
                        <input
                        value={password}
                        onChange={this.handleInput}
                        name="password"
                        ></input>
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