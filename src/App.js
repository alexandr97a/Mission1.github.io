import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Main from "./component/Main.jsx"
import Add_table from "./component/Add_table.jsx"




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      table : [],
    }
  };

  
  render() {
      return(
        <>
          <Router>
            <Route path='/' exact={true} component={Main} />
              <Switch>
                <Route path="/add_table" component={Add_table} />
              </Switch>
          </Router>
        </>
      )
  };
};


export default App;