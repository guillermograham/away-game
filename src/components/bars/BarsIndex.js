import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
import GoogleMap from '../utility/GoogleMap';

class BarsIndex extends React.Component {
  state = {
    bars: []
  }

  componentWillMount() {

    Axios
      .get('/api/bars')
      .then(res => this.setState({ bars: res.data }, () => {
        console.log(this.state);
      }))
      .catch(err => console.log(err));

  }

  componentDidMount() {

    var targetOffset, currentPosition,
      body = document.body,
      button = document.getElementById('scrollButton'),
      animateTime = 900;

    function getPageScroll() {
      var yScroll;

      if (window.pageYOffset) {
        yScroll = window.pageYOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) {
        yScroll = document.documentElement.scrollTop;
      } else if (document.body) {
        yScroll = document.body.scrollTop;
      }
      return yScroll;
    }

    button.addEventListener('click', function (event) {

      targetOffset = document.getElementById(event.target.hash.substr(1)).offsetTop;
      currentPosition = getPageScroll();

      body.classList.add('in-transition');
      body.style.WebkitTransform = "translate(0, -" + (targetOffset - currentPosition) + "px)";
      body.style.MozTransform = "translate(0, -" + (targetOffset - currentPosition) + "px)";
      body.style.transform = "translate(0, -" + (targetOffset - currentPosition) + "px)";

      window.setTimeout(function () {
        body.classList.remove('in-transition');
        body.style.cssText = "";
        window.scrollTo(0, targetOffset);
      }, animateTime);

      event.preventDefault();

    }, false);
  }

  render() {
    return (
      <div>
        <div>
          { this.state.bars.length > 0 && <GoogleMap bars={this.state.bars} /> }
          <div className="button-area">
            <a id="scrollButton" href="#target">Click me!</a>
          </div>
        </div>
        <div id="target">
          <h2>Bars</h2>
          <div className="row">
            <div className="page-banner col-md-12">
              { Auth.isAuthenticated() && <Link to="/bars/new" className="main-button">
                Add Bar
              </Link> }
            </div>
            <div className="bars-container">
              {this.state.bars.map(bar => {
                return(
                  <div key={bar._id} className="card">
                    <Link to={`/bars/${bar._id}`}>
                      <div className="card-image">
                        <img src={bar.imageOne} className="img-responsive index" />
                      </div>
                      <div className="media-content">
                        <p className="title is-4">{bar.name}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default BarsIndex;
