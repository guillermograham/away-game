/* global google */

import React from 'react';
import { withRouter } from 'react-router-dom';

// import mapStyles from '../config/mapStyles';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.center || { lat: 41.390205, lng: 2.154007 },
      zoom: 15,
      clickableIcons: false,
      disableDefaultUI: true
      // styles: mapStyles
    });

    console.log('before map: ', this.props.bars);

    if(this.props.bars){
      this.props.bars.forEach((bar) => {
        console.log('bar :', bar);
        // console.log('in here', bar.address);
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
        // styles: mapStyles
      });

      this.marker = new google.maps.Marker({
        map: this.map,
        position: this.props.center || { lat: 51.51, lng: -0.09 },
        animation: google.maps.Animation.DROP
      });
    }


    // this.markers = this.props.markers.map(bar => {
    //
    //   console.log('markers: ', bar);
    //
    //   this.markers.bar = new google.maps.Marker({
    //     map: this.map,
    //     position: bar.location,
    //     animation: google.maps.Animation.DROP
    //   });
    //
    //   this.markers.bar.infowindow = new google.maps.InfoWindow({
    //     content: bar.name
    //   });
    //
    //   this.markers.bar.addListener('click', function() {
    //     this.markers.bar.infowindow.open(this.map, this.markers.bar);
    //   });
    //
    // });



  }

  componentWillUnmount() {
    // this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default withRouter(GoogleMap);
