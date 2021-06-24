import React from 'react';

let genders = [
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
        const {handleGender, gender} = this.props;
        const {otherGender} = this.state;
        return (
            <React.Fragment>
                {genders.map((x, i) => {
                    return (
                        <React.Fragment key={x+i}>
                            <label key={x+i}>
                                <input 
                                type="radio" 
                                name="gender" 
                                value={x} 
                                id={`gender_${i}`} 
                                onChange={handleGender}
                                className="gender"></input>
                                {x}
                            </label>
                            <br/>
                        </React.Fragment>
                    )
                })}        
  
                <input 
                type="textfield" 
                name="othergender" 
                value={otherGender}
                onBlur={(e) => {
                    if (gender === 'Other') {
                        handleGender(e, 'gender')
                    }
                }}
                onChange={this.setGender}
                placeholder="Your Gender" 
                id="gender_5" 
                className="genderwidth"></input>      
             
            </React.Fragment>
        )
    }
}

export default Gender;