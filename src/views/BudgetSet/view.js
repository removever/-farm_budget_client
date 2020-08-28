import React, { Component } from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { NavLink } from 'react-router-dom';
import Loading from '../../component/loading';
import { Table } from 'antd';

import 'antd/dist/antd.css';
import BudgetModel from '../../models/BudgetModel';

const budget_model = new BudgetModel();
class NewsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      budget_approve: [],
      budget_waiting: [],
      budget_doing: [],
      budget_list: [],
      this_tab: 'waiting',
      pagination: {
        current: 1,
        pageSize: 10,
        total: 10
      },
      loading: true,
    };
  }
  async componentDidMount() {
    var budget_list = await budget_model.getBudgetBy();
    this.setState({
      budget_list: budget_list.data.result,
      loading: false
    });
  }
  render() {
    return (
      <div>
        <Loading showLoading={this.state.loading} />

        <div className="first-view">
          <div className="div-topic">
            <h2>ตั้งงบประมาณ</h2>
          </div>
          <div className="card-topic">
            <div style={{ flexGrow: 1 }}>
              <label style={{ fontSize: '1.3rem' }}>รายการตั้งงบประมาณ</label>
            </div>
            <div>
              <NavLink exact to={`/budget-set/insert/`} style={{ width: '100%' }}>
                <button className="btn btn-success"><i className="fa fa-plus"></i> ADD</button>
              </NavLink>
            </div>
          </div>
          <div className="card-detail">
            <div className="tab-head">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <span class="nav-link active" id="approve-tab" data-toggle="tab" href="#approve" role="tab" aria-controls="approve" aria-selected="true">อนุมัติแล้ว</span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" id="waiting-tab" data-toggle="tab" href="#waiting" role="tab" aria-controls="waiting" aria-selected="false">รออนุมัติ</span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" id="doing-tab" data-toggle="tab" href="#doing" role="tab" aria-controls="doing" aria-selected="false">กำลังจัดทำ</span>
                </li>
              </ul>
            </div>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="approve" role="tabpanel" aria-labelledby="approve-tab">
                <Table
                  columns={[
                    {
                      title: 'รายการตั้งงบประมาณ',
                      dataIndex: 'budget_name',
                    },
                    {
                      title: 'จัดการ',
                      dataIndex: '',
                      render: (cell, row) => {
                        return (
                          <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 32, paddingRight: 32 }}>
                            <div><i class="fa fa-search" aria-hidden="true"></i></div>
                            <div><NavLink exact to={`/budget-set/update/` + row.budget_code} style={{ width: '100%' }}><i class="fa fa-pencil-square-o" style={{ color: '#20a8d8' }} ></i></NavLink></div>
                            <div><i class="fa fa-trash" style={{ color: 'red' }}></i></div>
                          </div>
                        )
                      },
                    },
                  ]}
                  width="3%"
                  dataSource={this.state.budget_list}
                />
              </div>
              <div class="tab-pane fade" id="waiting" role="tabpanel" aria-labelledby="waiting-tab">
                <Table
                  columns={[
                    {
                      title: 'รายการตั้งงบประมาณ',
                      dataIndex: 'budget_name',
                    },
                    {
                      title: 'จัดการ',
                      dataIndex: '',
                      render: (cell, row) => {
                        return (
                          <div>
                            <span><i class="fa fa-pencil-square-o" style={{ color: '#20a8d8' }} ></i></span>
                            <span><i class="fa fa-trash" style={{ color: 'red' }}></i></span>
                          </div>
                        )
                      },
                    },
                  ]}
                  dataSource={this.state.budget_list}
                />
              </div>
              <div class="tab-pane fade" id="doing" role="tabpanel" aria-labelledby="doing-tab">
                <Table
                  columns={[
                    {
                      title: 'รายการตั้งงบประมาณ',
                      dataIndex: 'budget_name',
                    },
                    {
                      title: 'จัดการ',
                      dataIndex: '',
                      render: (cell, row) => {
                        return (
                          <div>
                            <span><i class="fa fa-pencil-square-o" style={{ color: '#20a8d8' }} ></i></span>
                            <span><i class="fa fa-trash" style={{ color: 'red' }}></i></span>
                          </div>
                        )
                      },
                    },
                  ]}
                  dataSource={this.state.budget_list}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default (NewsView);

