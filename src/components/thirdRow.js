import React from 'react';

class ThirdRow extends React.Component {
    render() {
        const {employee, gender, discipline} = this.props;
        return (
            <React.Fragment>
                <div style={employee ? {width: '20%'} : null}>
                    {!employee && (
                        <h3 style={{color: 'white'}}>{(gender) === 'female' ? 'F' : 'M' }</h3>
                    )}
                    {employee && (
                        <h3 style={{color: 'white', fontSize: 22, marginTop: 13, fontWeight: 400, opacity: 0.8}}>{discipline}</h3>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default ThirdRow;