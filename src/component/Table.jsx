import React, {Fragment} from "react";
import axios from 'axios';
import {CssBaseline, 
    Typography ,  
    Grid,
    Button,
    Box,
    TextareaAutosize ,
    TextField
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
  contentMain:{
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
    height:"35vh",
    [theme.breakpoints.down('sm')]:{
      height:"25vh",
    }
  },
  comentMain:{
    margin: "10px 0 50px 0",
    backgroundColor:'white',
    border: 'solid 1px #90a4ae',
    borderRadius: "10px",
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  comentHeader:{
    padding: '16px'
  },
  comentInput:{
    padding: '10px 16px 20px 16px',
  },
  comentAutor:{
    marginBottom:"15px"
  },
  textArea:{
    width: "87%",
    padding: '15px',
    fontSize: '1rem',
    borderRadius: "5px"
  },
  comentButton:{
    width: '12%',
    fontSize:'1.3rem'
  },
  comentFooter:{
    width: '100%',
    padding: '15px',
  },
  comentBox:{
    marginBottom: '20px', border: 'solid 1px #90a4ae',
    borderRadius: "10px",
    padding: '10px'
  },
  comentAutor:{
    marginBottom: '10px'
  },
  comentText:{
  }
});

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        table:[],
        coment:[],
        coment_autor:"",
        coment_text:"",
        id:props.match.params.id
    }
  };

  componentDidMount() {
    this._getData();
  }

  _addTable = async(e) => {
    const { coment_autor, coment_text } = this.state;
    e.preventDefault();

    const res = await axios('/add/coment', {
      method : 'POST',
      data : { 
        'coment_autor' : coment_autor,
        'coment_text' : coment_text,
        'table_id' : this.state.id
     },
      headers: new Headers()
    });

    if(res.data) {
      alert('등록되었습니다.');
      return window.location.reload();
    }
  }

  _autorUpdate(e) {
    this.setState({ coment_autor : e.target.value })
  }
  _textUpdate(e) {
    this.setState({ coment_text : e.target.value })
  }

  _getData = async () => {
    const res = await axios.get('/table/'+this.state.id);
    const res1 = await axios.get('/get/coment/'+this.state.id);
    this.setState({ 
      table : res.data,
      coment: res1.data
    })
  }
  editlink(){
    const edit_view_url = '/edit_table/'+this.state.id;
    return window.location.href=edit_view_url;
  }




  
  render() {
    const { table,coment } = this.state;
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
              <Grid item xs={12} className={this.props.classes.contentMain}>
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
              <Grid item xs={12} className={this.props.classes.comentMain}>
                <Box className={this.props.classes.comentHeader}>
                  <Typography variant="h6">댓글</Typography>
                </Box>
                <form className={this.props.classes.comentInput}  onSubmit={this._addTable}>
                  <TextField className={this.props.classes.comentAutor} onChange={(e) => this._autorUpdate(e)} size="small" variant="outlined" id="standard-basic" label="이름"  />
                  <Box style={{display:'flex', justifyContent:"space-between"}}>
                    <TextareaAutosize placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다." onChange={(e) => this._textUpdate(e)} minRows={5} className={this.props.classes.textArea} aria-label="maximum height"/>
                    <Button type="submit" variant="contained" color="primary"  className={this.props.classes.comentButton}>
                          등록
                    </Button>
                  </Box>
                </form>
                <Box className={this.props.classes.comentFooter}>
                  {coment.length !== 0 ? 
                        coment.map( (el, key) => {
                          // const edit_view_url = 'edit_table/'+el.id;
                          // const editlink = () =>{
                          //   return window.location.href=edit_view_url;
                          // }
                          // console.log('el',el)
                          return(
                            <Box className={this.props.classes.comentBox}>
                              <Typography variant="h6" className={this.props.classes.comentAutor}>{el.coment_autor} | <Moment format="YYYY-MM-DD" date={el.createdAt} style={{fontSize: '1rem'}}/></Typography>
                              <Typography variant="body1" className={this.props.classes.comentText}>{el.coment_text}</Typography>
                            </Box>
                          )
                        })
                        : <Fragment>데이터가 없습니다.</Fragment>}
                </Box>
              </Grid>
            </Grid>
        </React.Fragment>
      )
  };
};      


export default withStyles(styles)(Table);