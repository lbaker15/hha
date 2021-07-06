import React from 'react';
import Radio from './radio';
import heartLogo from './assets/Hannahs-Heart-Logo_with-halo.png';

class Checkin extends React.Component {
    render() {
        return (
            <div className="checkinContainer">
              <img 
              style={{width: 250, marginTop: -150}}
              src={heartLogo} />
              <h1>
                How are you feeling?
              </h1>
              <Radio  />
              <div className="stressedLabels">
                <h2>Not stressed</h2>
                <h2 style={{marginLeft: '30px'}}>Very stressed</h2>
              </div>
          </div>
        )
    }
}

export default Checkin;