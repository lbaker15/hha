import React from 'react';
import ListOfLanguages from './listOfLanguages';
import Gender from './gender';
import GeneralInput from './generalInput';
import {connect} from 'react-redux';
import KmBtns from './kmBtns';
import Map from './map';
import Treatment from './treatment';
import './form.css';

let markersArr = new Array;
const handleMarkers = (state, props) => {
    const infoWindow = new window.google.maps.InfoWindow();
    state.coords.map(x => {
       let marker = new window.google.maps.Marker({
           position: x,
           map: props.mapSaved,
           title: `
           <h1 style="
           margin-bottom: 0;
           color: black; font-family: poppins;"> ${x.title1} </h1>
           <h2 style="
           margin-bottom: 0;
           margin-top: 0;
           font-weight: 200;
           font-size: 16px;
           color: black; font-family: poppins;"> ${x.title2} </h2>
           <h3 style="
           margin-top: 5px;
           font-weight: 400;
           color: black; font-family: poppins;"> ${x.address} </h3>
           `
       });
       markersArr.push(marker)
       marker.addListener("click", () => {
           infoWindow.close();
           infoWindow.setContent(marker.getTitle());
           infoWindow.open(marker.getMap(), marker);
       })
     })
}
const clearMarkers = () => {
    markersArr.forEach(m => {
        m.setMap(null)
    })
}

class Form extends React.Component {
    state = {
        languageHide: true,
        preferredLanguage: [],
        gender: '',
        age: '',
        address: '',
        coords: [],
        travelradius: '',
        treatment: [],
        alert: ''
    }
    handleLanguageClick = () => {
        this.setState((prev) => ({
            languageHide: !prev.languageHide
        }))
    }
    handleInputArray = (e) => {
        const check = this.state[e.target.name];
        if (!check.find(x => x === e.target.value) ) {
            this.setState((prev) => ({
                [e.target.name]: prev[e.target.name].concat(e.target.value)
            }))
        } else {
            let newArr = check.filter(x => x !== e.target.value)
            this.setState({
                [e.target.name]: newArr
            })
        }
    }
    handleInputField = (e, otherName) => {
        if (!otherName) {
            this.setState({
                [e.target.name]: e.target.value
            })
        } else {
            this.setState({
                'gender': e.target.value
            })
        }
    }
    handleClick = () => {
        const {languageHide, travelradius, preferredLanguage, address, gender, age} = this.state;
        //FORM VALIDATION WOULD GO HERE
        if (address.length > 0 && travelradius.length > 0) {
        let obj = {
            "address": address,
            "distanceLimit": travelradius
        }
        //INIT LOADER, MAKE CLEAR MARKERS ASYNC
        clearMarkers()
        this.setState({
            coords: []
        })
        fetch('https://hannahs-heart-2.herokuapp.com/data/get-providers', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('returned', data)
            Promise.all(
                data.Data.map(x => {
                    console.log('x', x)
                    let {lat, lng, name, discipline, businessAddress} = x;
                    return this.setState((prev) => ({
                        coords: prev.coords.concat({address: businessAddress, title1: name, title2: discipline, lat: Number(lat), lng: Number(lng)})
                    }))
                })
            )
            .then(() => {
                console.log('handle', this.state)
                handleMarkers(this.state, this.props)
            })
        })
        } else {
            //ALERT TO FILL IN TRAVEL RADIUS/ADDRESS
            this.setState({
                alert: 'Please ensure your address and travel radius are filled in.'
            })
            setTimeout(() => {
                this.setState({
                    alert: ''
                })
            }, 5000)
        }
    }
    render() {
        const {languageHide, alert, preferredLanguage, coords, address, gender, age} = this.state;
        console.log(this.state)
        return (
            <React.Fragment>
                <div id="logorow"><img src="images/logo.png" width="320" height="320" alt="Hannah's Heart"/></div>
                    <div id="maincontent" className="white">
                        <div id="maincontentinner" className="padthat">
                        <div className="onepad mediumfont">Please fill in your information below to find a mental health professional in your area.<br/><br/><small>None of this information is stored or tracked by the APP, mental health professionals, or any associated parties.</small></div>
                        <div id="languagepreference">
                            <h2>Preferred Language(s)</h2>
                            <label style={{userSelect: 'none'}}>
                                <input 
                                onChange={this.handleInputArray}
                                type="checkbox" name="preferredLanguage" value="English" id="languages_20"></input>
                                English</label>
                                <br/>
                            <label style={{userSelect: 'none'}}>
                                <input 
                                onChange={this.handleInputArray}
                                type="checkbox" name="preferredLanguage" value="French" id="languages_25"></input>
                                French</label>
                            <div 
                            onClick={this.handleLanguageClick}
                            id="morelang">Select</div>
                                <div id="otherlanguages" className={languageHide ? "hide" : null}>
                                    <ListOfLanguages handlePreferredLang={this.handleInputArray} />
                                </div>
                        </div>
                        
                        <div id="gender">
                            <h2>Your Gender</h2>
                            <Gender gender={gender} handleGender={this.handleInputField} />
                        </div>

                        <div id="dob">
                            <GeneralInput stateValue={age} handleInput={this.handleInputField} type="number" value="age" />
                        </div>

                        <div id="whattreatment">
                            <Treatment handleInputArray={this.handleInputArray} handleInput={this.handleInputField} />    
                        </div>
                            
                        <div id="address">
                            <GeneralInput stateValue={address} handleInput={this.handleInputField} type="textfield" value="address" />    
                        </div>
                            
                        <div id="travelradius">
                            <KmBtns handleInput={this.handleInputField} />
                        </div>

                        <div class="btnFlex">
                            <div class="alertMsg">
                                {alert}
                            </div>
                            <button
                            onClick={this.handleClick}
                            >Submit</button>
                            <div class="loader">

                            </div>
                        </div>

                        <Map coords={coords} />

                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default connect((state) => ({
    mapSaved: state.main
}))(Form);