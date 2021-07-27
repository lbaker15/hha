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
    componentDidMount() {
        const {genders, editItem} = this.props;
        if (editItem) {
            genders.map(x => {
                let map = false;
                Promise.all(gendersList.map(y => {
                    if (x === y.toLocaleLowerCase()) {
                        map = true;
                    }
                })).then(() => {
                    if (map === false) {
                        this.props.setGender(x)
                    }
                })
                
            })
        }
    }
    render() {
        const {handleChange, otherGender, setGender, editItem, gender, genders, noGenderWidth, edit} = this.props;
        // const {otherGender} = this.state;
        return (
            <React.Fragment>
                {gendersList.map((x, i) => {
                    let check = (editItem) ? (editItem.genders.includes(String(x.toLocaleLowerCase()))) ? true : genders.includes(String(x.toLocaleLowerCase())) : genders.includes(String(x.toLocaleLowerCase()));
                    return (
                        <React.Fragment key={x+i}>
                            <label key={x+i}>
                                <InputElement 
                                selected={check}
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
                onChange={(e) => setGender(e.target.value)}
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