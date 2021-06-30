import React from 'react';
import './profile.css';
import AdminIcon from './assets/Admin_Icon_White.png';

class Profile extends React.Component {
    state = {

    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let cookieName = document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        if (cookie && adminCookie) {
                if (cookieName) {
                    this.setState({
                        adminName: cookieName[2]
                    })
                }
        }
    }
    render() {
        const {adminName} = this.state;
        return (
            <React.Fragment>
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
                    <div className="inner">
                        <div className="row">
                            <label>Username</label>
                            <input></input>
                        </div>
                        <div className="row">
                            <label>Password</label>
                            <input></input>
                        </div>
                        <div className="row">
                            <label>Name</label>
                            <input></input>
                        </div>
                        <div className="row">
                            <label>Discipline</label>
                            <input></input>
                        </div>
                        <div className="row">
                            <label>Email</label>
                            <input></input>
                        </div>
                        <div className="row">
                            <label>Business Address</label>
                            <input></input>
                        </div>
                    </div>
                    <button
                    className="profileSave"
                    >Save</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;