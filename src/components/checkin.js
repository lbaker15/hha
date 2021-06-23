import React from 'react';
import Radio from './radio';

class Checkin extends React.Component {
    render() {
        return (
            <div className="checkinContainer">
            <h1>
              How are you feeling today?
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