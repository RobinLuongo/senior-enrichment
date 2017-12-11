import React, {Component} from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import SectionButton from './SectionButton';

import Students from './Students';
import Campuses from './Campuses';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import Home from './Home';
import NewStudentEntry from './NewStudentEntry';
import NewCampusEntry from './NewCampusEntry';
import EditStudent from './EditStudent';
import EditCampus from './EditCampus';

import store from '../store';
import { fetchStudents, fetchCampuses } from '../reducers'

export default class Main extends Component {

  componentDidMount () {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <div className="nav-container">
          <AppBar
          title='MHIAJ Administration'
          showMenuIconButton={false}
          iconElementRight=
            {
              <div>
                <NavLink to='/students'>
                  <SectionButton label='students' />
                </NavLink>
                <NavLink to='/campuses'>
                  <SectionButton label='campuses' />
                </NavLink>
              </div>
            }
          style={{background: '#206c99'}}
          titleStyle={{margin: 'auto', fontSize: '2em'}}
          />
        </div>
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/students/:studentId/edit' component={EditStudent} />
            <Route path='/students/new-student' component={NewStudentEntry} />
            <Route path='/students/:studentId' component={SingleStudent} />
            <Route path='/campuses/new-campus' component={NewCampusEntry} />
            <Route path='/campuses/:campusId/edit' component={EditCampus} />
            <Route path='/campuses/:campusId' component={SingleCampus} />
            <Route path='/students' component={Students} />
            <Route path='/campuses' component={Campuses} />
          </Switch>
        </main>
      </div>
    </MuiThemeProvider>)
  }


}
