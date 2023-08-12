import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer } from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esto nos permite conectarnos con la extension redux del navegador

const store = createStore(reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) //esta linea nos permite hacer peticiones a una API o servidor
);

export default store;