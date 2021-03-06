import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar           from './components/utility/NavBar';
import UserLogin        from './components/auth/UserLogin';
import UserRegister     from './components/auth/UserRegister';
import BarLogin         from './components/auth/BarLogin';
import BarRegister      from './components/auth/BarRegister';
import BarsIndex        from './components/bars/BarsIndex';
import BarsShow         from './components/bars/BarsShow';
import MatchesIndex     from './components/matches/MatchesIndex';
import MatchesShow      from './components/matches/MatchesShow';
import LandingPage      from './components/static/LandingPage';

import './scss/style.scss';

class App extends React.Component {

  state = {
    showBurger: false
  }

  toggleBurger = () => {
    return this.setState({ showBurger: !this.state.showBurger });
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar
              toggleBurger={this.toggleBurger}
              showBurger={this.state.showBurger}
            />
          </header>
          <main>
            <div>
              <Switch>
                <Route exact path="/bars" component={BarsIndex} />
                <Route path="/bars/:id" component={BarsShow} />
                <Route path="/barregister" component={BarRegister} />
                <Route path="/barlogin" component={BarLogin} />
                <Route exact path="/matches" component={MatchesIndex} />
                <Route path="/matches/:matchCode" component={MatchesShow} />
                <Route path="/login" component={UserLogin} />
                <Route path="/register" component={UserRegister} />
                <Route exact path="/" component={LandingPage} />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
