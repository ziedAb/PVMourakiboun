/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import Auth from '../../core/Auth';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(){
    Auth.deauthenticateUser();
  }

  render() {
    // const userEmail = localStorage.getItem('email');
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/">Nouveau PV</Link>
        <Link className={s.link} to="/suivi" >Suivi</Link>
        <span className={s.spacer}> | </span>
        <Link className={s.link} to="/stats" >Stats</Link>
        <span className={s.spacer}> | </span>
        {Auth.isUserAuthenticated() ? (
          <Link className={s.link} to="/login" onClick={this.logout} >{Auth.getUserEmail()} Log out</Link>
        ) : (
          <div className={s.linkContainer}>
            <Link className={s.link} to="/login">Log in</Link>
            <span className={s.spacer}>or</span>
            <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>
          </div>
        )}

      </div>
    );
  }
}

export default withStyles(s)(Navigation);
