import React, { Component } from 'react';
/*import './SignUp.css';*/
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = e => {
    const inputId = e.target.name;
    const value = e.target.value;
    this.setState({ [inputId]: value })
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form action="http://localhost:5000/signup" method="POST">
                <p className="h2 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  <input type="text" id="username" name="username" placeholder="username" />
                  <input type="email" id="email" name="email" placeholder="email" />
                  <input type="password" id="password" name="password" placeholder="password" />
                  <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirmpassword" />
                </div>
                <button type="submit">SignUp</button>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div >
    )
  }

};

export default SignUp;