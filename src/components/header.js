import React from 'react';
import AdminIcon from './assets/Admin_Icon_White.png';
import './header.css';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    state = {
        adminName: ''
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let cookieName = document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        if (cookie && adminCookie) {
            if (cookieName) {
                this.setState({
                    adminName: cookieName[2],
                    cookie,
                    admin: adminCookie
                })
            }
        }
        }
    render() {
        const {adminName} = this.state;
        const {title} = this.props;
        return (
            <React.Fragment>
                <div className="topSection2">
                    <div className="left">
                        <h2>{title}</h2>
                    </div>
                    <div className="right">
                        <Link to="/my-profile">
                            <img src={AdminIcon} />
                            <h3>{adminName}</h3>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Header;