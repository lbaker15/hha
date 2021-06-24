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
        const {handleInputArray} = this.props;
        return (
            <React.Fragment>
                <h2>What are you seeking support for?</h2>
                    {values.map((x,i) => {
                        return (
                            <React.Fragment key={x+i}>
                                <label key={x+i}>
                                    <input 
                                    type="checkbox"
                                    name="treatment" 
                                    value={x.value} 
                                    onChange={handleInputArray}
                                    id="treatment_a"></input>
                                    {x.value}
                                </label>
                                <br/>
                            </React.Fragment>
                        )
                    })
                    }
  
                        
            </React.Fragment>
        )
    }
}

export default Treatment;