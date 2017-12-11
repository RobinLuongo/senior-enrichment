import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeCurrentStudent, updateStudent, clearStudent } from '../reducers';
import store from '../store'

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange: (evt) => {
      dispatch( writeCurrentStudent(evt.target.name, evt.target.value) )
    },
    handleSubmit: (evt) => {
      evt.preventDefault();
      const id = ownProps.match.params.studentId;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const gpa = evt.target.gpa.value;
      const campusId = evt.target.campusId.value;
      const student = {id, firstName, lastName, email, gpa, campusId};
      dispatch(updateStudent( student ));
      dispatch(clearStudent());
    }
  };
}

// receives state as an argument
const mapStateToProps = function (state) {
  return {
    newStudentEntry: state.newStudentEntry,
    campuses: state.campuses,
    student: state.student
  }
}

function EditStudent (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" style={{display: 'block'}}>Edit Student: {props.student.fullName}</label>
        <input
          value={props.student.firstName}
          onChange={props.handleChange}
          type="text"
          name="firstName"
          placeholder="first name" />
        <input
          value={props.student.lastName}
          onChange={props.handleChange}
          type="text"
          name="lastName"
          placeholder="last name" />
        <input
          value={props.student.email}
          onChange={props.handleChange}
          type="text"
          name="email"
          placeholder="student email" />
        <input
          value={props.student.gpa}
          onChange={props.handleChange}
          type="text"
          name="gpa"
          placeholder="gpa" />
        <label>
        Campus:
          <select
            name="campusId"
            onChange={props.handleChange}
            value={props.student.campusId ? props.student.campusId : 0}>
            <option value="0" disabled>Select Campus</option>
              {
                props.campuses.map(({name, id}) => <option value={id} key={id}>{name}</option>)
              }
          </select>
        </label>
      </div>
      <div className="form-group">
        <button type="submit">Submit</button>
        (All fields will be updated)
      </div>
    </form>
  );
}

const Container = connect(mapStateToProps, mapDispatchToProps)(EditStudent);
export default Container;
