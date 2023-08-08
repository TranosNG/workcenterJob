import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import JobState from './context/JobState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JobState>
    <App />
    </JobState>
  </React.StrictMode>
);


