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
import EditorList from './components/editorList';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Checkin />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin-list" render={(props) => <AdminList {...props} />} />
          <Route path="/editor-list" render={(props) => <EditorList {...props} />} />
            {/* <AdminList />
          </Route> */}
        </Switch>
      </Router>
    )
  }
}

export default App;
