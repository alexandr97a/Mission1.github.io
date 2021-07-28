import React, { Fragment } from "react";
import axios from 'axios';
import {CssBaseline, 
    TextField,  
    Grid,
    Button,
    } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "./Navbar.jsx";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  container:{
    maxWidth:"1600px",
    margin: ' 0 auto;',
  },
  addButton:{
    margin:"180px 0 10px 0",
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down('sm')]:{
      marginTop:"110px",
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
    borderRadius: "10px",
    border: 'solid 1px #90a4ae',
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
    [theme.breakpoints.down('sm')]:{
      width:"95%",
      margin: ' 0 auto;'
    }
  },
  tableHeader:{
      width: '100%',
      borderBottom: 'solid 1px #90a4ae',
      padding: '20px',
      [theme.breakpoints.down('sm')]:{
        width:"95%",
        border: 'none',
      }
  },
  tableContent:{
      width: '100%',
      borderTop: 'none',
      padding: '20px',
      height:'500px',
      overflow: "none",
      [theme.breakpoints.down('sm')]:{
        width:"95%",
        border: 'none',
      }
  },
});

class Edit_table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        table:[],
        newTable:[],
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

  titleChange = (e) => {
      console.log('asdasd',this.state.table)
      this.setState({
        ...this.state,
        table:{
          ...this.state.table,
          table_title: e.target.value
        }
      });
  };
  autorChange = (e) => {
    console.log('asdasd',this.state.table)
    this.setState({
      ...this.state,
      table:{
        ...this.state.table,
        table_autor: e.target.value
      }
    });
  };
  textChange = (data) => {
    console.log('asdasd',this.state.table)
    this.setState({
      ...this.state,
      table:{
        ...this.state.table,
        table_text: data
      }
    });
  };

_save = async () => {
    const table_title = this.state.table;

    const modify = {
        table_title: table_title,
        id: this.state.id
    }

    const res = await axios('/save/table_data', {
        method: 'POST',
        data: {
            'modify': modify,
        },
        headers: new Headers()
    })
    console.log('res',res.data);
    if (res.data) {
        alert('저장하였습니다.')
        return window.location.href = '/table/'+this.state.id;
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
                  <Button variant="contained"  size="large" className={this.props.classes.editBtn} onClick={()=>this._save() }>
                      완료
                  </Button>
              </Grid>
              <Grid item xs={12} className={this.props.classes.main}>
                  {table != null ?
                            <Fragment>
                              <Grid item xs={12} className={this.props.classes.tableHeader}>
                                  <TextField style={{width:'100%'}} id="table_title" name="table_title" onChange={this.titleChange} value={table.table_title}/>
                                  <TextField id="table_autor" name="table_autor" onChange={this.autorChange} value={table.table_autor} style={{marginTop: '1rem'}}/>
                              </Grid>
                              <Grid item xs={12} className={this.props.classes.tableContent}>
                                  <CKEditor
                                      editor={ ClassicEditor }
                                      onReady={ editor => {
                                          // You can store the "editor" and use when it is needed.
                                          console.log( 'Editor is ready to use!', editor );
                                      } }
                                      onChange={ ( event, editor ) => {
                                          const data = editor.getData();
                                          this.textChange(data);
                                          console.log( { event, editor, data } );
                                      } }
                                      data={table.table_text}
                                      onBlur={ ( event, editor ) => {
                                          console.log( 'Blur.', editor );
                                      } }
                                      onFocus={ ( event, editor ) => {
                                          console.log( 'Focus.', editor );
                                      } }
                                  />
                              </Grid>
                            </Fragment>
                        
                      : <Fragment>데이터가 없습니다.</Fragment>}
              </Grid>
            </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Edit_table);