import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeCampus, updateCampus, clearCampus } from '../reducers';
import store from '../store'

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange: (evt) => {
      dispatch( writeCampus(evt.target.name, evt.target.value) )
    },
    handleSubmit: (evt) => {
      evt.preventDefault();
      const name = evt.target.name.value;
      const description = evt.target.description.value;
      const id = ownProps.match.params.campusId
      const campus = {name, description, id};
      dispatch(updateCampus( campus ));
      dispatch(clearCampus());
    }
  };
}

// receives state as an argument
const mapStateToProps = function (state) {
  return {
    newCampusEntry: state.newCampusEntry,
    campus: state.campus
  }
}

function EditCampus (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Edit Campus: {props.campus.name}</label>
        <div>
          <input
            value={props.campus.name}
            onChange={props.handleChange}
            type="text"
            name="name"
            placeholder="name" />
          <textarea
            style={{display: 'block'}}
            value={props.campus.description}
            onChange={props.handleChange}
            type="text"
            name="description"
            placeholder="description" />
          </div>
      </div>
      <div className="form-group">
        <button type="submit">Submit Changes</button>
      </div>
    </form>
  );
}

const Container = connect(mapStateToProps, mapDispatchToProps)(EditCampus);
export default Container;
