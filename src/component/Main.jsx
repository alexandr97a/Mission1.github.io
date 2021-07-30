import React, { Fragment } from "react";
import axios from 'axios';
import {CssBaseline, 
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
import { withStyles, createTheme} from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import Navbar from "./Navbar.jsx";
import Moment from 'react-moment';

const mediaQ = createTheme({
  breakpoints: {
    values: {
      a: 480,
      b: 768,
      c: 999,
    },
  },
})

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
  container:{
    width: "calc( 100% - 100px)",
    margin: ' 0 auto',
    maxWidth: "1600px",
    minWidth: "1000px",
  },
  addButton:{
    marginTop:"180px",
    display: "flex",
    justifyContent: "flex-end",
    [mediaQ.breakpoints.down('a')]:{
      marginTop:"110px",
      // marginRight: "2.5%",
    }
  },
  Button:{
    backgroundColor: theme.palette.primary.dark,
  },
  main:{
    marginTop:"10px",
    display: "flex",
    justifyContent:"center",
    height: "80vh",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
    borderRadius: "10px",
    [theme.breakpoints.down('a')]:{
      height: "75vh",
      // width:"95%",
      margin: ' 0 auto;',
      marginTop:"10px",
    }
  },
  dltButton:{
    backgroundColor: theme.palette.secondary.main,
    color:'white',
  },
  tableBody:{
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    wordBreak: "break-all",
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('a')]:{
      maxWidth: '5rem',
    }
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      table : [],
    }
  };

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    const res = await axios.get('/get/table');
    this.setState({ 
      table : res.data
    })
  }

  _delete = async (el) => {
    const remove = window.confirm(el.table_title + '을 삭제하시겠습니까?');

    if(remove) {
      const target = { id : el.table_id }
      const res = await axios('/delete/table', {
        method : 'POST',
        data : { 'delete' : target },
        headers: new Headers()
      })
      
      if(res.data) {
        alert('데이터를 삭제했습니다.')
        return window.location.reload();
      }
    }
  }
  
  render() {
    const { table } = this.state;
      return(
        <React.Fragment>
          <CssBaseline />
            <Navbar/>
              <Grid item xs={12} className={this.props.classes.container}>
                <Grid item xs={12} className={this.props.classes.addButton}>
                    <Link href="/add_table">
                        <Button variant="contained"  size="large" color="primary" className={this.props.classes.Button}>
                            <CreateIcon fontSize="small" />&nbsp;글쓰기
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} className={this.props.classes.main}>
                  <TableContainer component={Paper} className={this.props.classes.tableCont}>
                    <Table className={this.props.classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align='center'>번호</TableCell>
                          <TableCell align='left'>제목</TableCell>
                          <TableCell align='left'>글쓴이</TableCell>
                          <TableCell align='left'>등록일</TableCell>
                          <TableCell align='center'>기능</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {table.length !== 0 ? 
                        table.map( (el, key) => {
                          const view_url = 'table/'+el.table_id;
                          const link = () =>{
                            return window.location.href=view_url;
                          }
                          // const edit_view_url = 'edit_table/'+el.id;
                          // const editlink = () =>{
                          //   return window.location.href=edit_view_url;
                          // }
                          // console.log('el',el)
                          return(
                              <TableRow key={key}>
                                <TableCell  align='center' onClick={link} className={this.props.classes.tableBody}>{el.table_id}</TableCell>
                                <TableCell  align='left' onClick={link} className={this.props.classes.tableBody}>{el.table_title}</TableCell>
                                <TableCell  align='left' onClick={link} className={this.props.classes.tableBody}>{el.table_autor}</TableCell>
                                <TableCell  align='left' onClick={link} className={this.props.classes.tableBody}><Moment format="YYYY-MM-DD" date={el.createdAt}/></TableCell>
                                <TableCell  align='center'>
                                  <Button className={this.props.classes.dltButton} onClick={() => this._delete(el)}>Delete</Button>
                                </TableCell>
                              </TableRow>

                          )
                        })
                        : <Fragment>데이터가 없습니다.</Fragment>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Main);