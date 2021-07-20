import React from 'react';
import InputElement from './inputElement';

let gendersList = [
    'Male', 'Female', 'Trans Female',
    'Trans Male', 'Non Binary', 'Other'
]

class Gender extends React.Component {
    state = {
        otherGender: '', 
    }
    setGender = (e) => {
        this.setState({
            otherGender: e.target.value
        })
    }
    render() {
        const {handleChange, otherGender, setGender, gender, genders, noGenderWidth, edit} = this.props;
        // const {otherGender} = this.state;
        return (
            <React.Fragment>
                {gendersList.map((x, i) => {
                    return (
                        <React.Fragment key={x+i}>
                            <label key={x+i}>
                                <InputElement 
                                handleChange={handleChange} 
                                edit={edit} 
                                value={x} 
                                i={i} 
                                dataVal="genders"
                                id={'gender_' + i}
                                />
                            </label>
                        </React.Fragment>
                    )
                })}        
  
                <input 
                type="textfield" 
                name="othergender" 
                value={otherGender}
                data-value="genders"
                onBlur={(e) => {
                    handleChange(e)
                }}
                onChange={setGender}
                placeholder="Your Gender" 
                
                id={!noGenderWidth ? "gender_5" : null}
                className={!noGenderWidth ? "genderwidth" : null}
                style={noGenderWidth ? {marginBottom: '30px'} : null}
                
                ></input>      
             
            </React.Fragment>
        )
    }
}

export default Gender;