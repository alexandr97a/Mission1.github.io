import React from "react";
import {CssBaseline, 
  AppBar, 
  Toolbar, 
  Link,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';

const styles = theme => ({
  '@global':{
    html:{
      margin: 0,
      padding: 0,
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  AppBar:{
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none'
  },
  header:{
    display: 'flex',
    alignItems: 'center',
  },
  toolbar:{
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: theme.spacing(0, 15),
    [theme.breakpoints.down('xs')]:{
      justifyContent: "center"
    }
  },
  Link:{
    color: 'white',
    fontSize: 28,
    margin: theme.spacing(3),
    alignItems: 'center',
    display: 'flex',
    '&:hover': {
      textDecoration: 'none'
   },
  },
});

class Navbar extends React.Component {
  
  render() {
      return(
        <React.Fragment>
          <CssBaseline />
            <AppBar elevation={0} className={this.props.classes.AppBar}>
              <Toolbar  className={this.props.classes.toolbar}>
                <navbar className={this.props.classes.header}>
                  <Link variant="button" href="/" className={this.props.classes.Link} >
                    <DashboardIcon style={{fontSize:'30px'}}/>Dashboard
                  </Link>
                </navbar>
              </Toolbar>
            </AppBar>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Navbar);