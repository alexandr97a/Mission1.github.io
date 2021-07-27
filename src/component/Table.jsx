import React, {Fragment} from "react";
import axios from 'axios';
import {CssBaseline, 
    Typography ,  
    Grid,
    Button,
    } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "./Navbar.jsx";
import Moment from 'react-moment';

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
  addButton:{
    margin:"180px 0 10px 0",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "20%",
    [theme.breakpoints.down('sm')]:{
      marginRight: "2.5%",
    }
  },
  editBtn:{
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
  },
  container:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tableHeader:{
      width: '60%',
      border: 'solid 1px #90a4ae',
      padding: '20px',
      [theme.breakpoints.down('sm')]:{
        width:"95%",
      }
  },
  tableContent:{
      width: '60%',
      border: 'solid 1px #90a4ae',
      borderTop: 'none',
      padding: '20px',
      height:'500px',
      [theme.breakpoints.down('sm')]:{
        width:"95%",
      }
  },
});

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        table:[],
        id:props.match.params.id
    }
  };

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    const res = await axios.get('/table/'+this.state.id);
    this.setState({ 
      table : res.data
    })
  }
  editlink(){
    const edit_view_url = '/edit_table/'+this.state.id;
    return window.location.href=edit_view_url;
  }


  
  render() {
    const { table } = this.state;
      return(
        <React.Fragment>
          <CssBaseline />
            <Navbar/>
            <Grid item xs={12} className={this.props.classes.addButton}>
              <Button variant="contained"  size="large" onClick={() => this.editlink()} className={this.props.classes.editBtn}>
                  수정
              </Button>
            </Grid>
            <Grid item xs={12} className={this.props.classes.container}>
                {table != null ?
                          <Fragment>
                            <Grid item xs={12} className={this.props.classes.tableHeader}>
                                <Typography variant="h4" >{table.table_title} </Typography >
                                <Typography style={{marginTop: '1rem'}} variant="body1" >{table.table_autor} | <Moment format="YYYY-MM-DD" date={table.createdAt}/> </Typography >
                            </Grid>
                            <Grid item xs={12} className={this.props.classes.tableContent}>
                                <Typography >{table.table_text}</Typography >
                            </Grid>
                          </Fragment>
                      
                    : <Fragment>데이터가 없습니다.</Fragment>}
            </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Table);