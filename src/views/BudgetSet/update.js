import React, { Component } from 'react';
// import jwtDecode from 'jwt-decode';
// import swal from 'sweetalert';
// import { Link } from 'react-router-dom';
import Loading from '../../component/loading';
import { Modal, Select } from 'antd';
import 'antd/dist/antd.css';
import DivisionModel from '../../models/DivisionModel';
import BudgetModel from '../../models/BudgetModel';


const division_model = new DivisionModel();
const budget_model = new BudgetModel();
class BudgetUpdate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        division: []
      },
      state_division: '',
      budget_code: '',
      this_division: '',
      this_tab: 'all',
      div_division: '',
      loading: true,
      title_modal: '',
      division_list: [],
      division_select: [],
      modal_division: false,
      card_budget: [],
      modal_topic: false,
      modal_input: '',
      props_modal: {},
      budget: {
        budget_code: '',
        budget_name: '',
        budget_year: '',
        budget_detail: '',
        budget_topic: [
          {
            budget_code: '',
            budget_topic_code: '',
            budget_topic_name: 'รายรับ',
            budget_title: []
          },
          {
            budget_code: '',
            budget_topic_code: '',
            budget_topic_name: 'รายจ่าย',
            budget_title: []
          },
          {
            budget_code: '',
            budget_topic_code: '',
            budget_topic_name: 'ลงทุน',
            budget_title: []
          }
        ]
      }
    };
  }


  async componentDidMount() {
    var division_list = await division_model.getDivisionBy();
    // var date = new Date();
    var budget = await budget_model.getBudgetTreeByCode({
      budget_code: this.props.match.params.budget_code
    });
    // var budget = {
    //   budget_code: budget_code.data.result[0].last_code,
    //   budget_name: '',
    //   budget_year: '',
    //   budget_detail: '',
    //   budget_topic: [
    //     {
    //       budget_code: budget_code.data.result[0].last_code,
    //       budget_topic_code: '',
    //       budget_topic_name: 'รายรับ',
    //       budget_title: []
    //     },
    //     {
    //       budget_code: budget_code.data.result[0].last_code,
    //       budget_topic_code: '',
    //       budget_topic_name: 'รายจ่าย',
    //       budget_title: []
    //     },
    //     {
    //       budget_code: budget_code.data.result[0].last_code,
    //       budget_topic_code: '',
    //       budget_topic_name: 'ลงทุน',
    //       budget_title: []
    //     }
    //   ]
    // }
    await this.setState({
      division_list: division_list.data.result,
      // budget_code: budget_code.data.result[0].last_code,
      budget: budget.data.result[0],
      loading: false
    });
    this._callBudgetDetail()
  }
  async _modalDeleteudgetList(string, name, topic_i, title_i, list_i) {
    var budget = this.state.budget;
    if (string === 'budget_list') {
      budget.budget_topics[topic_i].budget_titles[title_i].budget_lists.splice(list_i, 1);
    } else if (string === 'budget_title') {
      budget.budget_topics[topic_i].budget_titles.splice(title_i, 1);
    }
    await this.setState({
      budget: budget
    })
    this._callBudgetDetail();
  }
  _modalAddBudgetList(string, name, topic_i, title_i) {
    this.setState({
      modal_topic: true,
      title_modal: name,
      props_modal: {
        string: string,
        topic_i: topic_i,
        title_i: title_i,
      }
    })
  }
  _callBudgetDivision() {
    var div_division = []
    for (let i in this.state.division_select) {
      var tmp = (
        <div className={"btn-header " + (this.state.this_tab === this.state.division_select[i].value ? 'active' : null)} onClick={this._clickDivision.bind(this, this.state.division_select[i].value)}>
          {this.state.division_select[i].children}
        </div>
      )
      div_division.push(tmp)
    }
    this.setState({
      div_division: div_division
    })
  }

  _callBudgetDetail() {
    var budget = this.state.budget;
    var card_budget = []
    if (this.state.this_tab === 'all') {
      for (let topic_i in budget.budget_topics) {
        let card_topic = [];
        for (let title_i in budget.budget_topics[topic_i].budget_titles) {
          let card_list = []
          for (let list_i in budget.budget_topics[topic_i].budget_titles[title_i].budget_lists) {
            let tmp_list = (
              <div>
                <span style={{ padding: '0px 4px 0px 32px' }}>- {budget.budget_topics[topic_i].budget_titles[title_i].budget_lists[list_i].budget_list_name}</span>
                <span onClick={this._modalDeleteudgetList.bind(this, 'budget_list', budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name, topic_i, title_i, list_i)} style={{ padding: 4 }}><i style={{ color: 'red', fontSize: '1rem' }} class="fa fa-times" aria-hidden="true"></i></span>
              </div>
            )
            card_list.push(tmp_list)
          }
          let tmp_title = (
            <div>
              <div >
                <span style={{ padding: 8 }}>{budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name}</span>
                <span onClick={this._modalAddBudgetList.bind(this, 'budget_title', budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name, topic_i, title_i)} style={{ padding: 4 }}><i style={{ color: '#28a745', fontSize: '1rem' }} class="fa fa-plus" aria-hidden="true"></i></span>
                <span onClick={this._modalDeleteudgetList.bind(this, 'budget_title', budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name, topic_i, title_i, 0)} style={{ padding: 4 }}><i style={{ color: 'red', fontSize: '1rem' }} class="fa fa-times" aria-hidden="true"></i></span>
              </div>
              {card_list}
            </div>
          )
          card_topic.push(tmp_title)
        }
        let tmp_topic = (
          <div className="card-detail">
            <div className="card-budget-topic">
              <div style={{ flexGrow: 1, position: 'relative' }}><span style={{ paddingTop: 8, position: 'absolute', bottom: 0 }}>{budget.budget_topics[topic_i].budget_topic_name}</span></div>
              <div ><button className="btn btn-success" onClick={this._modalAddBudgetList.bind(this, 'budget_topic', budget.budget_topics[topic_i].budget_topic_name, topic_i, 0)}>Add</button></div>
            </div>
            {card_topic}
          </div>
        )
        card_budget.push(tmp_topic);
      }
    } else {
      for (let topic_i in budget.budget_topics) {
        let card_topic = [];
        for (let title_i in budget.budget_topics[topic_i].budget_titles) {
          let card_list = []
          for (let list_i in budget.budget_topics[topic_i].budget_titles[title_i].budget_lists) {
            if (budget.budget_topics[topic_i].budget_titles[title_i].budget_lists[list_i].division_code === this.state.this_division || budget.budget_topics[topic_i].budget_titles[title_i].budget_list[list_i].division_code === '') {
              let tmp_list = (
                <div>
                  <span style={{ padding: '0px 4px 0px 32px' }}>- {budget.budget_topics[topic_i].budget_title[title_i].budget_lists[list_i].budget_list_name}</span>
                  <span onClick={this._modalDeleteudgetList.bind(this, 'budget_list', budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name, topic_i, title_i, list_i)} style={{ padding: 4 }}><i style={{ color: 'red', fontSize: '1rem' }} class="fa fa-times" aria-hidden="true"></i></span>
                </div>
              )
              card_list.push(tmp_list)
            }
          }
          let tmp_title = (
            <div>
              <div >
                <span style={{ padding: 8 }}>{budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name}</span>
                <span onClick={this._modalAddBudgetList.bind(this, 'budget_title', budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name, topic_i, title_i)} style={{ padding: 4 }}><i style={{ color: '#28a745', fontSize: '1rem' }} class="fa fa-plus" aria-hidden="true"></i></span>
                <span onClick={this._modalDeleteudgetList.bind(this, 'budget_title', budget.budget_topics[topic_i].budget_titles[title_i].budget_title_name, topic_i, title_i, 0)} style={{ padding: 4 }}><i style={{ color: 'red', fontSize: '1rem' }} class="fa fa-times" aria-hidden="true"></i></span>
              </div>
              {card_list}
            </div>
          )
          card_topic.push(tmp_title)
        }
        let tmp_topic = (
          <div className="card-detail">
            <div className="card-budget-topic">
              <div style={{ flexGrow: 1, position: 'relative' }}><span style={{ paddingTop: 8, position: 'absolute', bottom: 0 }}>{budget.budget_topics[topic_i].budget_topic_name}</span></div>
              <div ><button className="btn btn-success" onClick={this._modalAddBudgetList.bind(this, 'budget_topic', budget.budget_topics[topic_i].budget_topic_name, topic_i, 0)}>Add</button></div>
            </div>
            {card_topic}
          </div>
        )
        card_budget.push(tmp_topic);
      }
    }

    this.setState({
      card_budget: card_budget,
    })
  }
  _setDivisionOption() {
    var division_select = this.state.division_select;
    var division_list = this.state.division_list;
    var division_option = []
    for (let i in division_list) {
      if (division_select.filter((val) => val.value === division_list[i].division_code).length === 0) {
        division_option.push(
          <Select.Option key={division_list[i].division_code}>{division_list[i].division_name}</Select.Option>
        )
      }
    }
    this.setState({
      division_option: division_option
    })
  }
  async _addDivision() {
    this._setDivisionOption();
    this.setState({
      modal_division: true,
    })
  }
  _addDivisionOk() {
    if (this.state.state_division !== '') {
      var division_select = this.state.division_select;
      division_select.push(this.state.state_division)
      this.setState({
        modal_division: false,
        state_division: '',
        division_select: division_select
      });
      this._callBudgetDivision();
    }

  }
  _addDivisionCancel() {
    this.setState({
      modal_division: false,
      state_division: ''
    })
  }
  _modalInputChange(data) {
    this.setState({
      modal_input: data.target.value
    })
  }
  _addModalOk() {
    if (this.state.modal_input !== '') {
      var budget = this.state.budget;
      var props_modal = this.state.props_modal;
      if (props_modal.string === 'budget_topic') {
        var budget_title = {
          budget_code: this.state.budget_code,
          budget_topic_code: '',
          budget_title_code: '',
          budget_title_name: this.state.modal_input,
          budget_lists: []
        }
        budget.budget_topics[props_modal.topic_i].budget_titles.push(budget_title);
      } else if (props_modal.string === 'budget_title') {
        var budget_list = {
          budget_code: this.state.budget_code,
          division_code: this.state.this_division,
          budget_title_code: '',
          department_code: '',
          budget_list_name: this.state.modal_input
        }
        budget.budget_topics[props_modal.topic_i].budget_titles[props_modal.title_i].budget_lists.push(budget_list);
      }

      console.log(budget);
      this.setState({
        modal_topic: false,
        budget: budget,
        modal_input: ''
      });
      this._callBudgetDetail()
    }
  }
  _addModalCancel() {
    this.setState({
      modal_topic: false,
      modal_input: ''
    })
  }
  _optionDivisionChange(key, row) {
    console.log(key, row);
    this.setState({
      state_division: row
    })
  }
  async _clickDivision(division_code) {
    await this.setState({
      this_tab: division_code,
      this_division: (division_code === 'all' ? '' : division_code)
    })
    this._callBudgetDivision();
    this._callBudgetDetail();
  }
  _budgetYearChange(key) {
    var budget = this.state.budget;
    budget.budget_year = key
    this.setState({
      budget: budget
    })
  }
  _budgetInputChange(name, obj) {
    var budget = this.state.budget;
    budget[name] = obj.target.value
    this.setState({
      budget: budget
    })
    // console.log(obj.target.value, name);
  }
  _saveBudget() {
    var data = {
      budget: this.state.budget,
      budget_code: this.state.budget_code,
      division: this.state.division_select
    }
    console.log(data);
  }
  render() {
    var now = new Date();
    return (
      <div>
        <Loading showLoading={this.state.loading} />
        <div className="first-view">
          <div className="div-topic">
            <h2>ตั้งงบประมาณ</h2>
          </div>
          <div className="card-topic">
            <div style={{ flexGrow: 1 }}>
              <label style={{ fontSize: '1.3rem' }}>เพิ่มการตั้งงบประมาณ</label>
            </div>
            {/* <div><button className="btn btn-success">ADD</button></div> */}
          </div>
          <div className="card-detail">
            <div className="card-detail-topic">
              <div className="row">
                <div style={{ padding: 16 }} >
                  <label for="year"> ปีงบประมาณ </label>
                  <Select id="year" style={{ width: '100%' }}
                    showSearch
                    onChange={this._budgetYearChange.bind(this)}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option key={now.getFullYear()}>{now.getFullYear()}</Select.Option>
                    <Select.Option key={now.getFullYear() + 1}>{now.getFullYear() + 1}</Select.Option>
                    <Select.Option key={now.getFullYear() + 2}>{now.getFullYear() + 2}</Select.Option>
                    <Select.Option key={now.getFullYear() + 3}>{now.getFullYear() + 3}</Select.Option>
                  </Select>
                </div>
                <div style={{ padding: 16 }} >
                  <label for="name"> ชื่องบประมาณ </label>
                  <input id="name" onChange={this._budgetInputChange.bind(this, 'budget_name')} className="form-group" />
                </div>
              </div>
              <div className="row">
                <div style={{ padding: 16, width: '100%' }} >
                  <label for="detail"> รายละเอียดงบประมาณ </label>
                  <textarea onChange={this._budgetInputChange.bind(this, 'budget_detail')} style={{ width: '100%', boxShadow: 'unset' }}></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="card-detail">
            <div className="tab-head-button">
              <div className={"btn-header " + (this.state.this_tab === 'all' ? 'active' : null)} onClick={this._clickDivision.bind(this, 'all')}>
                รวม
              </div>
              {this.state.div_division}
              <div className={"btn-header-add "} onClick={this._addDivision.bind(this)}>
                <i class="fa fa-plus" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className="card-budget">
            {this.state.card_budget}
          </div>
          <div className="card-detail" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-success btn-space" type="button" style={{ margin: 8 }} onClick={this._saveBudget.bind(this)}>Save</button>
            <button className="btn btn-danger btn-space" type="button" style={{ margin: 8 }}>Cancel</button>
          </div>
        </div>
        <Modal
          title="เพิ่มหน่วยงาน"
          visible={this.state.modal_division}
          onOk={this._addDivisionOk.bind(this)}
          onCancel={this._addDivisionCancel.bind(this)}
        >
          <div>
            <label>หน่วยงาน</label>
            <Select style={{ width: '100%' }}
              value={(this.state.state_division === '' ? '' : this.state.state_division.key)}
              showSearch
              onChange={this._optionDivisionChange.bind(this)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.division_option}
            </Select>
          </div>
        </Modal>
        <Modal
          title={'เพิ่มหมวดหมู่' + this.state.title_modal}
          visible={this.state.modal_topic}
          onOk={this._addModalOk.bind(this)}
          onCancel={this._addModalCancel.bind(this)}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div >
              <label>ประเภท</label>
              <input style={{ width: '100%', borderColor: '#333' }} type="text" value={this.state.title_modal} disabled />
            </div>
            <div>
              <label>ชื่อหมวดหมู่</label>
              <input style={{ width: '100%', border: '0.5px solid #333' }} type="text" value={this.state.modal_input} onChange={this._modalInputChange.bind(this)} />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default (BudgetUpdate);

