/* global google */

import React from 'react';
// import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: { lat: 41.390205, lng: 2.154007 },
      zoom: 15,
      clickableIcons: false,
      disableDefaultUI: true
      // styles: mapStyles
    });

    console.log('before map: ', this.props.markers);

    this.markers = this.props.markers.map(bar => {

      console.log('markers: ', bar);

      new google.maps.Marker({
        map: this.map,
        position: bar.location,
        animation: google.maps.Animation.DROP
      });

    });

  }

  componentWillUnmount() {
    this.markers.setMap(null);
    this.markers = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default GoogleMap;
