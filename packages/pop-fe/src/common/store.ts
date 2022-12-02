import { createStore , applyMiddleware, Store, Action, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { user, clientsetting, project, multitab, employee, work } from "common_module";

import _rootReducer from "../@fuse_app/store/rootReducer";
import fuse from "../@fuse_app/store/fuse/" ;
import i18n from '../@fuse_app/store/i18nSlice';
import auth from "../@fuse_app/auth/store";

const rootReducer = combineReducers({
    // reducer add
    work,
    clientsetting,
    multitab,
    employee,
    fuse,
    i18n,
    project,
    user,
    auth
});

export type reducerState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key : 'POP',
    storage,
    whitelist : ["user"]
}

function configureStore (){
    const store = createStore(
        persistReducer(persistConfig , rootReducer),
        applyMiddleware(thunkMiddleware),
    );
    return store;
}

export const store = configureStore();
export const persistor = persistStore(store);