import React from 'react';
import Gender from './gender';
import ListOfLanguages from './listOfLanguages';
import Treatment from './treatment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';


class EditInputSection extends React.Component {
    state = {
        firstname: '', lastname: '', discipline: '',
        gender: '', address: '', minAge: '', maxAge: '',
        age: '', genders: [], ageSet: false, services: [], 
        languages: [], gendersOpen: false, telephone: '', 
        alert: ''
    }
    componentDidMount() {
        const {edit, editItem} = this.props;
        if (editItem) {
            this.setState({
                firstname: editItem.firstname,
                lastname: editItem.lastname,
                discipline: editItem.discipline, 
                gender: editItem.gender, 
                genders: editItem.genders, 
                services: editItem.services, 
                languages: editItem.languages, 
                address: editItem.businessAddress,
                minAge: editItem.minAge, 
                maxAge: editItem.maxAge, 
                age: editItem.age,
                telephone: editItem.telephone
            })
        }
    }
    addProvider = (obj2, cookieId, address) => {
        fetch('https://hannahs-heart-2.herokuapp.com/login/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj2)
        })
        .then(res => res.json())
        .then(data => {
            if (data.Success) {
                let userId = data.Success;
                let obj = {...this.state, userId, author: cookieId[2], businessAddress: address}
                obj.firstname = obj.firstname.toLowerCase()
                obj.lastname = obj.lastname.toLowerCase()
                delete obj.languagesOpen;
                delete obj.servicesOpen;
                delete obj.gendersOpen;
                delete obj.address;
                fetch('https://hannahs-heart-2.herokuapp.com/provider/add-provider', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.Data) {
                        this.setState({
                            alert: 'Provider Added'
                        })
                        this.props.refreshData()
                        //ANIMATION HERE?
                        setTimeout(() => {
                            this.setState({
                                alert: ''
                            })
                        }, 5000)
                    }
                })
            } else {
                if (data.message) {
                    this.setState({
                        alert: data.message
                    })
                }
            }
        })
    }
    handleChange = (e) => {
        let id;
        if (e.target.name === 'gender' | e.target.name === 'othergender' | e.target.name === 'preferredLanguage' | e.target.name === 'treatment') {
            id = e.target.dataset.value;
            const check = this.state[id];
            if (!check.find(x => x === e.target.value) ) {
                this.setState((prev) => ({
                    [id]: prev[id].concat(e.target.value.toLowerCase())
                }))
            } else {
                let newArr = check.filter(x => x !== e.target.value)
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
    handleClick = () => {
        if (this.props.editItem) {
            //CHECK FOR ID
            let obj = {
                ...this.state,
                id: this.props.editItem._id
            };
            obj.firstname = obj.firstname.toLowerCase()
            obj.lastname = obj.lastname.toLowerCase()
            let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'))[0].split('=')[1];
            setTimeout(() => {
                fetch('https://hannahs-heart-2.herokuapp.com/provider/edit-provider', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': cookie
                    },
                    body: JSON.stringify(obj)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.Success) {
                        console.log(data)
                        this.setState({
                            alert: 'User changed.'
                        })
                        this.props.refreshData()
                    }
                })
            }, 1000)
        } else {
            const {gendersOpen, firstname, lastname, telephone, servicesOpen, languagesOpen, minAge, maxAge, age, name, discipline, gender, genders, services, languages, address} = this.state;
                if (firstname.length > 0 && lastname.length > 0 && telephone.length > 0 && minAge && maxAge && discipline.length > 0 && gender.length > 0 && genders.length > 0 && services.length > 0 && languages.length > 0 && address.length > 0) {
                    let cookieId = document.cookie.match(new RegExp('(^| )' + 'id' + '=([^;]+)'));
                    if (cookieId) {
                        let username = firstname + lastname;
                        let object = {username}
                        
                        let newUserName = (object) => {
                                fetch('https://hannahs-heart-2.herokuapp.com/login/user-check', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(object)
                                })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.Failure) {
                                        username = username + "1"
                                        let object = {username}
                                        newUserName(object)
                                    } else if (data.Success) {
                                        let password = "1234";
                                        let obj2 = {username: username, password, admin: true, hcProvider: true}
                                        this.addProvider(obj2, cookieId, address)
                                    }
                                })        
                        }
                        newUserName(object)  
                    } else {
                        this.setState({
                            alert: 'Please ensure you are correctly logged in.'
                        })
                    }
                } else {
                    this.setState({
                        alert: 'Please ensure all fields are filled in correctly.'
                    })
                }
        }
    }
    openList = (e) => {
        this.setState((prev) => ({
            [e.target.id]: !prev[e.target.id]
        }))
    }
    allAges = (e) => {
        this.setState((prev) => ({
            ageSet: !prev.ageSet,
        }))
        setTimeout(() => {
            let {ageSet} = this.state;
            if (ageSet === true) {
                this.setState({
                    minAge: '0',
                    maxAge: '1000'
                })
            } else {
                this.setState({
                    minAge: '',
                    maxAge: ''
                })
            }
        }, 100)
    }
    render() {
        const {edit, editItem, handleAdd, handleEdit} = this.props;
        const {gendersOpen, age, telephone, ageSet, minAge, maxAge, servicesOpen, languagesOpen, firstname, lastname, discipline, gender, genders, services, languages, address} = this.state;
        return (
            <React.Fragment>
            <button
            onClick={(!editItem) ? handleAdd : handleEdit}
            className="closeBtnEdit">X</button>
            <div className="editSection">
                <div className="topRow">
                    { editItem ? 
                        <FontAwesomeIcon style={{fontSize: 80}} icon={faPencilAlt} /> : 
                        <FontAwesomeIcon style={{fontSize: 80}} icon={faPlusCircle} />
                    }
                </div>
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
                    <label>Age</label>
                    <input
                    id="age"
                    onChange={this.handleChange}
                    value={age}
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
                <div style={{height: 70}} className="row">
                    <label>Gender</label>
                    <input
                    id="gender2"
                    onChange={this.handleChange}
                    value={gender}
                    ></input>
                </div>
                <div style={{height: 200}} className="row">
                    <label>Business Address</label>
                    <textarea
                    id="address2"
                    onChange={this.handleChange}
                    value={address}
                    ></textarea>
                </div>
                <div className="row">
                    <label>Telephone Number</label>
                    <InputMask 
                    id="telephone"
                    onChange={this.handleChange}
                    value={telephone}
                    mask='(+44) 999 999 9999'
                    />
                </div>
                <div id="age3" className="row">
                    <label>Age</label>
                    <div className="age3">
                        <div>
                            <label>All</label>
                            <input
                            type="checkbox"
                            checked={ageSet}
                            value={ageSet}
                            onChange={this.allAges}
                            ></input>
                        </div>
                        <div>
                            <label>Minimum Age</label>
                            <input
                            id="minAge"
                            value={minAge}
                            onChange={this.handleChange}
                            ></input>
                        </div>
                        <div>
                            <label>Maximum Age</label>
                            <input
                            id="maxAge"
                            value={maxAge}
                            onChange={this.handleChange}
                            ></input>
                        </div>
                    </div>
                </div>
                <div id="s_1_s" className="row">
                    <label>Gender(s)</label>
                    <button
                    id="gendersOpen"
                    onClick={this.openList}
                    >
                        Select <div>+</div>
                    </button>
                </div>
                {gendersOpen && (
                    <div className="myrow">
                        <div className="openFlex">
                            <Gender 
                            edit={true} 
                            genders={genders}
                            handleChange={this.handleChange} 
                            noGenderWidth={true} />
                        </div>
                    </div>
                )}
                <div id="s_1_s" className="row">
                    <label>Language(s)</label>
                    <button
                    id="languagesOpen"
                    onClick={this.openList}
                    >
                        Select <div>+</div>
                    </button>
                </div>
                {languagesOpen && (
                    <div className="myrow">
                        <div className="openFlex">
                            <ListOfLanguages 
                            languagesPicked={languages}
                            handlePreferredLang={this.handleChange} 
                            noGenderWidth={true} />
                        </div>
                    </div>
                )}
                <div id="s_1_s" className="row">
                    <label>Service(s)</label>
                    <button
                    id="servicesOpen"
                    onClick={this.openList}
                    >
                        Select <div>+</div>
                    </button>
                </div>
                {servicesOpen && (
                    <div className="myrow">
                        <div className="openFlex">
                            <Treatment 
                            treatment={services}
                            handleInputArray={this.handleChange} 
                            sendEdit={this.sendEdit} 
                            noHeader={true} />
                        </div>
                    </div>
                )}
                {this.state.alert && (
                    <div className="justAddedAlert">
                        {this.state.alert}
                    </div>
                )}
                <div style={{marginBottom: 60}} className="row">
                    <button
                    className="submit"
                    onClick={this.handleClick}
                    >Save</button>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default EditInputSection;