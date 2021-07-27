import React, { Component } from "react";
import axios from 'axios';


class Test extends Component {
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

  // 이후 추가할 코드영역
  _modify = async (el) => {
    const modify = prompt(el.table_title + '의 변경할 이름을 입력해주세요.')

    if(modify !== null) {
      const dataToModify = {
        table_title : modify,
        id : el.id
      }

      const res = await axios('/modify/data', {
        method : 'POST',
        data : { 'modify' : dataToModify },
        headers: new Headers()
      })

      if(res.data) {
        console.log(res.data[0]);
        alert('이름이 수정되었습니다.')
        return window.location.reload();
      }
    }
  }

  //////////////////////////////////////////////
  _modifyMulti = async (el) => {
    const targetId = prompt('변경할 대상 ID를 입력해주세요.')
    const targetName = prompt('변경할 대상 이름을 입력해주세요.')
    const newName = prompt('변경할 대상들의 새로운 이름을 입력해주세요.')

    if(newName !== null) {
      const dataToModify = {
        targetId : targetId,
        targetName : targetName,
        newName : newName
      }

      const res = await axios('/modify/multiData', {
        method : 'POST',
        data : { 'modify' : dataToModify },
        headers: new Headers()
      })

      if(res.data) {
        console.log(res.data[0]);
        alert('요청하신 대상들의 이름이 수정되었습니다.')
        return window.location.reload();
      }
    }
  }
  
  render() {
    const { table } = this.state;

    return(
      <div className='App'>
        <h3>Hello, You are testing React!</h3>

        <h4> Sample1 List </h4>

        {table.length !== 0 ? 
        table.map( (el, key) => {
          return(
            <div key={key}>
              <span> ID: {el.id} </span>/
              <span> NAME: {el.table_title} </span>/
              <span> EMAIL: {el.table_autor} </span>
              <button onClick={() => this._modify(el)}>modify</button>
            </div>
          )
        })
        : <div>데이터가 없습니다.</div>}
		
        <button onClick={this._modifyMulti}>modify 여러개</button>
      </div> 
    )
  };
};


export default Test;