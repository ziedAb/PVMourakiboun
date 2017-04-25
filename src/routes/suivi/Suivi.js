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
import s from './Suivi.css';

class Suivi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userStats : {}
    }
  }

  componentDidMount(){
    fetch('/api/Suivi/', {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        userStats : json
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    const arr = this.state.userStats;
    if (arr != undefined){
      var list = Object.keys(arr).map(function(key, index) {
          return (
            <div className={`${ s.row } ${s.ltr}`} key={index}>
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr}`}> {key} </span>
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr}`}> {arr[key]} </span>
            </div>
          );
      });
      return (
        <div className={s.root}>
          <div className={s.container}>
            <h1>{this.props.title}</h1>
            <div >
              <div className={`${ s.row } ${s.ltr}`} >
                <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> Utilisateur </span>
                <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> Nombre de PV saisi </span> 
              </div>
              {list}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default withStyles(s)(Suivi);
