import React from 'react';
import './login.css';

class Login extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="loginForm">
                    <label>Name</label>
                    <input></input>
                    <label>Password</label>
                    <input></input>
                    <button>Login</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;