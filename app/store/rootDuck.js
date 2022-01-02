import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as localLoader from "./ducks/loader.duck";
import * as localSnackbar from "./ducks/snackbar.duck";
import * as localAuth from "./ducks/auth.duck";

import * as passIds from "./ducks/passIds.duck";


export const devReducers = combineReducers({
      loader: localLoader.reducer,
      snackbar: localSnackbar.reducer,
      auth: localAuth.reducer,
      passIds : passIds.reducer
})

//this reducer is called in microfrontend mode
export const appReducers = {
      passIds : passIds.reducer
}


