import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { fetchStudent, clearStudent, writeStudent, deleteStudent } from '../reducers';
import { NavLink } from 'react-router-dom'

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    delete: () => {
      dispatch(deleteStudent(ownProps.match.params.studentId));
      ownProps.history.push('/students')
    }
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
    campuses: state.campuses
  }
}

class SingleStudent extends React.Component {
  constructor() {
    super()
    this.state = {
      campus: {}
    }
  }

  componentDidMount () {
    const studentThunk = fetchStudent(Number(this.props.match.params.studentId));
    store.dispatch(studentThunk);
    store.dispatch(clearStudent());
  }

  render () {
    const student = this.props.student
    const tempCampus = this.props.campuses.find((campus) => {
      return campus.id === student.campusId
    })
    const studentCampus = tempCampus ? tempCampus : {};

    return (
      <div>
        <h1>Student</h1>
        <h2>{student.fullName}</h2>
        <ul>
          <li>EMAIL: {student.email}</li>
          <li>GPA: {student.gpa}</li>
          <li>CAMPUS:
            <NavLink to={`/campuses/${studentCampus.id}`}>
              <span>{studentCampus.name}</span>
            </NavLink>
          </li>
        </ul>
        <NavLink to={`/students/${student.id}/edit`}>
          <button>Edit</button>
        </NavLink>
        <button onClick={this.props.delete}>Delete</button>
      </div>
    )
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;
