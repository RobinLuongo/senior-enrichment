import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

function Students (props) {
  return (
    <div>
      <h1>Students</h1>
      <ul>
        {
          props.students.map( student => {
            return (
              <li key={student.id}>
              <NavLink to={`/students/${student.id}`}>
                <span>{student.fullName}</span>
              </NavLink>
            </li>
            )
          })
        }
      </ul>
      <NavLink to="students/new-student">
        <button>Create Student</button>
      </NavLink>
    </div>
  )
}

const StudentsContainer = withRouter(connect(mapStateToProps)(Students));

export default StudentsContainer;
