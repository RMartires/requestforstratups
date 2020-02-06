import React from 'react';
import './Login.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


const Login = () => {
    return (
        <div className="Loginstyle">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form action='http://localhost:5000/login' method='POST'>
                            <p className="h2 text-center mb-4">Login</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Type your email"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="email"
                                />
                                <MDBInput
                                    label="Type your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    name="password"
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit">Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}


export default Login;