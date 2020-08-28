import React, { Component } from 'react';
import Swal from 'sweetalert2'

// import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import UserModel from '../../models/UserModel';
import BaseModel from '../../models/BaseModel';
const base_model = new BaseModel();
const user_model = new UserModel();
class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fireRedirect: false
    }
  }
  async componentDidMount() {

  }

  async handleSubmit(event) {
    event.preventDefault();
    var arr = {};
    var user_username = document.getElementById("user_username").value;
    var user_password = document.getElementById("user_password").value;
    if (user_username === '') {
      Swal.fire({
        title: "Warning!",
        text: "Please Check Your Username ",
        icon: "warning",
        button: "Close",
      });

    } else if (user_password === '') {
      Swal.fire({
        title: "Warning!",
        text: "Please Check Your Password ",
        icon: "warning",
        button: "Close",
      });
    } else {
      // console.log("xx");
      arr['user_username'] = user_username;
      arr['user_password'] = user_password;
      const user_login = await user_model.getLogin(arr);
      if (user_login.data.result.length > 0) {
        localStorage.setItem('x-access-token', user_login['access_token']);
        localStorage.setItem('user_login', JSON.stringify(user_login.data.result[0]));
        base_model.setToken(user_login['access_token']);
        window.location.href = "/user";
      }
      else {
        Swal.fire({
          title: "Warning!",
          text: "Please Check Your  Username  Or Password ",
          icon: "warning",
          button: "Close",
        });

      }
    }

  }
  render() {


    return (

      <form onSubmit={this.handleSubmit} id="myForm" style={{ backgroundColor: '#212121' }}>
        <div>
          {/* <Container className="flex-login"> */}
          <div className="justify-content-center">
            <div md="6">
              <div>
                <div className="p-4  background-login-card">
                  <div>
                    <h1>Login Test Ci/Cd !!!Developpppp</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div className="mb-3">
                      <div addonType="prepend">
                        <div>
                          <i className="fa fa-user-o"></i>
                        </div>
                      </div>
                      <input type="text" id="user_username" name="user_username" placeholder="Username" aria-describedby="inputGroupPrepend21" />
                    </div>
                    <div className="mb-4">
                      <div addonType="prepend">
                        <div>
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <input type="password" id="user_password" name="user_password" placeholder="Password" />
                    </div>
                    <div>
                      <div xs="6">
                        <button color="primary" id="login_btn" name="login_btn" className="px-4"  >Login</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </Container> */}
        </div>
      </form>
    );
  }
}


export default Login;

