import React from 'react';
import './profile.css';
import { Redirect } from 'react-router';
import Gender from './gender';
import ListOfLanguages from './listOfLanguages';
import Treatment from './treatment';
import Header from './header';

class Profile extends React.Component {
    state = {
        name: '', username: '', password: '', 
        discipline: '', email: '', businessAddress: '', 
        alert: '', redirect: false, admin: '',
        gendersOpen: false, servicesOpen: false,
        languagesOpen: false
    }
    closeProfile = () => {
        this.setState({
            redirect: true
        })
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let cookieName = document.cookie.match(new RegExp('(^| )' + 'name' + '=([^;]+)'));
        let adminCookie = document.cookie.match(new RegExp('(^| )' + 'admin' + '=([^;]+)'));
        let idCookie = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
        if (cookie && adminCookie) {
            if (cookieName) {
                this.setState({
                    adminName: cookieName[2],
                    cookie,
                    admin: adminCookie
                })
            }
        }
        fetch('https://hannahs-heart-2.herokuapp.com/data/get-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idCookie[2]
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                let {username, firstname, lastname, password, discipline, email, businessAddress} = data.Data[0];
                this.setState({
                    type: data.Type,
                    id: idCookie[2], firstname, lastname, username, password, discipline, email, businessAddress
                })
                if (data.Type === 'Provider') {
                    let {genders, languages, services} = data.Data[0];
                    this.setState({
                        genders, languages, services
                    })
                }
            }
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleClick = () => {
        if (this.state.type === 'Employee') {
            let {cookie} = this.state;
            let obj = {...this.state}
            delete obj.cookie;
            delete obj.adminName;
            obj.firstname = obj.firstname.toLowerCase()
            obj.lastname = obj.lastname.toLowerCase()
            obj.username = obj.username.toLowerCase()
            if (cookie) {
            setTimeout(() => {
            fetch('https://hannahs-heart-2.herokuapp.com/login/edit-employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookie[2]
                },
                body: JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(data => {
                if (data.Success) {
                    this.setState({
                        alert: 'Changes successful.'
                    })
                } else {
                    this.setState({
                        alert: 'Changes unsuccessful, please try again.'
                    })
                }
            })
            }, 500)
            } else {
                this.setState({
                    alert: 'Please ensure you are logged in before making any changes.'
                })
            } 
        } else {
            //ADD VALIDATION
            let id = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'))[0].split('=')[1];
            let {cookie} = this.state;
            let obj = {...this.state, id}
            delete obj.cookie;
            delete obj.adminName;
            obj.firstname = obj.firstname.toLowerCase()
            obj.lastname = obj.lastname.toLowerCase()
            if (cookie) {
            setTimeout(() => {
            fetch('https://hannahs-heart-2.herokuapp.com/provider/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookie[2]
                },
                body: JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(data => {
                if (data.Success) {
                    this.setState({
                        alert: 'Changes successful.'
                    })
                } else {
                    this.setState({
                        alert: 'Changes unsuccessful, please try again.'
                    })
                }
            })
            }, 500)
            } else {
                this.setState({
                    alert: 'Please ensure you are logged in before making any changes.'
                })
            } 
        }
    }
    handleSelect = (e) => {
        let id;
        console.log(e.target.name)
        if (e.target.name === 'gender' | e.target.name === 'othergender' | e.target.name === 'preferredLanguage' | e.target.name === 'treatment') {
            id = e.target.dataset.value;
            const check = this.state[id];
            if (!check.find(x => x === e.target.value.toLowerCase()) ) {
                this.setState((prev) => ({
                    [id]: prev[id].concat(e.target.value.toLowerCase())
                }))
            } else {
                let newArr = check.filter(x => x !== e.target.value.toLowerCase())
                this.setState({
                    [id]: newArr
                })
            }      
        } else {
            if (e.target.id === 'gender2') {
                id = 'gender'
            } else if (e.target.id === 'address2') {
                id = 'address'
            } else {
                id = e.target.id;
            }
            this.setState({
                [id]: e.target.value
            })
        }

    }
    openList = (e) => {
        this.setState((prev) => ({
            [e.target.id]: !prev[e.target.id]
        }))
    }
    render() {
        const {redirect, type, genders, services, languagesOpen, servicesOpen, gendersOpen, languages, admin, alert, adminName, firstname, lastname, username, password, discipline, email, businessAddress} = this.state;
        console.log(this.state)
        return (
            <React.Fragment>
                {redirect && admin && (
                    <Redirect to="/admin-landing" />
                )}
                {redirect && !admin && (
                    <Redirect to="/editor-landing" />
                )}
                <div className="myProfile">
                   <Header title={'My Profile'} />

                    <button 
                    onClick={this.closeProfile}
                    className="closeProfile">X</button>
                    <div className="inner">
                    {type === 'Employee' &&
                        <React.Fragment>
                        <div className="row">
                            <label>Username</label>
                            <input
                            id="username"
                            onChange={this.handleChange}
                            value={username}
                            ></input>
                        </div>
                        <div className="row">
                            <label>Password</label>
                            <input
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            value={password}
                            ></input>
                        </div>
                        </React.Fragment>
                        }
                        <div className="row">
                            <label>First Name</label>
                            <input
                            id="firstname"
                            onChange={this.handleChange}
                            value={firstname}
                            ></input>
                        </div>
                        <div className="row">
                            <label>Last Name</label>
                            <input
                            id="lastname"
                            onChange={this.handleChange}
                            value={lastname}
                            ></input>
                        </div>
                        <div className="row">
                            <label>Discipline</label>
                            <input
                            id="discipline"
                            onChange={this.handleChange}
                            value={discipline}
                            ></input>
                        </div>
                        {type === 'Employee' &&
                        <div className="row">
                            <label>Email</label>
                            <input
                            id="email"
                            onChange={this.handleChange}
                            value={email}
                            ></input>
                        </div>
                        }
                        <div className="row">
                            <label>Business Address</label>
                            <input
                            style={{height: 125}}
                            id="businessAddress"
                            onChange={this.handleChange}
                            value={businessAddress}
                            ></input>
                        </div>
                        {type === 'Provider' &&
                        <React.Fragment>
                            <div 
                            style={{marginTop: 100}}
                            className="rowSelect">
                                <label>Genders Served</label>
                                <div className="innerB">
                                <button
                                id="gendersOpen"
                                onClick={this.openList}
                                >
                                    Select <div>+</div>
                                </button>
                                {genders && gendersOpen &&
                                    <div className="genderRow">
                                    <Gender 
                                    edit={true}
                                    handleChange={this.handleSelect}
                                    genders={genders} />
                                    </div>
                                }
                                </div>
                            </div>
                            <div className="rowSelect">
                                <label>Languages</label>
                                <div className="innerB">
                                <button
                                id="languagesOpen"
                                onClick={this.openList}
                                >
                                    Select <div>+</div>
                                </button>
                                {languages && languagesOpen &&
                                    <div className="genderRow">
                                    <ListOfLanguages 
                                    handlePreferredLang={this.handleSelect} 
                                    languagesPicked={languages} />
                                    </div>
                                }
                                </div>
                            </div>
                            <div className="rowSelect">
                                <label>Services</label>
                                <div className="innerB">
                                <button
                                id="servicesOpen"
                                onClick={this.openList}
                                >
                                    Select <div>+</div>
                                </button>
                                {services && servicesOpen &&
                                    <div style={{marginTop: -60}} className="genderRow">
                                    <Treatment
                                    handleInputArray={this.handleSelect} 
                                    treatment={services}
                                    noHeader={true} />
                                    </div>
                                }
                                </div>
                            </div>
                        </React.Fragment>
                        }
                    </div>
                    <div className="profileAlert">
                        {alert}
                    </div>
                    <button
                   
                    className="profileSave"
                    onClick={this.handleClick}
                    >Save</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;