import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { addMapRedux } from '../actions/map';
import { connect } from 'react-redux';
let key = 'AIzaSyCNxlh-79Og3dQ_tYpV_Vzlkx3kAPyZ6HI';
const loader = new Loader({
  apiKey: key,
  version: "weekly",
});


let map;
class Map extends React.Component {
    state = {
        map: ''
    }
    componentDidMount() {
        loader.load().then(() => {
            let map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 53.9555583, lng: -1.0308132 },
                zoom: 14,
            });
            this.setState({
                map: map
            })
            this.props.dispatch(addMapRedux(map))
        });
    }
    componentDidUpdate() {
        // let {bounds, center} = this.props;
        // if (bounds) {
        //     this.state.map.fitBounds(bounds)
        // }
        let {travelradius, center} = this.props;
        let num = (travelradius === "100") ? 11 : (travelradius === "20") ? 13 : 15
        if (center.lat && center.lng) {
            const centre = new window.google.maps.LatLng(center.lat, center.lng);
            this.state.map.panTo(centre)
            this.state.map.setZoom(num)
        }
    }
    render() {
        const {coords} = this.props;
        return (
            <React.Fragment>
                <div className="mapContainer">
                    <div 
                    id="map">
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect((state) => ({

}))(Map);