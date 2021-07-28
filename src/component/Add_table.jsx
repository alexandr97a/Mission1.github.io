import React from "react";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CssBaseline, 
  Grid,
  TextField,
  Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "./Navbar.jsx"
import '../App.css';

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
      margin: ' 0 auto;',
      marginTop: "230px",
  },
  box:{
    display: "flex",
    flexDirection: "column",
    backgroundColor:'white',
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
    border: "solid 1px #90a4ae",
    
    borderRadius:'10px',
    padding: theme.spacing(2, 2),
    [theme.breakpoints.down('sm')]:{
      margin: ' 0 auto;',
      width:"95%",
      border: "none",
    }
  },
  input:{
    margin: theme.spacing(1 , 0),
  },
  editor:{
    margin: theme.spacing(1 , 0)
  },
  Button:{
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    fontSize: "1.4rem",
    marginTop:"20px"
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

  _addTable = async(e) => {
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
      alert('등록되었습니다.');
      return window.location.href="/";
    }
  }
  
  _titleUpdate(e) {
    this.setState({ table_title : e.target.value })
  }
  _autorUpdate(e) {
    this.setState({ table_autor : e.target.value })
  }
  _textUpdate(data) {
    this.setState({ table_text : data })}

  
  render() {
      return(
        <React.Fragment>
          <CssBaseline />
            <Navbar/>
            <Grid item xs={12} className={this.props.classes.container}>
                <form className={this.props.classes.box}  onSubmit={this._addTable}>
                    <TextField label="글제목" variant="outlined" className={this.props.classes.input} onChange={(e) => this._titleUpdate(e)}></TextField>
                    <TextField label="글쓴이" variant="outlined" className={this.props.classes.input} onChange={(e) => this._autorUpdate(e)}></TextField>
                    <CKEditor
                        editor={ ClassicEditor }
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this._textUpdate(data);
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                    <Button type="submit" variant="contained" className={this.props.classes.Button}>
                        등록
                    </Button>
                </form>
            </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Add_table);