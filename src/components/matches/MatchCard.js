import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const MatchCard = ({ match, addMatch, matchExists }) => {
  return(
    <div className="card match-card">
      <div className="match-info">
        <p className="competition-name"><i className="fas fa-futbol"></i> Premier League</p>
        <Moment format="MMM Do HH:mm" className="date-time">{match.date}</Moment>
      </div>
      <div className="team-section">
        <p className="team-name">{match.homeTeamName}</p>
        <p className="versus">vs</p>
        <p className="team-name">{match.awayTeamName}</p>
      </div>
      { !matchExists(match._links.self.href) && <div>
        <button
          onClick={() => addMatch(match.homeTeamName, match.awayTeamName, match._links.self.href, match.date)}
          className="match-info-button"
        >
          Bars showing this match
        </button>
      </div>}
      { matchExists(match._links.self.href) && <div>
        <Link
          to={`/matches/${match._links.self.href.slice(41, 47)}`}
          className="match-info-button"
        >
          Bars showing this match
        </Link>
      </div>}
    </div>
  );
};

export default MatchCard;
