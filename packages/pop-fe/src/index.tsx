/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/
// import './wdyr'; // <--- first import

 //fuse lib
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import routes from "./@fuse_app/fuse-configs/routesConfig";
//
// import reportWebVitals from './reportWebVitals';
import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
// import './react-chartjs-2-defaults';
import './styles/index.css';
import App from './App';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./common/store";
import AppContext from "./AppContext";
import "./constants.json";

//fuse properties
const insertionPoint = document.getElementById('jss-insertion-point');
const jss = create({
	...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend(), rtl()],
    insertionPoint : insertionPoint ? insertionPoint : ""
});

const generateClassName = createGenerateClassName();
//
ReactDOM.render(
  <React.StrictMode>
    <AppContext.Provider value={{
				routes
    }}>
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StylesProvider>
    </AppContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(console.log);