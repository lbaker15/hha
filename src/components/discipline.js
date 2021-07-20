import React from 'react';

let disciplines = [
    'Psychiatrist', 'Psychologist', 'Therapist', 'Social Worker'
]

class Discipline extends React.Component {
    render() {
        const {handleChange, value} = this.props;
        return (
            <React.Fragment>
                <select id="discipline" onChange={handleChange}
                >
                    {disciplines.map(x => {
                        let selected = false;
                        if (x === value) { selected = true; }
                        return (
                            <option selected={selected} key={x} value={x}>{x}</option>
                        )
                    })}
                </select>
            </React.Fragment>
        )
    }
}

export default Discipline;