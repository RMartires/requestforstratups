import React, { Component } from 'react';
import Bulb from '../../assets/bulb.png';
import classes from './Navigator.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const mainurl = require('../../links');
class Navigator extends Component {

  state = {
    records: []
  };

  getallideas = () => {
    const ideasurl = mainurl + '/';
    fetch(ideasurl)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        console.log(resdata);
        this.props.setideas(resdata.ideas);
      })
      .catch(err => {
        console.log(err);
      });

  }

  orderideas(type) {
    fetch(mainurl + '/idea/orderideas/' + type)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.props.setideas(resdata.ideas);
        console.log(resdata);
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (
      <Container>
        <Navbar className={classes.container} fixed="top" expand="md" variant="light">
          <ul className={classes.ul}>
            <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'NEWEST')}> #NEWEST </a></li>
            <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'TRENDING')}> #TRENDING </a></li>
            <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'TOP')}> #TOP </a></li>
          </ul>
          <div className={classes.adds}>
            <Link to='/addidea' className={classes.links} >
              <button className={classes.addidea}>
                <EmojiObjectsIcon style={{ fontSize: 50 }} />
                    ADD-IDEA
                </button>
            </Link >
          </div>
        </Navbar>
      </Container>
    );
  }
}

export default Navigator;