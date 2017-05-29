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
import s from './Home.css';
import GeneratedForm from '../GeneratedForm';
import SelectOffice from '../SelectOffice';
import history from '../../core/history';
import Auth from '../../core/Auth';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      tocorrect: false,
      station_name: "",
      circonscription: "",
      circonscriptionObject:{},
      officeObject: {},
      circonscriptionOffice: '',
      delegation: '',
      subDelegation: '',
      center: '',
      station: ''
    }

    this.updateStates = this.updateStates.bind(this);
    this.handleOfficeChange = this.handleOfficeChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount(){
    if (Auth.isUserAuthenticated()){
      if (localStorage.center !== undefined){
        this.setState({
          circonscriptionOffice: localStorage.circonscriptionOffice,
          delegation: localStorage.delegation,
          subDelegation: localStorage.subDelegation,
          center: localStorage.center,
          station: localStorage.station,
          tocorrect : localStorage.tocorrect == 'true' ? true : false
        });

        //clean localStorage
        localStorage.removeItem('circonscriptionOffice');
        localStorage.removeItem('delegation');
        localStorage.removeItem('subDelegation');
        localStorage.removeItem('center');
        localStorage.removeItem('station');
        localStorage.removeItem('tocorrect');
      }
    }
    else{
      history.push("/login");
    }
  }

  handleSearchInput(value, name){
    this.setState({ [name]: value });
  }

  updateStates(show, tocorrect){
    this.setState({
      showForm: show,
      tocorrect: tocorrect
    });
  }

  handleOfficeChange(office, tocorrect){
    fetch('/api/Circonscription/' + office.circonscription , {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        showForm: true,
        station_name:office.station_name,
        circonscription: office.circonscription,
        circonscriptionObject: json,
        officeObject: office
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.sectionTitle}>مركز الاقتراع</h1>
          <SelectOffice officeChange={this.handleOfficeChange}
            handleSearchInput = {this.handleSearchInput}
            circonscriptionOffice =  {this.state.circonscriptionOffice}
            delegation = {this.state.delegation}
            subDelegation = {this.state.subDelegation}
            center = {this.state.center}
            station = {this.state.station}
            tocorrect={this.state.tocorrect}/>
        </div>

        <GeneratedForm station_name={this.state.station_name}
        circonscription={this.state.circonscription}
        circonscriptionObject={this.state.circonscriptionObject}
        showForm={this.state.showForm}
        tocorrect={this.state.tocorrect}
        updateStates = {this.updateStates}
        office = {this.state.officeObject} />
      </div>
    );
  }
}

export default withStyles(s)(Home);
