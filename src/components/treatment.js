import React from 'react';

let values = [
    {value: 'Not sure'},
    {value: 'Anxiety disorders'},
    {value: 'Behavioural and emotional disorders'},
    {value: 'Bipolar affective disorder'},
    {value: 'Depression'},
    {value: 'Dissociation and dissociative disorders'},
    {value: 'Eating disorders'},
    {value: 'Obsessive compulsive disorder'},
    {value: 'Paranoia'},
    {value: 'Post-traumatic stress disorder'},
    {value: 'Psychosis'},
    {value: 'Schizophrenia'},
    {value: 'Other'}
]

class Treatment extends React.Component {
    render() {
        const {handleInputArray, treatment, noHeader} = this.props;
        return (
            <React.Fragment>
                <h2 style={noHeader ? {visibility: 'hidden', marginBottom: -50} : null}>What are you seeking support for?</h2>
                    {values.map((x,i) => {
                        let checker = treatment.find(item => item === x.value.toLowerCase())
                        return (
                            <React.Fragment key={x+i}>
                                <label key={x+i}>
                                    <input 
                                    type="checkbox"
                                    name="treatment" 
                                    value={x.value} 
                                    data-value='services'
                                    checked={checker}
                                    onChange={handleInputArray}
                                    id="treatment_a"></input>
                                    {x.value}
                                </label>
                            </React.Fragment>
                        )
                    })
                    }                       
            </React.Fragment>
        )
    }
}

export default Treatment;