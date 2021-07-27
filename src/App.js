import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Checkin from './components/checkin';
import Form from './components/form';
import Login from './components/login';
import AdminList from './components/adminList';
import EmployeeList from './components/employeeList';
import AdminLanding from './components/adminLanding';
import EditorLanding from './components/editorLanding';
import ResetPassword from './components/resetPassword';
import ResetLink from './components/resetLink';
import Profile from './components/profile';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/wellbeing">
            <Checkin />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin-landing" render={(props) => <AdminLanding {...props} />} />
          <Route path="/editor-landing" render={(props) => <EditorLanding {...props} />} />
          <Route path="/admin-list" render={(props) => <AdminList {...props} />} />
          <Route path="/employee-list" render={(props) => <EmployeeList {...props} />} />
          <Route path="/my-profile" render={(props) => <Profile {...props} />} />
          <Route path="/reset-password" render={(props) => <ResetPassword {...props} />} />
          <Route path="/reset-link/:id" component={ResetLink} />
            {/* <AdminList />
          </Route> */}
        </Switch>
      </Router>
    )
  }
}

export default App;