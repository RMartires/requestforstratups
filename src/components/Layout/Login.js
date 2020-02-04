import React from 'react';
import './Login.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


const Login = () => {
  return (
    <div className="Loginstyle">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form action="http://localhost:5000/login" method="POST">
              <p className="h2 text-center mb-4">Login up</p>
              <div className="grey-text">
                <input class="form-control" type="email" id="email" name="email" placeholder="email" />
                <input class="form-control" type="password" id="password" name="password" placeholder="password" />
              </div>
              <button type="submit">SignUp</button>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}


export default Login;