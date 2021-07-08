import React from 'react';
import AdminIcon from './assets/Admin_Icon_White.png';
import './header.css';

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
                        <img src={AdminIcon} />
                        <h3>{adminName}</h3>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Header;