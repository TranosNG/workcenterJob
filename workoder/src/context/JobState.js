// import { useState, useEffect } from "react";
// import JobContext from "./JobContext";
// import axios from 'axios'


// const JobState = ({children}) => {
//   const [dt_dict, setDt_dict] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
// //   const [work_center, setWork_center] = useState([])

//   const get_dt_dict_job = async () => {
//     const dt_labour_url = "http://127.0.0.1:8000/dt/dict/job"
//     let dt_response = await axios.get(dt_labour_url)
//     // console.log(dt_response)
//     console.log(dt_response.data)
//     setDt_dict(dt_response.data)
//     setIsLoading(false)
//   }

 

//   useEffect(()=>{
//     get_dt_dict_job()
//   }, [])

//   const filter_wc = (wc) => {
//     if (wc === 'All')(
//         setDt_dict(dt_dict)
//     )
//     const new_wc = dt_dict.filter((unit) => unit.WC_NAME === wc )
//     console.log(new_wc)
//     setDt_dict(new_wc)
// }
//   const filter_l_status = (statusP) => {
//     const new_status = Array.from(dt_dict).filter((status)=> status.L_STATUS === statusP)
//     console.log(new_status)
//     setDt_dict(new_status)
// }

//     return(
//         <JobContext.Provider value={{
//             dt_dict,
//             isLoading,
//             filter_wc, 
//             filter_l_status
//         }}
//         >
//             {children}

//         </JobContext.Provider>
//     )
// }


// export default JobState

import React, { useReducer } from 'react'
import { LOAD_JOB } from './JobType'
import JobReducer from './JobReducer'
import JobContext from './JobContext'


const JobState = ({children}) => {
    const initialValue = {
        dt_dict: [],
        isLoading: true,
        
    }
    const [state, dispatch] = useReducer(JobReducer, initialValue)
    const loadJob = (ArrayofJob) => {
        dispatch({type: LOAD_JOB, payload: ArrayofJob})
    }
  return (
    <JobContext.Provider value={{
        dt_dict: state.dt_dict,
        isLoading: state.isLoading,
        loadJob,
        ...state
    }}>
        {children}
    </JobContext.Provider>
  )
}

export default JobState