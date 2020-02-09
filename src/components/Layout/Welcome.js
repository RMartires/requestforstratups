import React, { Component } from 'react';
import './Welcome.css';
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";




class Welcome extends Component {
  state = {
    collapseID: "",
    redords: []
  };

  componentDidMount() {
    const url = 'http://localhost:5000/';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.setState({ redords: resdata.recordlist });
        console.log(this.state.redords);
      })
      .catch(err => {
        console.log(err);
      });
  }

  upvotebutton = recordid => {
    const url = "http://localhost:5000/idea/upvote/" + recordid;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        var { record } = resdata;
        var { id } = record;
        this.state.redords.forEach(record => {
          if (record.id === id) {
            record.id = id;
            console.log(record.id);
          }
        });

      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("navbarCollapse")}
      />
    );
    return (
      <div id="classicformpage">


        <MDBView>

          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>

                <MDBAnimation
                  type="fadeInLeft"
                  delay=".3s"
                  className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                >
                  <h1 className="h1-responsive font-weight-bold">
                    Welcome To Request For Startups
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    "Bad shit is coming. It always is in a startup. The odds of getting from launch to liquidity without some kind of disaster happening are one in a thousand. So don't get demoralized."--Paul Graham, co-founder of Y Combinator
                  <br />
                    <br />
                    <br />
                    Please Sign-Up to Add Your startup Idea
                  </h6>
                </MDBAnimation>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}


export default Welcome;