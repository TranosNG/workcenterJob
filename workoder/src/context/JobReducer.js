import { LOAD_JOB } from './JobType'

const JobReducer = (state, action) => {
  // const {dt_dict} = state
  const {payload} = action

  switch(action.type){
    case LOAD_JOB:
      return{
        ...state,
        dt_dict: payload
      }

      default:
  }
  
}

export default JobReducer