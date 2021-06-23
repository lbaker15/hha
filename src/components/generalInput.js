import React from 'react';

class GeneralInput extends React.Component {
    render() {
        const {type, value, handleInput, stateValue} = this.props;
        let capitalized = String(value)[0].toUpperCase() + value.slice(1)
        return (
            <React.Fragment>
                <h2>{capitalized}</h2>
                <input 
                onChange={handleInput}
                value={stateValue}
                type={type} 
                name={value} 
                id={value}></input>
            </React.Fragment>
        )
    }
}

export default GeneralInput;