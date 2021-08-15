import React from "react";
import ReactDOM from "react-dom";
import styles from '/client/css/global.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
import "typeface-roboto";
import { Typography } from "@material-ui/core";
function App() {
    return (
      <div className={cx("App")}>
       <Typography variant="h1">Hello World!...b</Typography>
      </div>
    );
  }
ReactDOM.render(
    <App />,
  document.getElementById('root')
);