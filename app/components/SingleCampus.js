import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { fetchCampus, deleteCampus } from '../reducers';
import { NavLink} from 'react-router-dom';

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    delete: () => {
      dispatch(deleteCampus(ownProps.match.params.campusId));
      ownProps.history.push('/campuses')
    }
  }
}

const mapStateToProps = (state) => {
  return {
    campus: state.campus,
    students: state.students
  }
}

class SingleCampus extends React.Component {
  componentDidMount () {
    const campusThunk = fetchCampus(Number(this.props.match.params.campusId));
    store.dispatch(campusThunk);
  }

  render () {
    const campus = this.props.campus

    return (
      <div>
        <h2>{campus.name}</h2>
        <NavLink to={`/campuses/${campus.id}/edit`}>
          <button>Edit</button>
        </NavLink>
        <button onClick={this.props.delete}>Delete</button>
        <hr />
        <div>
          <img src={campus.imageUrl} />
          <p style={{display: 'inline'}}>{campus.description}</p>
          <ul>
            <h3>Students</h3>
            {
              this.props.students.filter((student) => student.campusId === campus.id)
                .map(({id, fullName}) =>
                  (<li key={id}>
                    <NavLink to={`/students/${id}`}>
                      <span>{fullName}</span>
                    </NavLink>
                  </li>)
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
