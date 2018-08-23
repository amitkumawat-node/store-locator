import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AddStore from './components/AddStore';
import Stores from './components/Stores';
import NotFound from './components/NotFound';


const mapRouter = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={Stores} />
    <Route exact path={match.url+'/add-store'} component={AddStore} />
    <Route exact component={NotFound} />
  </Switch>
);

class App extends Component {
  render() {
    return (
    	<div className="App map-App">
       		<BrowserRouter>
        		<Switch>
                <Route path="/map"  component={mapRouter} />
            </Switch>
        	</BrowserRouter>
    	</div>
    )
  }

}

export default App;