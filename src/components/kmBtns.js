import React from 'react';

let btnValues = [
    {amount: '0-2 km', value: 2},
    {amount: '2-20 km', value: 20},
    {amount: '>20 km', value: 100}
]

class KmBtns extends React.Component {
    render() {
        const {handleInput} = this.props;
        return (
            <React.Fragment>
                <h2>Travel Radius</h2>
                {btnValues.map((x, i) => {
                    return (
                        <React.Fragment key={x+i}>
                            <label key={x+i}>
                                <input 
                                type="radio" 
                                name="travelradius" 
                                onChange={handleInput}
                                value={x.value} 
                                id={`travelradius_${i}`}
                                ></input>
                                {x.amount}
                            </label>
                        </React.Fragment>
                    )
                })
                }
            </React.Fragment>
        )
    }
}

export default KmBtns;