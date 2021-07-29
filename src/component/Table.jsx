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
      margin: '0 auto',
      padding: 0,
      maxWidth:"1600px",
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  container:{
    width: "calc( 100% - 100px)",
    margin: ' 0 auto',
    maxWidth: "1600px",
    minWidth: "1000px",
  },
  addButton:{
    margin:"180px 0 10px 0",
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down('sm')]:{
      marginTop: "110px",
      marginRight: "2.5%",
    }
  },
  editBtn:{
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
  },
  main:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:'white',
    border: 'solid 1px #90a4ae',
    borderRadius: "10px",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
    [theme.breakpoints.down('sm')]:{
      // width:"95%",
      margin: ' 0 auto;'
    }
  },
  tableHeader:{
      width: '100%',
      borderBottom: 'solid 1px #90a4ae',
      padding: '20px',
      overflowWrap: "break-word",
  },
  tableContent:{
      width: '100%',
      padding: '20px',
      overflow: "auto",
  },
  tableText:{
    borderRadius: "10px",
    overflowWrap: "break-word",
    height:"65vh",
    [theme.breakpoints.down('sm')]:{
      height:"45vh",
    }
  }
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
            
            <Grid item xs={12} className={this.props.classes.container}>
              <Grid item xs={12} className={this.props.classes.addButton}>
                <Button variant="contained"  size="large" onClick={() => this.editlink()} className={this.props.classes.editBtn}>
                    수정
                </Button>
              </Grid>
              <Grid item xs={12} className={this.props.classes.main}>
                  {table != null ?
                            <Fragment>
                              <Grid item xs={12} className={this.props.classes.tableHeader}>
                                  <Typography variant="h4" >{table.table_title} </Typography >
                                  <Typography style={{marginTop: '1rem'}} variant="body1" >{table.table_autor} | <Moment format="YYYY-MM-DD" date={table.createdAt}/> </Typography >
                              </Grid>
                              <Grid item xs={12} className={this.props.classes.tableContent}>
                                  <Typography className={this.props.classes.tableText}>{table.table_text}</Typography >
                              </Grid>
                            </Fragment>
                        
                      : <Fragment>데이터가 없습니다.</Fragment>}
              </Grid>
            </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Table);