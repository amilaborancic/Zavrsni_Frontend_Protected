import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from "./HomePage";
import Profile from "./Profile";
import Register from "./Register";
import Cart from "./Cart";
import Shop from "./Shop";
import "./App.css"

class App extends React.Component {

  render() {
    return (
      <div class="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/shop" component={Shop} />
            <Route path="/cart" component={Cart}/>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
