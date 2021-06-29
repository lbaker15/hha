import React from 'react';
import Gender from './gender';
import ListOfLanguages from './listOfLanguages';
import Treatment from './treatment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';


class EditInputSection extends React.Component {
    state = {
        name: '',
        discipline: '',
        gender: '',
        address: '',
        minAge: '', 
        maxAge: '',
        age: '',
        genders: [],
        ageSet: false,
        services: [],
        languages: [],
        gendersOpen: false,
        telephone: '',
        alert: ''
    }
    componentDidMount() {
        const {edit, editItem} = this.props;
        if (editItem) {
            this.setState({
                name: editItem.name,
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
            let obj = {
                ...this.state,
                id: this.props.editItem._id
            };
            let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'))[0].split('=')[1];
            setTimeout(() => {
                fetch('https://hannahs-heart-2.herokuapp.com/login/edit', {
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
                        this.forceUpdate()
                        this.props.refreshData()
                    }
                })
            }, 1000)
        } else {
            const {gendersOpen, telephone, servicesOpen, languagesOpen, minAge, maxAge, age, name, discipline, gender, genders, services, languages, address} = this.state;
            let secondName = name.split(" ")[1]
            if (secondName !== undefined) {
                if (name.length > 0 && telephone.length > 0 && minAge && maxAge && discipline.length > 0 && gender.length > 0 && genders.length > 0 && services.length > 0 && languages.length > 0 && address.length > 0) {
                    let obj = {...this.state, businessAddress: address}
                    delete obj.languagesOpen;
                    delete obj.servicesOpen;
                    delete obj.gendersOpen;
                    delete obj.address;
                    console.log(obj)
                    fetch('https://hannahs-heart-2.herokuapp.com/data/add-provider', {
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
                    this.setState({
                        alert: 'Please ensure all fields are filled in correctly.'
                    })
                }
            } else {
                this.setState({
                    alert: 'Please ensure first and last name are seperated by a space.'
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
        const {gendersOpen, telephone, ageSet, minAge, maxAge, servicesOpen, languagesOpen, name, discipline, gender, genders, services, languages, address} = this.state;
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
                    <label>Name</label>
                    <input
                    id="name"
                    onChange={this.handleChange}
                    value={name}
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
                <div className="row">
                    <label>Gender</label>
                    <input
                    id="gender2"
                    onChange={this.handleChange}
                    value={gender}
                    ></input>
                </div>
                <div className="row">
                    <label>Business Address</label>
                    <textarea
                    id="address2"
                    onChange={this.handleChange}
                    value={address}
                    ></textarea>
                </div>
                <div className="row">
                    <label>Telephone Number</label>
                    <input
                    id="telephone"
                    onChange={this.handleChange}
                    value={telephone}
                    ></input>
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
                {!this.props.editItem && this.state.alert && (
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