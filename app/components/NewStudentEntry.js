import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeStudent, postStudent, clearStudent } from '../reducers';
import store from '../store'

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange: (evt) => {
      dispatch( writeStudent(evt.target.name, evt.target.value) )
    },
    handleSubmit: (evt) => {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const gpa = evt.target.gpa.value;
      const campusId = evt.target.campusId.value;
      const student = {firstName, lastName, email, gpa, campusId};
      dispatch(postStudent( student ));
      dispatch(clearStudent());
    }
  };
}

// receives state as an argument
const mapStateToProps = function (state) {
  return {
    newStudentEntry: state.newStudentEntry,
    campuses: state.campuses
  }
}

function NewStudentEntry (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Student</label>
        <input
          value={props.newStudentEntry.firstName}
          onChange={props.handleChange}
          type="text"
          name="firstName"
          placeholder="first name" />
        <input
          value={props.newStudentEntry.lastName}
          onChange={props.handleChange}
          type="text"
          name="lastName"
          placeholder="last name" />
        <input
          value={props.newStudentEntry.email}
          onChange={props.handleChange}
          type="text"
          name="email"
          placeholder="student email" />
        <input
          value={props.newStudentEntry.gpa}
          onChange={props.handleChange}
          type="text"
          name="gpa"
          placeholder="gpa" />
        <label>
        Campus:
          <select
            name="campusId"
            onChange={props.handleChange}
            value={props.newStudentEntry.campusId ? props.newStudentEntry.campusId : 0}>
            <option value="0" disabled>Select Campus</option>
              {
                props.campuses.map(({name, id}) => <option value={id} key={id}>{name}</option>)
              }
          </select>
        </label>
      </div>
      <div className="form-group">
        <button type="submit">Create Student</button>
      </div>
    </form>
  );
}

const Container = connect(mapStateToProps, mapDispatchToProps)(NewStudentEntry);
export default Container;
