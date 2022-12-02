import { createStore, applyMiddleware, Store, Action, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import {
    digitalsign,
    components,
    user,
    organization,
    tab,
    ping,
    project,
    category,
    document,
    files,
    work,
    din,
    drn,
    tm,
    achieve,
    modelfile,
    pdfdata,
    review,
    documentreview,
    authority,
    projectsettings,
    discipline,
} from "./reducer";

import _rootReducer from "fuse_app/lib/store/rootReducer";
import fuse from "fuse_app/lib/store/fuse";
import i18n from "fuse_app/lib/store/i18nSlice";
import auth from "fuse_app/lib/auth/store";

const rootReducer = combineReducers({
    // reducer add
    fuse,
    i18n,
    user,
    auth,
    digitalsign,
    components,
    organization,
    tab,
    ping,
    project,
    document,
    category,
    files,
    work,
    din,
    drn,
    tm,
    achieve,
    modelfile,
    pdfdata,
    review,
    documentreview,
    authority,
    projectsettings,
    discipline,
});

export type reducerState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: "HDC",
    storage: storage,
    whitelist: ["user", "components"],
};

function configureStore() {
    const store = createStore(
        persistReducer(persistConfig, rootReducer),
        applyMiddleware(thunkMiddleware)
    );
    return store;
}

export const store = configureStore();
export const persistor = persistStore(store);
