/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import s from './TextInput.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }


  render() {
    return (
      <div className={`${s.formGroup} ${ this.props.className }`}>
        <label className={s.label} htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          className={s.input}
          id={this.props.id}
          value={this.state.value}
          type="text"
          name={this.props.name}
          onChange={this.handleChange}
          placeholder="hhmm"
          autoComplete="off"
        />
      </div>
    );
  }
}

export default withStyles(s)(TextInput);
