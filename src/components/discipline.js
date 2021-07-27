import React from 'react';

let disciplines = [
    'Psychiatrist', 'Psychologist', 'Therapist', 'Social Worker'
]

class Discipline extends React.Component {
    render() {
        const {handleChange, value, editItem} = this.props;
        if (!editItem) {
            return (
                <React.Fragment>
                        <select id="discipline" onChange={handleChange} 
                        defaultValue=""
                        >
                        <option value="" disabled  >Please select...</option>
                        {disciplines.map(x => {
                            return (
                                <option key={x} value={x}>{x}</option>
                            )
                        })}
                    </select>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                        <select id="discipline" onChange={handleChange} 
                        >
                        <option value="" disabled  >Please select...</option>
                        {disciplines.map(x => {
                            return (
                                <option key={x} value={x}>{x}</option>
                            )
                        })}
                    </select>
                </React.Fragment>
            )
        }
    }
}

export default Discipline;