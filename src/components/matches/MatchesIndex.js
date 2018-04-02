import React from 'react';
import Axios from 'axios';

import MatchCard from './MatchCard';

class MatchesIndex extends React.Component {
  state = {
    matches: [],
    savedMatches: [],
    newMatch: {
      date: '',
      teams: '',
      matchCode: ''
    }
  }

  matchExists = (externalCode) => {
    const matchCode = externalCode.slice(41, 47);

    return this.state.savedMatches.find(match => match.matchCode === matchCode);
  }

  addMatch = (homeTeam, awayTeam, externalCode, date) => {
    const matchCode = externalCode.slice(41, 47);
    const newMatch = Object.assign({}, this.state.newMatch, { date: new Date(date), teams: [homeTeam, awayTeam], matchCode: matchCode });
    this.setState({ newMatch }, () => {

      Axios
        .post('/api/matches', this.state.newMatch)
        .then(res => {
          this.props.history.push(`/matches/${res.data.matchCode}`);
        })
        .catch(err => console.log(err));
    });
  }

  componentWillMount() {

    Axios
      .get('/api/matches')
      .then(res => this.setState({ matches: res.data.fixtures }, () => {
        console.log(this.state);
      }))
      .catch(err => console.log(err));

    Axios
      .get('/api/savedmatches')
      .then(res => this.setState({ savedMatches: res.data }, () => {
        console.log(this.state);
      }))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="index-info"></div>
        </div>
        <div className="row">
          <div className="index-bar"></div>
        </div>
        {this.state.matches &&
          <div className="match-grid">
            { this.state.matches.map((match, i) => {
              return(
                <div key={i}>
                  { match.status === 'SCHEDULED' &&
                    <MatchCard
                      match={match}
                      addMatch={this.addMatch}
                      matchExists={this.matchExists}
                    />
                  }
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}

export default MatchesIndex;
