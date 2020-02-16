import classes from './Menu.module.css';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Logo from './Logo';

import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');
const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
//const mainurl = 'http://localhost:5000';//

class Menu extends Component {
    state = {
        loglink: '/login',
        logstatus: 'Login',
        signlink: '/signup',
        signstatus: 'Signup',
        email: '',
        token: undefined
    };

    componentDidMount() {
        const token = Cookies.get('jwttoken');
        var decodedtoken;
        try {
            decodedtoken = jwt.verify(token, 'heyphil123');
        } catch (err) {
            console.log(err);
        }
        if (decodedtoken) {
            this.setState({
                loglink: '/logout',
                logstatus: 'Logout',
                signlink: '/myideas',
                signstatus: 'Myideas',
                token: decodedtoken
            });
            //loggedin so re-render
        }
    }

    logout = () => {
        if (this.state.loglink === '/logout') {
            if (this.state.token) {
                //console.log('hey');
                Cookies.remove('jwttoken');
                this.setState({
                    loglink: '/login',
                    logstatus: 'Login',
                    signlink: '/signup',
                    signstatus: 'Signup',
                    token: undefined
                });
                this.props.history.push('/');
                //rerender
            }
        }
    }

    render() {
        //console.log(this.state);
        return (
            <div className={classes.Menustyle}>
                <ul className={classes.ul}>
                    <li className={classes.li}> <Link className={classes.links} to="/"> HOME </Link> </li>
                    <li className={classes.li}> <Link className={classes.links} onClick={this.logout} to={this.state.loglink}> {this.state.logstatus}</Link> </li>
                    <li className={classes.li}> <Link className={classes.links} to={this.state.signlink}> {this.state.signstatus} </Link> </li>
                    <li className={classes.li}> <Link className={classes.links} to="/addidea">ADD-IDEA </Link></li>
                </ul>
            </div>
        )
    }

};

export default Menu;