import React from "react";
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
import { withStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import Navbar from "./Navbar.jsx"

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
  addButton:{
    marginTop:"180px",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "5%"
  },
  Button:{
    backgroundColor: theme.palette.primary.dark,
  },
  main:{
    marginTop:"10px",
    display: "flex",
    justifyContent:"center",
    height: "1000px"
  },
  tableCont:{
    width:"90%",
    borderRadius: "10px",
    overflow: "auto",

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
  
  render() {
    const { table } = this.state;
      return(
        <React.Fragment>
          <CssBaseline />
            <Navbar/>
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
                      <TableCell>번호</TableCell>
                      <TableCell align="right">제목</TableCell>
                      <TableCell align="right">글쓴이</TableCell>
                      <TableCell align="right">등록일</TableCell>
                      <TableCell align="right">기능</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {table.length !== 0 ? 
                    table.map( (el, key) => {
                      return(
                        <TableRow key={key}>
                          <TableCell component="th">
                            {el.table_id}
                          </TableCell>
                          <TableCell align="right">{el.table_title}</TableCell>
                          <TableCell align="right">{el.table_autor}</TableCell>
                          <TableCell align="right">{el.table_text}</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      )
                    })
                    : <div>데이터가 없습니다.</div>}

                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Main);