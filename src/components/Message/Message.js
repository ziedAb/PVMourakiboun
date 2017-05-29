/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Message.css';

class Message extends React.Component {
  render() {
    if (this.props.show === true){
      return <h1 className={s.message}>{this.props.text}</h1>;
    }
    return null;
  }
}

export default withStyles(s)(Message);
