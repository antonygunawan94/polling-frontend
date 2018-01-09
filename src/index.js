import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
