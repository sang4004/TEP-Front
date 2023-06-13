// import './wdyr'; // <--- first import

//fuse lib
import { createGenerateClassName, jssPreset, StylesProvider } from "@material-ui/core/styles";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import rtl from "jss-rtl";
import routes from "fuse_app/lib/fuse-configs/routesConfig";
//
// import reportWebVitals from './reportWebVitals';
import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
// import "./react-chartjs-2-defaults";
import "./styles/index.css";
import "./styles/reset.css";
import "@progress/kendo-theme-default/dist/all.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./common/store";
import AppContext from "./AppContext";

// #region warning delete
const warn = console.warn;

function logWarning(...warnings: any[]) {
    let showWarning = true;
    warnings.forEach(warning => {
        if(warning.includes){
            if (warning.includes("UNSAFE_")) showWarning = false;
            else if (warning.includes("SourceMap")) showWarning = false;
            else if (warning.includes("DevTools")) showWarning = false;
            else if (warning.includes("implementation returned undefined")) showWarning = false;
        }
    });
    if (showWarning) warn(...warnings);
}

console.warn = logWarning;
// #endregion

//fuse properties
const insertionPoint = document.getElementById("jss-insertion-point");
const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend(), rtl()],
    insertionPoint: insertionPoint ? insertionPoint : "",
});

const generateClassName = createGenerateClassName();
//
ReactDOM.render(
    <React.StrictMode>
        {/* <ExampleFont /> */}
        <AppContext.Provider value={{ routes }}>
            <StylesProvider jss={jss} generateClassName={generateClassName}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </StylesProvider>
        </AppContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// reportWebVitals(console.log);
