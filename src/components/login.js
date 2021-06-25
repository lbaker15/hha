import React from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';

class Login extends React.Component {
    state = {
        name: '', password: ''
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
            let {Token} = data;
            if (Token) {
                document.cookie = Token;
                let now = new Date()
                let time = now.getTime()
                time += 1 * 3600 * 1000
                now.setTime(time)
                document.cookie = 'token' + "=" + Token + ";expires=" + now.toUTCString() +";path=/";
                this.forceUpdate()
            }
        })
    }
    render() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        const {name, password} = this.state;
        if (cookie) {
            return (
                <React.Fragment>
                    <Redirect to="/admin-list" />
                </React.Fragment>
            )
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