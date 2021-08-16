import React from "react";
import ReactDOM from "react-dom";
import styles from '/client/css/global.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
import "typeface-roboto";
import {AppLayout} from "containers/appLayout/app-layout";
import { BrowserRouter} from 'react-router-dom';
function App() {
    return (
      <div className={cx("app")}>
        <BrowserRouter>
         <AppLayout/>
        </BrowserRouter>
      </div>
    );
  }
ReactDOM.render(
    <App />,
  document.getElementById('root')
);