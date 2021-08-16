import React, { Component } from 'react';
import styles from 'css/containers/sideNav.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
class SideNavNoWrap extends Component {
    render() {
        return (
            <div className={cx("sideNav")}>

            </div>
        );
    }
}

export const SideNav = SideNavNoWrap;
