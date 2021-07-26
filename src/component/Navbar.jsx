import React from "react";
import axios from 'axios';
import {CssBaseline, 
  AppBar, 
  Toolbar, 
  Link,
  Grid,
  TableContainer, 
  Paper,
  Table, 
  TableCell, 
  TableHead,
  TableRow, 
  TableBody,
  Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';

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
    boxShadow: 'none',
    display: 'block'
  },
  header:{
    display: 'flex',
    alignItems: 'center',
  },
  toolbar:{
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: theme.spacing(0, 15),
  },
  Link:{
    color: 'white',
    fontSize: 20,
    margin: theme.spacing(4),
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
                  <Link variant="button" href="#" className={this.props.classes.Link} >
                    게시판
                  </Link>
                </navbar>
              </Toolbar>
            </AppBar>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Navbar);