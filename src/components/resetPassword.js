import React from 'react';
import './reset.css';

class ResetPassword extends React.Component {
    state = {
        username: ''
    }
    handleChange = (e) => {
        this.setState({
            username: e.target.value
        })
    } 
    handleClick = () => {
        const {username} = this.state;
        let cookie = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
        if (cookie) {
            let obj = {id: cookie[2], username: username}
            fetch('https://hannahs-heart-2.herokuapp.com/pwd/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            .then(data => console.log(data))
        }
    }
    render() {
        const {username} = this.state;
        return (
            <React.Fragment>
                <div className="reset">
                    <div className="form">
                        <h2>Enter your username below and you will be emailed with a reset link.</h2>
                        <input 
                        onChange={this.handleChange}
                        value={username}
                        />
                        <button
                        onClick={this.handleClick}
                        >Submit</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ResetPassword;