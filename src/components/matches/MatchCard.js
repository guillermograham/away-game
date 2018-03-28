import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const MatchCard = ({ match, addMatch, matchExists }) => {
  return(
    <div className="card match-card">
      <div>
        <p>Premier League</p>
      </div>
      <div>
        <Moment format="DD/MM/YYYY HH:mm">{match.date}</Moment>
      </div>
      <div>
        <p>{match.homeTeamName}</p>
      </div>
      <div>
        <p>{match.awayTeamName}</p>
      </div>
      { !matchExists(match._links.self.href) && <div>
        <button
          onClick={() => addMatch(match.homeTeamName, match.awayTeamName, match._links.self.href, match.date)}
        >
          Add match
        </button>
      </div>}
      { matchExists(match._links.self.href) && <div>
        <Link to={`/matches/${match._links.self.href.slice(41, 47)}`}>View match details</Link>
      </div>}
    </div>
  );
};

export default MatchCard;
