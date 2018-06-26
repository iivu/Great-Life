import React, {Fragment} from 'react'
import { Table, Button,Input,Radio } from '@icedesign/base'

const RadioGroup = Radio.Group
const statusList = [
  {label:'活跃',value:0},
  {label:'禁用',value:1},
]

export default class AccountList extends React.Component {

  static displayName = 'AccountList'

  constructor (props) {
    super(props)
    this.state = {
      accountList:[...props.accountList]
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      accountList:[...nextProps.accountList]
    })
  }

  onUserNameChange =(value,index) => {
    const newList = [...this.state.accountList]
    newList[index].userName = value
    this.setState({accountList:newList})
  }

  onPasswordChange = (value,index) => {
    const newList = [...this.state.accountList]
    newList[index].password = value
    this.setState({accountList:newList})
  }

  onStatusChange = (value,index) => {
    const newList = [...this.state.accountList]
    newList[index].isActive = value
    this.setState({accountList:newList})
  }

  onUpdate = (index) => {
    this.props.onUpdate(this.state.accountList[index])
  }

  render () {
    const {__loading} = this.props
    const {accountList} = this.state
    return (
      <Table dataSource={accountList} isLoading={__loading} style={styles.accountList} >
        <Table.Column title="账号" dataIndex="userName" cell={(value,index,record)=>{
          return (<Input value={value} onChange={value=>{this.onUserNameChange(value,index)}}/>)
        }}/>
        <Table.Column title="密码" dataIndex="password" cell={(value,index,record)=>{
          return (<Input value={value} onChange={value=>{this.onPasswordChange(value,index)}}/>)
        }}/>
        <Table.Column title="状态" dataIndex="isActive" cell={(value,index,record)=>{
          return (<RadioGroup dataSource={statusList} shape="button" value={+value} onChange={value=>{this.onStatusChange(value,index)}}/>)
        }}/>
        <Table.Column align="center" title="操作" dataIndex="isActive" cell={(value,index,record)=>{
          return (<Button loading={__loading} onClick={()=> this.onUpdate(index)}>更新</Button>)
        }}/>
      </Table>
    )
  }
}

const styles = {
  accountList:{
    marginBottom:50,
  },
}