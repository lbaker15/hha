import React from 'react';
import ListOfLanguages from './listOfLanguages';
import Gender from './gender';
import GeneralInput from './generalInput';
import {connect} from 'react-redux';
import KmBtns from './kmBtns';
import Map from './map';
import { Link } from 'react-router-dom';
import Treatment from './treatment';
import './form.css';
import gsap from 'gsap';
import Loader from './loader';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

let markersArr = new Array;
const handleMarkers = (state, props) => {
    const infoWindow = new window.google.maps.InfoWindow();
    state.coords.map(async x => {
       let aComma = x.address.split(',');
       let wordArrFunc = (wordArr, str) => {
            return wordArr.map((y, i) => {
                let val = (y[0]) ? y[0].toUpperCase() + y.slice(1) + " " : y
                str = str.concat(val)
                if (i === wordArr.length-1) {
                    return ` <h3> ${str} </h3> `
                }
            })
       }
       let value = await Promise.all(aComma.map(async x => {
            let wordArr = x.split(" "); let str = new String;
            let data = await wordArrFunc(wordArr, str)
            return data[wordArr.length-1]
       }))
       console.log(value)
       let marker = new window.google.maps.Marker({
           position: x,
           map: props.mapSaved,
           title: `
           <div id="infocontent">
                <h1> ${x.title1} <span> (${x.title2}) </span> </h1>
                <h2> ${x.minAge} years and over </h2>
                <div>${value.join('')}</div>
                <h4> ${x.telephone} </h4>
           </div>
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
// const fitMarkers = async (state, props) => {
//     let bounds = new window.google.maps.LatLngBounds();
//     await markersArr.map(x => {   
//         bounds.extend(x.getPosition())
//     })
//     return bounds
// }
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
        center: '',
        treatment: [],
        alert: '',
        refOne: React.createRef(),
        loading: false
    }
    componentDidMount() {
        gsap.fromTo('.mapContainer', {display: 'none', opacity: 0}, {display: 'block', opacity: 1, duration: 0.5, visibility: 'visible', 
            scrollTrigger: {
                trigger: '#address',
                start: 'top 10%',
                toggleActions: 'restart none none reverse'
            }
        })
        gsap.fromTo('.mapContainer', {zIndex: -1}, {zIndex: 1, duration: 0.5, visibility: 'visible', 
            scrollTrigger: {
                trigger: '.btnFlex',
                start: 'top 25%',
                toggleActions: 'restart none none reverse'
            }
        })
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
            this.setState({
                loading: true
            })
            //FIRST CALL
            let centerObj = {
                address
            }
            fetch('https://hannahs-heart-2.herokuapp.com/data/get-center', {
                method: 'POST',
                body: JSON.stringify(centerObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    center: data['Client address']
                })
            })
            //SECOND CALL
            let obj = {
                "address": address,
                "distanceLimit": travelradius
            }
            clearMarkers()
            this.setState({
                coords: []
            })
            fetch('https://hannahs-heart-2.herokuapp.com/provider/get-providers', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.Data.length)
                if (data.Data.length === 0) {
                    this.setState({
                        alert: 'No providers found, please try another location or widen your travel radius.'
                    })
                } else {
                    this.setState({
                        alert: ''
                    })
                }
                
                Promise.all(
                    data.Data.map(x => {
                        let {lat, lng, firstname, lastname, discipline, businessAddress, telephone, minAge} = x;
                        let minimum = (minAge) ? minAge : 0;
                        return this.setState((prev) => ({
                            coords: prev.coords.concat({minAge: minimum, telephone: telephone, address: businessAddress, title1: String(firstname)[0].toUpperCase() + String(firstname).slice(1) + " " + String(lastname)[0].toUpperCase() + String(lastname).slice(1), title2: discipline, lat: Number(lat), lng: Number(lng)})
                        }))
                    })
                )
                .then(async () => {
                    this.setState({
                        loading: false
                    })
                    handleMarkers(this.state, this.props)
                })
            })
        } else {
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
        const {languageHide, bounds, loading, alert, center, travelradius, preferredLanguage, coords, address, gender, age} = this.state;
        return (
            <React.Fragment>
                <div id="logorow">
                    <div className="left">
                        <h2>Find A Professional</h2>
                    </div>
                    <div className="right">
                        <Link to="/login">
                            Member Login
                        </Link>
                    </div>
                </div>
    
                <div id="maincontent" className="white">
                    <div id="maincontentinner" className="padthat">
                    <div className="onepad mediumfont"><h2>Please fill in your information below to find a mental health professional in your area.</h2><h3>None of this information is stored or tracked by the APP, mental health professionals, or any associated parties.</h3></div>
                    <div id="languagepreference">
                        <h2>Preferred Language(s)</h2>
                        <label style={{userSelect: 'none'}}>
                            <input 
                            onChange={this.handleInputArray}
                            type="checkbox" 
                            name="preferredLanguage" 
                            value="English" 
                            id="languages_20"></input>
                            English</label>
                            <br/>
                        <label style={{userSelect: 'none'}}>
                            <input 
                            onChange={this.handleInputArray}
                            type="checkbox" 
                            name="preferredLanguage" 
                            value="French" 
                            id="languages_25"></input>
                            French</label>
                        <div 
                        onClick={this.handleLanguageClick}
                        id="morelang">Select</div>
                            <div id="otherlanguages" className={languageHide ? "hide" : null}>
                                <ListOfLanguages 
                                languagesPicked={[]}
                                handlePreferredLang={this.handleInputArray} />
                            </div>
                        </div>
                        
                        <div id="gender">
                            <h2>Your Gender</h2>
                            <div className="flexCol">
                                <Gender 
                                genders={[]}
                                gender={gender} handleGender={this.handleInputField} />
                            </div>
                        </div>

                        <div id="dob">
                            <GeneralInput stateValue={age} handleInput={this.handleInputField} type="number" value="age" />
                        </div>

                        <div id="whattreatment">
                            <div className="flexCol">
                                <Treatment treatment={[]} handleInputArray={this.handleInputArray} handleInput={this.handleInputField} />    
                            </div>
                        </div>
                            
                        <div ref={this.state.refOne} id="address">
                            <GeneralInput stateValue={address} handleInput={this.handleInputField} type="textfield" value="address" />    
                        </div>
                            
                        <div id="travelradius">
                            <KmBtns handleInput={this.handleInputField} />
                        </div>

                        <div className="alertMsg">
                            {alert}
                        </div>
                        <div className="btnFlex">
                            <button
                            onClick={this.handleClick}
                            >Submit</button>
                        </div>
                        {loading && (
                        <Loader loading={loading} />
                        )}
                        <Map bounds={bounds} center={center} travelradius={travelradius} coords={coords} />

                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default connect((state) => ({
    mapSaved: state.main
}))(Form);