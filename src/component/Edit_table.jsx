import React from "react";
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
  addButton:{
    margin:"180px 0 10px 0",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "20%"
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
  },
  tableContent:{
      width: '60%',
      border: 'solid 1px #90a4ae',
      borderTop: 'none',
      padding: '20px',
      height:'500px',
      overflow: "none"
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
  textChange = (e) => {
    console.log('asdasd',this.state.table)
    this.setState({
      ...this.state,
      table:{
        ...this.state.table,
        table_text: e.target.value
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

// _save = async () => {
//     const res = await axios('/save/table_data', {
//         method: 'POST',
//         data: {
//             'modify': this.state.table
//         },
//         headers: new Headers()
//     })
//     if (res.data) {
//         alert('저장하였습니다.')
//         return window.location.href = '/table/'+this.state.id;
//     }
// }




  
  render() {

    const { table } = this.state;
      return(
        <React.Fragment>
          <CssBaseline />
            <Navbar/>
            <Grid item xs={12} className={this.props.classes.addButton}>
                <Button variant="contained"  size="large" className={this.props.classes.editBtn} onClick={()=>this._save() }>
                    완료
                </Button>
            </Grid>
            <Grid item xs={12} className={this.props.classes.container}>
                {table != null ?
                          <>
                            <Grid item xs={12} className={this.props.classes.tableHeader}>
                                <TextField style={{width:'100%'}} id="table_title" name="table_title" onChange={this.titleChange} value={table.table_title}/>
                                <TextField id="table_autor" name="table_autor" onChange={this.autorChange} value={table.table_autor} style={{marginTop: '1rem'}}/>
                            </Grid>
                            <Grid item xs={12} className={this.props.classes.tableContent}>
                                <TextField style={{width:'100%'}} id="table_text" name="table_text" onChange={this.textChange} value={table.table_text} />
                            </Grid>
                          </>
                      
                    : <div>데이터가 없습니다.</div>}
            </Grid>
        </React.Fragment>
      )
  };
};


export default withStyles(styles)(Edit_table);