import React from 'react';

class ResetLink extends React.Component {
    state = {
        password: ''
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        console.log(id)
    }
    handleChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleClick = () => {
        const {password} = this.state;
        const {id} = this.props.match.params;
        let obj = {password, id}
        console.log(password, id)
        fetch('https://hannahs-heart-2.herokuapp.com/pwd/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(data => data.json())
        .then(data => {
            if (data.Success) {
                this.setState({
                    alert: 'Password changed.'
                })
            } else {
                this.setState({
                    alert: 'Password change unsuccessful, please try again.'
                })
            }
        })
    }
    render() {
        const {password, alert} = this.state;
        return (
            <React.Fragment>
                <div className="resetVS">
                    <div className="resetForm">
                        <h1>Type your new password below</h1>
                        <input
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                        ></input>
                        <div className="al">{alert}</div>
                        <button
                        onClick={this.handleClick}
                        >Change Password</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ResetLink;