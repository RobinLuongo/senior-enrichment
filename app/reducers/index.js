/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux';
import axios from 'axios';

const initialState = {
  students: [],
  campuses: [],
  student: {},
  campus: {},
  newStudentEntry: {},
  newCampusEntry: {},
}

//actions
const ACQUIRE_STUDENTS = 'ACQUIRE_STUDENTS'
const ACQUIRE_CAMPUSES = 'ACQUIRE_CAMPUSES'
const ACQUIRE_SINGLE_STUDENT = 'ACQUIRE_SINGLE_STUDENT'
const ACQUIRE_SINGLE_CAMPUS = 'ACQUIRE_SINGLE_CAMPUS'
const WRITE_STUDENT = 'WRITE_STUDENT'
const WRITE_CURRENT_STUDENT = 'WRITE_CURRENT_STUDENT'
const GET_STUDENT = 'GET_STUDENT'
const WRITE_CAMPUS = 'WRITE_CAMPUS'
const GET_CAMPUS = 'GET_CAMPUS'
const CLEAR_STUDENT = 'CLEAR_STUDENT'
const EDIT_STUDENT = 'EDIT_STUDENT'
const REMOVE_STUDENT = 'REMOVE_STUDENT'
const EDIT_CAMPUS = 'EDIT_CAMPUS'
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'
const CLEAR_CAMPUS = 'CLEAR_CAMPUS'

//action creators
export function acquireStudents(students) {
  return {
    type: ACQUIRE_STUDENTS,
    students
  }
}

export function acquireSingleStudent(student) {
  return {
    type: ACQUIRE_SINGLE_STUDENT,
    student
  }
}

export function acquireCampuses(campuses) {
  return {
    type: ACQUIRE_CAMPUSES,
    campuses
  }
}

export function acquireSingleCampus(campus) {
  return {
    type: ACQUIRE_SINGLE_CAMPUS,
    campus
  }
}

export function writeStudent(newProp, newVal) {
  let action = {type: WRITE_STUDENT};
  const tempObj = {};
  tempObj[newProp] = newVal
  action['update'] = tempObj
  return action
}

export function writeCurrentStudent(newProp, newVal) {
  let action = {type: WRITE_CURRENT_STUDENT};
  const tempObj = {};
  tempObj[newProp] = newVal
  action['update'] = tempObj
  return action
}

export function getStudent(student) {
  return {
    type: GET_STUDENT,
    student
  }
}

export function writeCampus(newProp, newVal) {
  let action = {type: WRITE_CAMPUS};
  const tempObj = {};
  tempObj[newProp] = newVal
  action['update'] = tempObj
  return action
}

export function getCampus(campus) {
  return {
    type: GET_CAMPUS,
    campus
  }
}

export function clearStudent() {
  return {
    type: CLEAR_STUDENT
  }
}

export function clearCampus() {
  return {
    type: CLEAR_CAMPUS
  }
}

export function editStudent(student) {
  return {
    type: EDIT_STUDENT,
    student
  }
}

export function editCampus(campus) {
  return {
    type: EDIT_CAMPUS,
    campus
  }
}

export function removeStudent(studentId) {
  return {
    type: REMOVE_STUDENT,
    studentId
  }
}

export function removeCampus(campusId) {
  return {
    type: REMOVE_CAMPUS,
    campusId
  }
}


//thunk creators
//
export function fetchStudents() {
  return function thunk(dispatch)
  {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(acquireStudents(students))
      })
  }
}

export function fetchStudent(studentId) {
  return function thunk(dispatch) {
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        dispatch(acquireSingleStudent(student))
      })
  }
}

export function fetchCampuses() {
  return function thunk(dispatch)
  {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(acquireCampuses(campuses))
      })
  }
}

export function fetchCampus(campusId) {
  return function thunk(dispatch) {
    return axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        dispatch(acquireSingleCampus(campus))
      })
  }
}

export function postStudent(student) {
  return function thunk(dispatch) {
    return axios.post('/api/students/new-student', student)
      .then(res => res.data)
      .then(student => {
        dispatch(getStudent(student))
      })
    }
}

export function postCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses/new-campus', campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(getCampus(campus))
      })
    }
}

export function updateStudent(student) {
  return function thunk(dispatch) {
    return axios.put('/api/students/edit', student)
      .then(res => res.data)
      .then(student => {
        dispatch(editStudent(student))
      })
  }
}

export function deleteStudent(studentId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(dispatch(removeStudent(studentId)))
  }
}

export function updateCampus(campus) {
  return function thunk(dispatch) {
    return axios.put('/api/campuses/edit', campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(editCampus(campus))
      })
  }
}

export function deleteCampus(campusId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(dispatch(removeCampus(campusId)))
  }
}

//REDUCER
const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case ACQUIRE_STUDENTS:
      return {
        ...state,
        students: action.students
      }
    case ACQUIRE_CAMPUSES:
      return {
        ...state,
        campuses: action.campuses
      }
    case ACQUIRE_SINGLE_STUDENT:
      return {
        ...state,
        student: action.student
      }
    case ACQUIRE_SINGLE_CAMPUS:
      return {
        ...state,
        campus: action.campus
      }
    case WRITE_STUDENT: {
      return Object.assign({}, state, {newStudentEntry: Object.assign({}, state.newStudentEntry, action.update)});
    }
    case WRITE_CURRENT_STUDENT: {
      return Object.assign({}, state, {student: Object.assign({}, state.student, action.update)});
    }
    case GET_STUDENT: {
      return {
        ...state,
        students: [...state.students, action.student]
      }
    }
    case WRITE_CAMPUS: {
      return Object.assign({}, state, {campus: Object.assign({}, state.campus, action.update)});
    }
    case GET_CAMPUS: {
      return {
        ...state,
        campuses: [...state.campuses, action.campus]
      }
    }
    case EDIT_STUDENT: {
      const idx = state.students.findIndex(student => student.id == action.student.id);
      let newStudents = [...state.students];
      newStudents[idx] = action.student;
      return {
        ...state,
        student: action.student,
        students: newStudents
      }
    }
    case REMOVE_STUDENT: {
      const idx = state.students.findIndex(student => student.id == action.studentId);
      let newStudents = [...state.students];
      newStudents.splice(idx, 1);
      return {
        ...state,
        students: newStudents,
        student: {}
      }
    }
    case EDIT_CAMPUS: {
      const idx = state.campuses.findIndex(campus => campus.id == action.campus.id);
      let newCampuses = [...state.campuses];
      newCampuses[idx] = action.campus;
      return {
        ...state,
        campus: action.campus,
        campuses: newCampuses
      }
    }
    case REMOVE_CAMPUS: {
      const idx = state.campuses.findIndex(campus => campus.id == action.studentId);
      let newCampuses = [...state.campuses];
      newCampuses.splice(idx, 1);
      return {
        ...state,
        campuses: newCampuses,
        campus: {}
      }
    }
    case CLEAR_STUDENT:
      return {
        ...state,
        newStudentEntry: {firstName: '', lastName: '', email: '', gpa: ''}
      }
    case CLEAR_CAMPUS:
      return {
        ...state,
        campus: {name: '', description: ''}
      }
    default: return state
  }
};

export default rootReducer
