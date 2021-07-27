import React from 'react';
import ListHeader from './listHeader';


let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
class Alphabet extends React.Component {
    render() {
        const {filterResults, letter, closeFilter} = this.props;
        return (
            <React.Fragment>
                <div className="alphabet">
                        <div className="aInner">
                            {alphabet.map(l => {
                                return (
                                    <button 
                                    style={letter === l ? {color: '#727273'} : null}
                                    value={l}
                                    onClick={filterResults}
                                    key={l}>{l.toUpperCase()}</button>
                                    )
                                })
                            }
                        </div>
                        <button 
                        onClick={closeFilter}
                        className="aRight">X</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Alphabet;