/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SelectOffice.css';
import h from '../home/Home.css';
import NumberInput from '../numberInput';
import Message from '../../Components/Message';


class SelectOffice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filled: false,
      noPV: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const circOffice = this.props.circonscriptionOffice.length === 10 ? this.props.circonscriptionOffice.slice(1) : this.props.circonscriptionOffice;
    const office = Number.parseInt(circOffice+this.props.delegation+this.props.subDelegation+this.props.center+this.props.station,10);

    fetch('/api/Office/'+ office, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      if ( this.props.tocorrect === true ){
        this.setState({filled: false, noPV: false});
        this.props.officeChange(json, true);
      }
      else if( json.filled === 2 && this.props.tocorrect === false ){
        this.setState({filled: true, noPV: false});
      }
      else {
        this.setState({filled: false, noPV: false});
        this.props.officeChange(json, false);
      }

    })
    .catch((err) => {
      this.setState({
        noPV: true
      })
    });
  }

  handleChange(value, name){
    this.props.handleSearchInput(value, name);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={s.row}>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.props.station} maxLength="2" id="station" name="station" label="مكتب الاقتراع"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.props.center} maxLength="3" id="center" name="center" label="مركز الاقتراع"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.props.subDelegation} maxLength="2" id="subDelegation" name="subDelegation" label="العمادة"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.props.delegation} maxLength="2" id="delegation" name="delegation" label="المعتمدية"/>
          <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.props.circonscriptionOffice} maxLength="2" id="circonscription" name="circonscriptionOffice" label="الدائرة الانتخابية"/>
        </div>
        <div className={s.row}>
          <input type="submit" className={s.submit} value="إبحث" />
        </div>
        <div className={s.row}>
          <Message show={this.state.filled} text="Ce PV a déja été saisi 2 fois"/>
          <Message show={this.state.noPV} text="Veuillez verifier le numéro du PV"/>
        </div>
      </form>
    );
  }
}

export default withStyles(s)(SelectOffice);
