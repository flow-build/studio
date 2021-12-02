import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import { WorkflowManager }  from '@flowbuild/redux-toolkit-workflow-manager'

import store from './config/redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WorkflowManager>
        <App />
      </WorkflowManager>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
