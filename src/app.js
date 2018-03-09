import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar      from './components/utility/Navbar';
import UserLogin       from './components/auth/UserLogin';
import UserRegister    from './components/auth/UserRegister';

import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar />
          </header>
          <main>
            <div className="container">
              <Switch>
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
