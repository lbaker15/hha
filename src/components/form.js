import React from 'react';
import ListOfLanguages from './listOfLanguages';
import Gender from './gender';
import GeneralInput from './generalInput';
import KmBtns from './kmBtns';
import Treatment from './treatment';
import './form.css';

class Form extends React.Component {
    state = {
        languageHide: true,
        preferredLanguage: [],
        gender: '',
        age: '',
        address: ''
    }
    handleLanguageClick = () => {
        this.setState((prev) => ({
            languageHide: !prev.languageHide
        }))
    }
    handlePreferredLang = (e) => {
        const check = this.state.preferredLanguage;
        if (!check.find(x => x === e.target.value) ) {
            this.setState((prev) => ({
                preferredLanguage: prev.preferredLanguage.concat(e.target.value)
            }))
        } else {
            let newArr = check.filter(x => x !== e.target.value)
            this.setState({
                preferredLanguage: newArr
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
    
    render() {
        const {languageHide, preferredLanguage, address, gender, age} = this.state;
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
                                onChange={this.handlePreferredLang}
                                type="checkbox" name="languages" value="English" id="languages_20"></input>
                                English</label>
                                <br/>
                            <label style={{userSelect: 'none'}}>
                                <input 
                                onChange={this.handlePreferredLang}
                                type="checkbox" name="languages" value="French" id="languages_25"></input>
                                French</label>
                            <div 
                            onClick={this.handleLanguageClick}
                            id="morelang">Select</div>
                                <div id="otherlanguages" className={languageHide ? "hide" : null}>
                                    <ListOfLanguages handlePreferredLang={this.handlePreferredLang} />
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
                            <Treatment handleInput={this.handleInputField} />    
                        </div>
                            
                        <div id="address">
                            <GeneralInput stateValue={address} handleInput={this.handleInputField} type="textfield" value="address" />    
                        </div>
                            
                        <div id="travelradius">
                            <KmBtns handleInput={this.handleInputField} />
                        </div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d356824.9034804846!2d-76.9793230649993!3d45.67703177095065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srenfrew%20county%20mental%20health!5e0!3m2!1sen!2sca!4v1620401817455!5m2!1sen!2sca" width="600" height="450" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default Form;