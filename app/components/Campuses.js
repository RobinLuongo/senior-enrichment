import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { clearCampus } from '../reducers';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

class Campuses extends Component {
  componentDidMount () {
    store.dispatch(clearCampus())
  }

  render () {
      return (
      <ul>
        {
          this.props.campuses.map( campus => {
            return (
              <li key={campus.id}>
              <NavLink to={`/campuses/${campus.id}`}>
                <span>{campus.name}</span>
              </NavLink>
            </li>
            )
          })
        }
        <NavLink to="campuses/new-campus">
          <button>New Campus</button>
        </NavLink>
      </ul>
    )
  }
}

const CampusesContainer = withRouter(connect(mapStateToProps)(Campuses));

export default CampusesContainer;
