/* global google */

import React from 'react';

class IndividualGoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.center || { lat: 51.51, lng: -0.09 },
      zoom: 18,
      clickableIcons: false,
      disableDefaultUI: true
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: this.props.center || { lat: 51.51, lng: -0.09 },
      animation: google.maps.Animation.DROP
    });
  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div className="show-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default IndividualGoogleMap;
