import React from "react";
import axios from 'axios';
import {CssBaseline, 
  Grid,
  FormControl,
  InputLabel,
  Input,
  TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
  container:{
      marginTop: "180px",
      display: "flex",
      justifyContent: "center"
  }
});

class Add_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        table_title:"",
        table_autor:"",
        table_text:""
    }
  };

  _addData = async(e) => {
    const { table_title, table_autor,table_text } = this.state;
    e.preventDefault();

    const res = await axios('/add/table', {
      method : 'POST',
      data : { 
        'table_title' : table_title,
        'table_autor' : table_autor,
        'table_text' : table_text
     },
      headers: new Headers()
    });

    if(res.data) {
      alert('게시판 추가 완료.');
      return window.location.reload();
    }
  }
  
  _titleUpdate(e) {
    this.setState({ table_title : e.target.value })
  }
  _autorUpdate(e) {
    this.setState({ table_autor : e.target.value })
  }
  _textUpdate(e) {
    this.setState({ table_text : e.target.value })
  }

  
  render() {
      return(
        <React.Fragment>
          <CssBaseline />
            <Navbar/>
            <Grid item xs={12} className={this.props.classes.container}>
            <FormControl>
                <TextField label="글제목" className={this.props.classes.text}></TextField>
                <TextField label="글쓴이" className={this.props.classes.text}></TextField>
            </FormControl>
            </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Add_table);