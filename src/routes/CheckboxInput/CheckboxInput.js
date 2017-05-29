/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import s from './CheckboxInput.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({isChecked: event.target.checked});
  }


  render() {
    return (
      <div className={`${s.formGroup} ${ this.props.className }`}>
        <input
          className={s.input}
          id={this.props.id}
          checked={this.state.isChecked}
          type="checkbox"
          name={this.props.name}
          onChange={this.handleChange}
        />
        <label className={s.label} htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default withStyles(s)(CheckboxInput);
