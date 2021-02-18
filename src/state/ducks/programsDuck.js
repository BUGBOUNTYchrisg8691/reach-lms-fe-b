import { axiosAuth } from '../../api/axiosAuth';

//Action Types
const GET_PROGRAM_START = ' GET_PROGRAM_START';
const GET_PROGRAM_SUCCESS = ' GET_PROGRAM_SUCCESS';
const GET_PROGRAM_FAIL = ' GET_PROGRAM_FAIL';
const GET_PROGRAM_RESOLVE = ' GET_PROGRAM_RESOLVE';
const GET_ALLPROGRAMS_START = 'GET_ALLPROGRAMS_START';
const GET_ALLPROGRAMS_SUCCESS = 'GET_ALLPROGRAMS_SUCCESS';
const GET_ALLPROGRAMS_FAIL = 'GET_ALLPROGRAMS_FAIL';
const GET_ALLPROGRAMS_RESOLVE = 'GET_ALLPROGRAMS_RESOLVE';

//Action Creators
export const programsActions = {
  //GET All Programs Action
  getAllProgramsThunk: () => dispatch => {
    dispatch({ type: GET_ALLPROGRAMS_START });

    axiosAuth()
      .get('/programs/programs')
      .then(res => {
        dispatch({ type: GET_ALLPROGRAMS_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_ALLPROGRAMS_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_ALLPROGRAMS_RESOLVE });
      });
  },

  //GET Individual Program Action
  getProgramThunk: programId => dispatch => {
    dispatch({ type: GET_PROGRAM_START });

    axiosAuth()
      .get(`/programs/program/${programId}`)
      .then(res => {
        dispatch({ type: GET_PROGRAM_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_PROGRAM_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_PROGRAM_RESOLVE });
      });
  },
};

//Initial Slice of State
const programsInitialState = {
  programs: [],
  program: {
    programId: '',
    programName: '',
    programType: '',
    programDescription: '',
    courses: [],
  },
  status: 'idle',
  error: '',
};

//Reducers
const programsReducer = (state = programsInitialState, action) => {
  switch (action.type) {
    //Get All Programs Reducers
    case GET_ALLPROGRAMS_START:
      return { ...state, status: 'pending' };

    case GET_ALLPROGRAMS_SUCCESS:
      return {
        ...state,
        programs: [...state.programs, action.payload],
        status: 'success',
      };
    case GET_ALLPROGRAMS_FAIL:
      return { ...state, status: 'error', error: action.payload };

    case GET_ALLPROGRAMS_RESOLVE:
      return { ...state, status: 'idle' };

    //Get Individual Program Reducers
    case GET_PROGRAM_START:
      return { ...state, status: 'pending' };

    case GET_PROGRAM_SUCCESS:
      return {
        ...state,
        program: {
          ...state.program,
          programId: action.payload.programId,
          programName: action.payload.programName,
          programType: action.payload.programType,
          programDescription: action.payload.programDescription,
          courses: [...state.program.courses, action.payload.courses],
        },
        status: 'success',
      };

    case GET_PROGRAM_FAIL:
      return { ...state, status: 'error', error: action.payload };

    case GET_PROGRAM_RESOLVE:
      return { ...state, status: 'idle' };

    //Default Case
    default:
      return state;
  }
};

export default programsReducer;
