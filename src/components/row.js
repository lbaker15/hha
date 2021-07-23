import React from 'react';

class Row extends React.Component {
    render() {
        const {label, id, value, onChange, type} = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <label>{label}</label>
                    <input
                    type={type}
                    id={id}
                    onChange={onChange}
                    value={value}
                    ></input>
                </div>
            </React.Fragment>
        )
    }
}

export default Row;