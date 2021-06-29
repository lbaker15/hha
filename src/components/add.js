import React from 'react';

class Add extends React.Component {
    state = {
        name: '',
        typing: false
    }
    handleInput = (e) => {
        this.setState({
            name: e.target.value,
            typing: true
        })
        setTimeout(() => {
            this.props.searchFilter(this.state.name)
        }, 100)
    }
    render() {
        const {name} = this.state;
        const {handleAdd} = this.props;
        return (
            <React.Fragment>
                <button
                onClick={handleAdd}
                >
                    Add Provider 
                    <div>+</div>
                </button>
                <input
                value={name}
                onChange={this.handleInput}
                placeholder="Search by name"
                ></input>
            </React.Fragment>
        )
    }
}

export default Add;