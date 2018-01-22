import React from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import '../css/index.css';

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
  flushBut: {
    fontSize: 25,
    marginTop: 10,
    marginLeft: 10,
  },
};

class ListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: null,
      type: {
        index: null,
      },
      page: 1,
      rows: 10,
      isAll: true,
      recordInfo: [],
      queryInfo: null,
      queryType: null,
    };
    this.init();
  }

  init = () => {
    this.setState({
      page: 1,
      rows: 10,
      recordInfo: [],
    });
    fetch('/server/daily_record/record_page.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: this.state.page,
        rows: this.state.rows,
        title: this.state.queryInfo,
        type: this.state.queryType,
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
                isAll: all,
                recordInfo: data.detail.content,
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
    fetch('/server/daily_record/record_page.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: page,
        rows: this.state.rows,
        title: this.state.queryInfo,
        type: this.state.queryType,
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
                isAll: all,
                recordInfo: [...this.state.recordInfo,...data.detail.content],
              });
            } else {
              alert(data.detail)
            }
         });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  selectType = (event, index, value) => {
    this.setState({
      type:{
        index: value===0? null:value,
      }
    });
  }

  flush = () => {
    this.setState({queryInfo:this.state.info,queryType:this.state.type.index});
    this.setState({
      page: 1,
      rows: 10,
      recordInfo: [],
    });
    fetch('/server/daily_record/record_page.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 1,
        rows: 10,
        title: this.state.info,
        type: this.state.type.index,
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
                isAll: all,
                recordInfo: data.detail.content,
              });
            } else {
              alert(data.detail)
            }
         });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  handleChangeInfo = (e, newValue) => {
    this.setState({info:newValue})
  }

  render() {
    console.log(this.state);
    let getMore = null;
    if(!this.state.isAll) {
      getMore = [<ListItem primaryText="..." onClick={() => this.getNextPage()} />,<Divider />];
    }
    return (
      <div>
        <AppBar
          title="Daily Record"
          iconClassNameLeft={<div></div>}
          titleStyle={styles.appBarTitleStyle}
          iconElementRight={<FontIcon style={styles.appBarAddBut} className="material-icons">add</FontIcon>}
          onRightIconButtonClick={this.props.addRecord}
        />
        <div className="type-list">
          <List>
            <Grid>
              <Row>
                <Col xs={5}>
                  <TextField
                    onChange={(e, newValue) => this.handleChangeInfo(e, newValue)}
                    hintText="info"
                    fullWidth="true" />
                </Col>
                <Col xs={5}>
                  <SelectField
                    hintText="type"
                    maxHeight={200}
                    onChange={this.selectType}
                    value={this.state.type.index}
                    fullWidth="true"
                  >
                    <MenuItem value={0} primaryText="不选择" />
                    {this.props.allTypes.map((type) => {
                      return (<MenuItem value={type.id} primaryText={type.typeName} />)
                    })}
                  </SelectField>
                </Col>
                <Col xs={1}>
                  <IconButton onClick={this.flush} className={styles.flushBut} tooltip="flush">
                    <FontIcon color='rgb(0, 188, 212)' className="material-icons">cached</FontIcon>
                  </IconButton>
                </Col>
              </Row>
            </Grid>
            <Divider />
          {this.state.recordInfo.map((record) => {
            return (
              [<ListItem primaryText={record.title} />,
              <Divider />]
            )
          })}
          {getMore}
          </List>
        </div>
      </div>
    )
  }
}

class InfoPage extends React.Component {
  render() {
    return (
      <a>info page</a>
    )
  }
}

class RecordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyInfo: 0, //0:ListPage.1:InfoPage
      defaultType: [],
      allTypes: [],
    };
    this.init();
  }

  init = () => {
    fetch('/server/daily_type/page_query.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 1,
        rows: 999,
      }),
      credentials: 'include',
    }).then((response) => {
      response.json().then((data) => {
            console.log(data);
            if(data.code === 'SUCCESS') {
              this.setState({
                allTypes: data.detail.content,
              });
            } else {
              alert(data.detail)
            }
         });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  addRecord = () => {
    this.setState({bodyInfo:1});
  }

  render() {
    let body = null;
    if(this.state.bodyInfo === 0) {
      body = <ListPage addRecord={this.addRecord} allTypes={this.state.allTypes} />;
    }else if (this.state.bodyInfo === 1) {
      body = <InfoPage />;
    }
    return (
      <div className="type-info-body">
        {body}
      </div>
    )
  }
}

export default RecordPage
