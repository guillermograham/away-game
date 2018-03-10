import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar      from './components/utility/Navbar';
import UserLogin       from './components/auth/UserLogin';
import UserRegister    from './components/auth/UserRegister';
import BarsIndex from './components/bars/BarsIndex';
import BarsShow from './components/bars/BarsShow';

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
            <div className="container">
              <Switch>
                <Route exact path="/bars" component={BarsIndex} />
                <Route path="/bars/:id" component={BarsShow} />
                <Route path="/login" component={UserLogin} />
                <Route path="/register" component={UserRegister} />
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
