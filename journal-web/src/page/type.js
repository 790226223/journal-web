import React from 'react';
import '../css/index.css';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  appBarTitleStyle: {
    marginLeft: -40,
  },
  appBarAddBut: {
    color: '#FFF',
    marginTop: 6,
    fontSize: 35,
    marginRight: 10,
  },
  dialogTitle: {
    height: 15,
    paddingTop: 5,
    fontSize: 15,
  },
};

class TypePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      rows: 10,
      typeInfo: [],
      isAll:true,
      dialog: false,
      dialogType: 0, //0:add,1:change
      typeName: '',
      typeDesc: '',
      updateId: 0,
    };
    this.init();
  }

  init = () => {
    this.setState({
      page: 1,
      rows: 10,
      typeInfo: [],
    });
    fetch('/server/daily_type/page_query.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: this.state.page,
        rows: this.state.rows,
      }),
      credentials: 'include',
    }).then((response) => {
      response.json().then((data) => {
            console.log(data);
            if(data.code === 'SUCCESS') {
              let all = true;
              if(data.detail.totalPages>data.detail.page){
                all = false;
              }
              this.setState({
                page: 1,
                rows: 10,
                isAll: all,
                typeInfo: [...this.state.typeInfo,...data.detail.content],
              });
            } else {
              alert(data.detail)
            }
         });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  getNextPage = () => {
    let page = this.state.page+1;
    fetch('/server/daily_type/page_query.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: page,
        rows: this.state.rows,
      }),
      credentials: 'include',
    }).then((response) => {
      response.json().then((data) => {
            console.log(data);
            if(data.code === 'SUCCESS') {
              let all = true;
              if(data.detail.totalPages>data.detail.page){
                all = false;
              }
              this.setState({
                page: page,
                rows: 10,
                isAll: all,
                typeInfo: [...this.state.typeInfo,...data.detail.content],
              });
            } else {
              alert(data.detail)
            }
         });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  addType = () => {
    this.setState({dialog: true,dialogType: 0,typeName:'',typeDesc:''});
  }

  handleClose = () => {
    this.setState({dialog: false});
  };

  handleSubmit = () => {
    if(this.state.dialogType === 0){
      fetch('/server/daily_type/add_type.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          typeName: this.state.typeName,
          desc: this.state.typeDesc,
        }),
        credentials: 'include',
      }).then((response) => {
        response.json().then((data) => {
              console.log(data);
              if(data.code === 'SUCCESS') {
                alert('add new type success');
                this.init();
              } else {
                alert(data.detail)
              }
           });
      }).catch((exception) => {
        console.log(exception);
      })
    }else if(this.state.dialogType === 1){
      fetch('/server/daily_type/change_type.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.updateId,
          typeName: this.state.typeName,
          desc: this.state.typeDesc,
        }),
        credentials: 'include',
      }).then((response) => {
        response.json().then((data) => {
              console.log(data);
              if(data.code === 'SUCCESS') {
                alert('update type success');
                this.init();
              } else {
                alert(data.detail)
              }
           });
      }).catch((exception) => {
        console.log(exception);
      })
    }
    this.setState({dialog: false});
  }

  changeType = (id,name,desc) => {
    this.setState({dialog: true,dialogType: 1,updateId:id,typeName:name,typeDesc:desc});
  }

  handleChangeTypeName(e, newValue) {
    this.setState({typeName:newValue})
  }

  handleChangeTypeDesc(e, newValue) {
    this.setState({typeDesc:newValue})
  }

  render() {
    console.log(this.state);
    let getMore = null;
    if(!this.state.isAll) {
      getMore = [<ListItem primaryText="..." onClick={() => this.getNextPage()} />,<Divider />];
    }
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
      />,
    ];
    let dialogTitle = '';
    if(this.state.dialogType === 0) {
      dialogTitle = 'Create New Type';
    }else if(this.state.dialogType === 1){
      dialogTitle = 'Update Type';
    }
    return (
      <div className="type-info-body">
        <AppBar
          title="Record Type"
          iconClassNameLeft={<div></div>}
          titleStyle={styles.appBarTitleStyle}
          iconElementRight={<FontIcon style={styles.appBarAddBut} className="material-icons">add</FontIcon>}
          onRightIconButtonClick={this.addType}
        />
        <div className="type-list">
          <List>
            {this.state.typeInfo.map((type) => {
              return (
                [<ListItem primaryText={type.typeName} onClick={() => this.changeType(type.id,type.typeName,type.desc)} />,
                  <Divider />])
            })}
            {getMore}
          </List>
        </div>
        <Dialog
          titleStyle={styles.dialogTitle}
          title={dialogTitle}
          actions={actions}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText="name"
            onChange={(e, newValue) => this.handleChangeTypeName(e, newValue)}
            value={this.state.typeName}
          />
          <TextField
            hintText="desc"
            multiLine="false"
            rows={2}
            underlineShow="false"
            value={this.state.typeDesc}
            onChange={(e, newValue) => this.handleChangeTypeDesc(e, newValue)}
           />
        </Dialog>
      </div>
    )
  }
}

export default TypePage
