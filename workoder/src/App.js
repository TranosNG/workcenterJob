import ProgressBar from './components/ProgressBar'
import {useState, useEffect} from 'react'
// import { useContext } from 'react';
// import JobContext from './context/JobContext';
import axios from 'axios'

function App() {
  const [dt_dict, setDt_dict] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const get_dt_dict_job = async () => {
    const dt_labour_url = "http://127.0.0.1:8000/dt/dict/job"
    let dt_response = await axios.get(dt_labour_url)
    // console.log(dt_response)
    console.log(dt_response.data)
    setDt_dict(dt_response.data)
    setIsLoading(false)
  }

 
  useEffect(()=>{
    get_dt_dict_job()
  }, [])

  const filter_wc = (wc) => {
    if (wc === 'All')(
        setDt_dict(dt_dict)
    )
    const new_wc = Array.from(dt_dict).filter((unit) => unit.WC_NAME === wc )
    console.log(new_wc)
    setDt_dict(new_wc)
}
  const filter_l_status = (statusP) => {
    const new_status = Array.from(dt_dict).filter((status)=> status.L_STATUS === statusP)
    console.log(new_status)
    setDt_dict(new_status)
}

  useEffect(()=>{
    get_dt_dict_job()
  }, [])
  return (
        <div className="App">
          <header>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('All')}>All</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Bus Bar Cut_Bend_Pun')}>Bus Bar Cut_Bend_Pun</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Cable Cut&Crimp     ')}>Cable Cut&Crimp</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Electrical Assembly ')}>Electrical Assembly</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Quality Control     ')}>Quality Control</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Packaging           ')}>Packaging</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Laser Cutting      ')}>Laser Cutting</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('AE2510NT Punch      ')}>AE2510NT Punch</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Press Brake         ')}>Press Brake</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Mig Welding         ')}>Mig Welding</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Finishing           ')}>Finishing</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Chem Pretreatment   ')}>Chem Pretreatment</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Powder Coating      ')}>Powder Coating</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Mechanical Assembly1')}>Mechanical Assembly1</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Cable Tray Line')}>Cable Tray Line</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Chop Saw          ')}>Chop Saw</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Riveting, Spot, stud')}>Riveting, Spot, stud</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Fitting            ')}>Fitting</button>
          <button style={{backgroundColor: "#303C7B", color: "white"}} onClick={()=>filter_wc('Generator Testing    ')}>Generator Testing</button>
          <button style={{backgroundColor: "yellow"}} onClick={()=>filter_l_status('In Progress')}>In Progress</button>
          <button style={{backgroundColor: "green"}} onClick={()=>filter_l_status('Done')}>Done</button>
          </header>
    <section className="table_container">
    <table>
      <thead>
        <tr>
            <th>WO_NUM</th>
            <th>FLOW_SEQ</th>
            <th>WC_NAME</th>
            <th>WORKCENTER</th>
            <th>PART</th>
            <th>PCS_ORDERED</th>
            {/* <th>JOB_FLOW_WC</th> */}
            <th>JOB_WC</th>
            <th>DESCRIPTION</th>
            <th>LATEST_ET</th>
            {/* <th>LMO</th> */}
            <th>L_STATUS</th>
            <th>PCS_ORDERED</th>
            <th>PCS_COMPLETED</th>
          {/* <th>%_COMPLETED</th> */}
            <th>%_COMPLTD</th>
            </tr>
        </thead>
          {isLoading ? <h1 className='loading'>Loading...</h1>: <tbody>
            {dt_dict.length === 0 && 'No records found'}
            {Array.from(dt_dict).map((item, index)=>{
              const {JOB, PART, DESCRIPTION, QTY_ORDER, WORKCENTER, WC_NAME, FLOW_SEQ, JOB_WC_$, LATEST_ET, PCSORDER_1, PCSCOMPLTD_1, L_STATUS} = item
              let COMPLETED = Number((PCSCOMPLTD_1/PCSORDER_1) * 100).toFixed(2)
              return(
                <>
                <tr key={index}>
              <td>{JOB}</td>
                  <td>{FLOW_SEQ}</td>
                  <td>{WC_NAME}</td>
                  <td>{WORKCENTER}</td>
                  <td>{PART}</td>
                  <td>{QTY_ORDER}</td>
                  {/* <td>{JOB_FLOW_WC_$}</td> */}
                  <td>{JOB_WC_$}</td>
                  <td>{DESCRIPTION}</td>
                  <td>{LATEST_ET}</td>
                  {/* <td>{LMO}</td> */}
                  <td>{L_STATUS}</td>
                    <td>{PCSORDER_1}</td>
                    <td>{PCSCOMPLTD_1}</td>
                    <td><ProgressBar completed={COMPLETED} /> </td>  
            </tr> 
                </>
              )
            })}
            
          </tbody>         
}
                </table> 
                </section>
    </div>
  );
}

export default App;
