import React, { Component } from 'react';
import { AppBar, Grid, Toolbar, Typography, Icon } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
class AppHeaderNoWrap extends Component {

    render() {
        return (
            <AppBar position="static" style={{top: "0px"}}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                    <Icon><FlareIcon/></Icon>
                        </Grid>
                        <Grid item>
                        <Typography variant="h6">
                            Bookings...
                        </Typography>
                        </Grid>
                        <Grid item>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export const AppHeader = AppHeaderNoWrap;