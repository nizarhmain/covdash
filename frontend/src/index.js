import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/*
//STEP 1:
//create components using React.lazy
const LightTheme = React.lazy(() => import('./lightTheme'));
const DarkTheme = React.lazy(() => import('./darkTheme'));

//STEP 2:
//create a parent component that will load the components conditionally using React.Suspense

const ThemeSelector = ({ children }) => {
  const CHOSEN_THEME = localStorage.getItem('theme') || 'light';
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(CHOSEN_THEME === 'light') && <LightTheme />}
        {(CHOSEN_THEME === 'dark') && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}

*/



ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
