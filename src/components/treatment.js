import React from 'react';
import InputElement from './inputElement';

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
        const {editItem, handleInputArray, services, noHeader} = this.props;
        return (
            <React.Fragment>
                <h2 style={noHeader ? {visibility: 'hidden', marginBottom: -50} : null}>What are you seeking support for?</h2>
                    {values.map((x,i) => {
                        let check = (editItem) ? (editItem.services.includes(String(x.value.toLocaleLowerCase()))) ? true : services.includes(String(x.value.toLocaleLowerCase())) : services.includes(String(x.value.toLocaleLowerCase()));
                        return (
                            <React.Fragment key={x+i}>
                                <label key={x+i}>
                                    <InputElement 
                                    selected={check}
                                    value={x.value} i={i}
                                    handleChange={handleInputArray} 
                                    dataVal="services"
                                    id="treatment_a"
                                    />
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