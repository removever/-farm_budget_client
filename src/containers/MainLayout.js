import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';

// import { Container, Label } from 'reactstrap';
import logo from '../assets/img/revel-soft-logo-new.png'
import routes from '../routes';
class DefaultLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      active_manu: '',
      user_login: JSON.parse(localStorage.getItem('user_login'))
    }
  }
  async componentDidMount() {

  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      console.log("ss", nextProps)
      this.setState({
        active_manu: nextProps.location.pathname
      })
    }

  }

  onLogout(e) {
    e.preventDefault()
    localStorage.clear();
    window.location.reload()
  }

  showMenu(e) {
    e.preventDefault();
    this.setState({
      toggled: !this.state.toggled
    })
  }

  render() {
    const { user_login } = this.state
    return (
      <div className="app">
        <div className="app-header navbar">
          <div className="app-header-sub" >
            <a className="active div-logo" href="#/" >
              <img src={logo} alt="Ravel Soft Logo" className="navbar-brand-full img-logo" />
            </a>
            <div className="on-logo" >
              <div className="text-logo">
                <strong >SUT FARM </strong>
              </div>
              <div>
                <button className="navbar-toggler" type="button" onClick={e => this.showMenu(e)}>
                  <span className="fa fa-bars"></span>
                </button>
              </div>
            </div>
            <ul className="ml-auto navbar-nav" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingRight: '50px' }}>

              <div >
                <li className="nav-item dropdown">
                  <a href="#/" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    {user_login !== null ? user_login.user_name + '  ' + user_login.user_lastname : null}
                    <i className="fa fa-user"></i>
                  </a>
                  <div className="dropdown-menu">
                    <button type="button" className="dropdown-item" onClick={e => this.onLogout(e)}><i className="fa fa-lock"></i>  Logout</button>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className={"d-flex " + (this.state.toggled ? "" : "toggled")} id="wrapper">
          {/* <------Menu------> */}
          <div id="sidebar-wrapper">
            <div className="sidebar-manu-top">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.2rem' }}>ERP</div>
                <div>Enterprise Resource Planning</div>
              </div>
            </div>
            {/* <div className="sidebar-heading"> </div> */}
            <div className="list-group list-group-flush">
              <div className="scrollbar-container">
                {/* <div className="sidebar-heading sidebar-manu" > Menu </div> */}
                <div style={{ backgroundColor: '#66c009', color: '#fff', padding: 16, height: 50 }}>งบประมาณ</div>
                <div className="sidebar-manu-lsit">
                  <Link to="/budget-set" className={"list-group-item list-group-item-action  sidebar-list" + (this.state.active_manu.search('/budget-set') === 0 ? ' active' : '')}>
                    <i className="fa fa-user-circle-o"></i>
                    <label className="sidebar-manu-lsit-text"> ตั้งงบประมาณ </label>
                  </Link>
                  <Link to="/customer" className={"list-group-item list-group-item-action  sidebar-list" + (this.state.active_manu.search('/news') === 0 ? ' active' : '')}>
                    <i className="fa fa-newspaper-o"></i>
                    <label className="sidebar-manu-lsit-text"> ลูกค้า </label>
                  </Link>
                  <Link to="/devision" className={"list-group-item list-group-item-action  sidebar-list" + (this.state.active_manu.search('/shop') === 0 ? ' active' : '')}>
                    <i className="fa fa-shopping-cart"></i>
                    <label className="sidebar-manu-lsit-text"> หน่วยงาน </label>
                  </Link>
                </div>

              </div>
            </div>
          </div>
          {/* <------Menu------> */}
          {/* <------Content------> */}
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <main className="main">
                {/* <Container fluid> */}
                <Suspense fallback={null}>
                  <Switch>
                    {routes.map((route, idx) => {
                      console.log("route", route)
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                      ) : (null);
                    })}
                    <Redirect from="/" to="/" />
                  </Switch>
                </Suspense>
                {/* </Container> */}
              </main>
            </div>
          </div>
          {/* <------Content------> */}
        </div>
      </div>
    );
  }
}



export default DefaultLayout;

