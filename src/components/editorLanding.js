import React from 'react';
import './adminLanding.css';
import pic from './assets/Editor_Icon_Gold.png';
import {Link, Redirect} from 'react-router-dom';
import Loader from './loader';

class EditorLanding extends React.Component {
    state = {
        adminName: '',
        admin: false, validated: false
    }
    componentDidMount() {
        let cookieName = document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        if (cookie && adminCookie) {
            if (adminCookie[2] === 'false') {
                if (cookieName) {
                    this.setState({
                        adminName: cookieName[2], validated: true
                    })
                }
            } else {
                this.setState({
                    admin: true
                })
            }
        }
    }
    render() {
        const {adminName, admin, validated} = this.state;
        if (!validated) {
            return (
                <React.Fragment>
                    <div>
                        <Loader />
                    </div>
                </React.Fragment>
            )
        } else {
        return (
            <React.Fragment>
                {admin && (
                    <Redirect to="/admin-landing" />
                )}
                <div className="adminLanding">
                    <div className="adminImg">
                        <img src={pic} />
                    </div>
                    <h2>Welcome {adminName}</h2>
                    <div className="box">
                        <button>
                            <Link to="/admin-list">
                                Update HC Providers
                            </Link>
                        </button>
                        <div className="dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <button>
                            <Link to="/my-profile" >
                                My Profile
                            </Link>  
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
        }
    }
}

export default EditorLanding;