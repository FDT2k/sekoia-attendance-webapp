import { createStore,applyMiddleware } from "redux";





export const defaultMiddlewaresList = () => {

	let	middlewares = [];

	let {default: ReduxThunk} = require("redux-thunk");

	let reduxMiddlewares = [...middlewares];

	if (process.env.NODE_ENV === "development") {
		const { logger } = require("redux-logger");
		reduxMiddlewares.push(logger);
	}

	reduxMiddlewares.push(ReduxThunk);
  return applyMiddleware(...reduxMiddlewares);

};

// build a store using middlewares, initialState and reducers
// here reducer is an object
export const makeStore = (setMiddleWares) => (initialState)=> (reducer) =>{

	if(process.env.NODE_ENV === 'development'){
		const {composeWithDevTools} = require ('remote-redux-devtools');
		setMiddleWares = composeWithDevTools(setMiddleWares)
	}
	let store = createStore(reducer,initialState,setMiddleWares);

	return store;
};

// create a default store, with default middlewares

export default makeStore(defaultMiddlewaresList())
