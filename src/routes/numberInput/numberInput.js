/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import s from './numberInput.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class numberInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.value.length <= this.props.maxLength){
      this.props.onChange(event.target.value, event.target.name);
    }
  }


  render() {
    return (
      <div className={`${s.formGroup} ${ this.props.className }`}>
        <label className={s.label} htmlFor={this.props.id}>
          {this.props.index}- {this.props.label}
        </label>
        <input
          className={s.input}
          id={this.props.id}
          value={this.props.value}
          type="number"
          name={this.props.name}
          label={this.props.label}
          onChange={this.handleChange}
          autoComplete="off"
          required
        />
      </div>
    );
  }
}

export default withStyles(s)(numberInput);
