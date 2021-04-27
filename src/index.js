import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProvideAuth } from './Hooks/useAuth';
import { StylesProvider } from '@material-ui/core/styles';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider>
    <ProvideAuth>
    <App />
    </ProvideAuth>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
