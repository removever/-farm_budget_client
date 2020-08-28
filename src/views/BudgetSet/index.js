import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const BudgetSetView = React.lazy(() => import('./view'));
const BudgetSetInsert = React.lazy(() => import('./insert'));
const BudgetUpdate = React.lazy(() => import('./update'));

class UserMain extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/budget-set" name="Login Page" render={props => <BudgetSetView {...props} />} />
            <Route exact path="/budget-set/insert" name="Login Page" render={props => <BudgetSetInsert {...props} />} />
            <Route exact path="/budget-set/update/:budget_code" name="Login Page" render={props => <BudgetUpdate {...props} />} />
            {/* <Route exact path="/User/update/:User_code" name="Login Page" render={props => <UserUpdate {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (UserMain);
