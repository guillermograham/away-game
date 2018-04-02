/* global google */

import React from 'react';
import { withRouter } from 'react-router-dom';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.center || { lat: 41.382205, lng: 2.172007 },
      zoom: 14,
      clickableIcons: false,
      disableDefaultUI: true
    });

    console.log('before map: ', this.props.bars);

    if(this.props.bars){
      this.props.bars.forEach((bar) => {
        console.log('bar :', bar);

        const marker = new google.maps.Marker({
          map: this.map,
          position: bar.location,
          animation: google.maps.Animation.DROP
        });
        var infowindow =  new google.maps.InfoWindow({
          content: bar.name
        });
        marker.addListener('mouseover', function() {
          infowindow.open(this.map, this);
        });
        marker.addListener('mouseout', function() {
          infowindow.close();
        });


        marker.id = bar._id;

        google.maps.event.addListener(marker, 'click', () => {
          this.props.history.push(`/bars/${marker.id}`);
        });
      });
    }

    if(this.props.center) {
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
  }

  componentWillUnmount() {
    // this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map index-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default withRouter(GoogleMap);
