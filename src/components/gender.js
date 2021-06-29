import React from 'react';

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
        const {handleChange, gender, genders, noGenderWidth, edit} = this.props;
        const {otherGender} = this.state;
        //console.log(genders)
        return (
            <React.Fragment>
                {gendersList.map((x, i) => {
                    let checker = genders.find(item => item === x.toLowerCase())
                    console.log(checker, x, genders)
                    return (
                        <React.Fragment key={x+i}>
                            <label key={x+i}>
                                <input 
                                type={edit ? 'checkbox' : 'radio'}
                                name="gender" 
                                value={x.toLowerCase()} 
                                id={`gender_${i}`} 
                                onChange={handleChange}
                                data-value="genders"
                                checked={edit && checker ? true : false}
                                className="gender">
                                </input>
                                {x}
                            </label>
                     
                        </React.Fragment>
                    )
                })}        
  
                <input 
                type="textfield" 
                name="othergender" 
                value={otherGender}
                data-value="gender"
                onBlur={(e) => {
                    if (gender === 'Other') {
                        handleChange(e, 'gender')
                    }
                }}
                onChange={this.setGender}
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