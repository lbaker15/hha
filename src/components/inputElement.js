import React from 'react';

class InputElement extends React.Component {
    state = {
        checked: false
    }
    handleChange2 = (e) => {
        this.setState({ checked: e.target.checked })
        this.props.handleChange(e)
    }
    componentDidMount() {
        const { selected } = this.props;
        if (selected) {
            this.setState({
                checked: selected
            })
        }
    }
    render() {
        const {checked} = this.state;
        const {value, radio, dataVal, id, selected} = this.props;
        // if (gender) {
        return (
            <React.Fragment>
                <input 
                type={!radio ? 'checkbox' : 'radio'}
                name="gender" 
                value={value} 
                id={id} 
                onChange={this.handleChange2}
                data-value={dataVal}
                checked={checked}
                className="gender"
                >
                </input>
                {value}
            </React.Fragment>
        )
        // } else if (lang) {
        //     return (
        //         <React.Fragment>
        //         <input 
        //         onChange={this.handleChange2}
        //         type="checkbox" 
        //         name="preferredLanguage" 
        //         data-value="languages"
        //         checked={checked}
        //         value={value} 
        //         id={"languages_" + this.props.i}>
        //         </input>
        //         {value}
        //         <br />
        //         </React.Fragment>
        //     )
        // } else if (services) {
        //     return (
        //         <React.Fragment>
        //             <input 
        //             type="checkbox"
        //             name="treatment" 
        //             value={value} 
        //             data-value='services'
        //             checked={checked}
        //             onChange={this.handleChange2}
        //             id="treatment_a"></input>
        //             {value}
        //         </React.Fragment>
        //     )
        // }
    }
}

export default InputElement;