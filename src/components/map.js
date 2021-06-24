import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { addMapRedux } from '../actions/map';
import { connect } from 'react-redux';
let key = 'AIzaSyCNxlh-79Og3dQ_tYpV_Vzlkx3kAPyZ6HI';
const loader = new Loader({
  apiKey: key,
  version: "weekly",
});


class Map extends React.Component {
    componentDidMount() {
        loader.load().then(() => {
            let map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 53.9555583, lng: -1.0308132 },
                zoom: 12,
            });
            this.props.dispatch(addMapRedux(map))
        });
    }
    render() {
        const {coords} = this.props;
        return (
            <React.Fragment>
                <div 
                style={{width: 800, height: 400}}
                id="map"></div>
            </React.Fragment>
        )
    }
}

export default connect((state) => ({

}))(Map);