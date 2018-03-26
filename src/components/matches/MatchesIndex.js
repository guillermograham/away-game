import React from 'react';
import Axios from 'axios';

class MatchesIndex extends React.Component {
  state = {
    matches: []
  }

  componentWillMount() {

    Axios
      .get('/api/matches')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <h2>MatchesIndex</h2>
      </div>
    );
  }
}

export default MatchesIndex;
