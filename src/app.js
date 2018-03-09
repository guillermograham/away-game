import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Navbar      from './components/utility/Navbar';

import 'bootstrap-css-only';
import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <div className="container">
            
          </div>
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
