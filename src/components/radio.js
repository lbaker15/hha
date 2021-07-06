import React from 'react';
import Alert from './alert';
import {Redirect} from 'react-router-dom';

class Radio extends React.Component {
    state = {
        selected: null,
        redirect: false
    }
    onChangeValue = (e) => {
        this.setState({
            selected: e.target.value
        })
        if (e.target.value !== "8" && e.target.value !== "9" && e.target.value !== "10") {
            setTimeout(() => {
                this.setState({
                    redirect: true
                })
            }, 1000)
        }
    }
    closeOverlay = () => {
        this.setState({
            selected: null
        })
    }
    render() {
        const {selected, redirect} = this.state;
        return (
            <React.Fragment>
                {redirect && (
                    <Redirect to="/form" />
                )}
                {selected === "10" | selected === "9" | selected === "8" ? (
                    <Alert closeOverlay={this.closeOverlay} />
                ) : null}
                <div className="radioBtns">
                <div className="theLine"></div>
                <div className="rBtn">
                <input
                value="1"
                checked={selected === "1"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>1</span>
                </div>
                <div className="rBtn">
                <input 
                value="2"
                checked={selected === "2"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>2</span>
                </div>
                <div className="rBtn">
                <input 
                value="3"
                checked={selected === "3"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>3</span>
                </div>
                <div className="rBtn">
                <input 
                value="4"
                checked={selected === "4"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>4</span>
                </div>
                <div className="rBtn">
                <input 
                value="5"
                checked={selected === "5"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>5</span>
                </div>
                <div className="rBtn">
                <input 
                value="6"
                checked={selected === "6"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>6</span>
                </div>
                <div className="rBtn">
                <input 
                value="7"
                checked={selected === "7"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>7</span>
                </div>
                <div className="rBtn">
                <input 
                value="8"
                checked={selected === "8"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>8</span>
                </div>
                <div className="rBtn">
                <input 
                value="9"
                checked={selected === "9"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>9</span>
                </div>
                <div className="rBtn">
                <input 
                value="10"
                checked={selected === "10"}
                onChange={this.onChangeValue}
                type="radio" />
                <span>10</span>
                </div>
            </div>
          </React.Fragment>
        )
    }
}

export default Radio;