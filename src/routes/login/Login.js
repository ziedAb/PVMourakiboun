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
import s from './Login.css';
import Auth from '../../core/Auth';
import history from '../../core/history';
import Message from '../../Components/Message';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // const storedMessage = localStorage.getItem('successMessage');
    // let successMessage = '';
    //
    // if (storedMessage) {
    //   successMessage = storedMessage;
    //   localStorage.removeItem('successMessage');
    // }
    let successMessage ='';
    this.state = {
      errors: {},
      errorMessage: false,
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        this.setState({
          errors: {},
          errorMessage : false
        });

        // save the token
        Auth.authenticateUser(xhr.response.token, email, xhr.response.user.id);
        // change the current URL to /
        history.push("/");
      } else {
        // failure
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errorMessage : true
        });
      }
    });
    xhr.send(formData);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p className={s.lead}>Log in with your email address.</p>
          <form method="post" onSubmit={this.processForm}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="email">
                email address:
              </label>
              <input
                className={s.input}
                id="email"
                type="text"
                onChange={this.changeUser}
                name="email"
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="password"
                name="password"
                onChange={this.changeUser}
              />
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
        <Message show={this.state.errorMessage}
        text="Veuillez vérifier vos identifiants de connexion"/>
      </div>
    );
  }
}

export default withStyles(s)(Login);
