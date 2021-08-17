import React from "react";
import ReactDOM from "react-dom";
import styles from '/client/css/global.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
import "typeface-roboto";
import {AppLayout} from "containers/appLayout/app-layout";
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
function App() {
  const eventReducer = function (state = 0, action) {
    let temp={};
    switch (action.type) {
      case "EVENT_SELECTED":
        temp = {...state, eventName: action.value}
        return temp;
      default:
        return state;
    }
  };
  let store = createStore(eventReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return ( 
      <div className={cx("app")}>
        <Provider store={store}>
        <BrowserRouter>
         <AppLayout/>
        </BrowserRouter>
        </Provider>
      </div>
    );
  }
ReactDOM.render(
    <App />,
  document.getElementById('root')
);