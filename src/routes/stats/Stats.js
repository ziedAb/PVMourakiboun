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
import s from './Stats.css';
import history from '../../core/history';
import _ from 'lodash';
import Auth from '../../core/Auth';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circonscriptions : {},
      circSelect : "",
      unfilledNumber : "",
      unfilledObject : {},
      oneTimeFilledNumber : "",
      oneTimeFilledObject : {},
      errorFilledNumber : "",
      errorFilledObject : {},
      allPVSNumber : "",
      allPVSObject : {},
      csvURL : ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.redirectPV = this.redirectPV.bind(this);
    this.pvExtract = this.pvExtract.bind(this);
  }

  componentDidMount(){
    if (Auth.isUserAuthenticated()){
      fetch('/api/Circonscription', {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      })
      .then(res => res.json())
      .then((json) => {
        this.setState({
          circonscriptions : json
        });
      })
      .catch((err) => {
        console.error(err);
      });
    }
    else{
      history.push("/login");
    }
  }

  pvExtract(){
    let items = this.state.allPVSObject;
    let newArray = [],
        index = 0;

    if (items.length > 0){
      // clean data
      items = _.uniqBy(items, 'office');

      for(let i of items) {
        delete i.filledBy; delete i._id; delete i.__v; delete i.inserted;
        const off = i.office.toString().length === 10 ? ("0" + i.office.toString()) : i.office.toString(),
              circonscriptionId = off.substr(0,2),
              delegationId = off.substr(2,2),
              subDelegationId = off.substr(4,2),
              centerID = off.substr(6,3),
              stationId = off.substr(9,2),
              numberOfKeys = Object.keys(i).length ;

        newArray.push({
          "circonscriptionId": circonscriptionId,
          "delegationId": delegationId,
          "subDelegationId": subDelegationId,
          "centerID": centerID,
          "stationId": stationId,
          "registeredVoters": i.registeredVoters,
          "aSigningVoters": i.aSigningVoters,
          "bDeliveredBallots": i.bDeliveredBallots,
          "cSpoiledBallots": i.cSpoiledBallots,
          "dLeftBallots": i.dLeftBallots,
          "eCplusD": i.eCplusD,
          "fExtractedBallots": i.fExtractedBallots,
          "gEplusF": i.gEplusF,
          "hBminusG": i.hBminusG,
          "iAminusF": i.iAminusF,
          "jListVotes": i.jListVotes,
          "kCancelledVotes": i.kCancelledVotes,
          "lBlankVotes": i.lBlankVotes,
          "mJplusKplusL": i.mJplusKplusL,
          "nFminusM": i.nFminusM,
          "countingStart": i.countingStart,
          "countingEnd": i.countingEnd,
          "tampon": i.tampon
        });
        for(let x=15; x<numberOfKeys-5 ; x++) {
          newArray[index][Object.keys(i)[x]]= i[Object.keys(i)[x]] ;
        }
        index++;
      }

      const replacer = (key, value) => value === null ? '' : value ;// specify how you want to handle null values here
      const header = Object.keys(newArray[0]);
      let csv = newArray.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
      csv.unshift(header.join(','));
      csv = csv.join('\r\n');
      return csv;
    }
  }

  handleSubmit(e){
    e.preventDefault();
    // get unfilled PVs
    const circSelect = this.state.circSelect;
    fetch('/api/Rout/' + circSelect, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        unfilledNumber : json.length,
        unfilledObject : json
      });
    })
    .catch((err) => {
      console.error(err);
    });

    // get 1 time filled PVs
    fetch('/api/Stats/' + circSelect + "/1", {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        oneTimeFilledNumber : json.length,
        oneTimeFilledObject : json
      });
    })
    .catch((err) => {
      console.error(err);
    });

    // get all PVs in circonscription
    fetch('/api/PVcirc/' + circSelect , {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        allPVSNumber : json.length,
        allPVSObject : json
      });
    })
    .then(() => {
      this.setState({
        csvURL : 'data:application/csv;charset=utf-8,' +  encodeURIComponent(this.pvExtract())
      });
    })
    .catch((err) => {
      console.error(err);
    });

    // get erronated PVs
    fetch('/api/OfficeError/' + circSelect, {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({
        errorFilledNumber : json.length,
        errorFilledObject : json
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  handleSelect(e){
    this.setState({
      circSelect : e.target.value
    });
  }

  redirectPV(e, tocorrect){
    e.preventDefault();
    const off = e.target.textContent.replace(/\s/g, '').length === 10 ? "0" + e.target.textContent.replace(/\s/g, '') : e.target.textContent.replace(/\s/g, '') ,
          circonscriptionOffice = off.substr(0,2),
          delegation = off.substr(2,2),
          subDelegation = off.substr(4,2),
          center = off.substr(6,3),
          station = off.substr(9,2);
    // save in localStorage
    localStorage.setItem('circonscriptionOffice', circonscriptionOffice);
    localStorage.setItem('delegation', delegation);
    localStorage.setItem('subDelegation', subDelegation);
    localStorage.setItem('center', center);
    localStorage.setItem('station', station);
    localStorage.setItem('tocorrect', tocorrect);

    history.push('/');
  }

  render() {
    // array of circonscriptions
    const arr = this.state.circonscriptions;
    var list = Object.keys(arr).map((key, index) => {
      return <option key={ index + 1 } value={arr[key].name}> {arr[key].name} </option>
    });
    // array of unfilled Objects
    const unfilledObject = this.state.unfilledObject;
    var listUnfilled = Object.keys(unfilledObject).map((key, index) => {
      return <span key={ index + 1 } className={`${ s.col } ${ s.oneTen }`}> {unfilledObject[key].number} </span>
    });
    // array of one time filled objects
    const oneTimeFilledObject = this.state.oneTimeFilledObject;
    var listOneTimeFilled = Object.keys(oneTimeFilledObject).map((key, index) => {
      return <span onClick={(e) => this.redirectPV(e, false)} key={ index + 1 } className={`${ s.col } ${ s.oneTen } ${ s.tocorrect }`}> {oneTimeFilledObject[key].number} </span>
    });
    // array of objects with errors
    const errorFilledObject = this.state.errorFilledObject;
    var listerrorFilled = Object.keys(errorFilledObject).map((key, index) => {
      return <span onClick={(e) => this.redirectPV(e, true)} key={ index + 1 } className={`${ s.col } ${ s.oneTen } ${ s.tocorrect }`}> {errorFilledObject[key].number} </span>
    });

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <form onSubmit={this.handleSubmit}>
            <div className={`${ s.row } ${ s.ltr }`}>

              <div className={`${ s.col } ${ s.oneThird }`}>
                <select className={`${s.select}`} onChange={this.handleSelect}>
                  <option default>Choisissez la circonscription</option>
                  {list}
                </select>
              </div>

              <span className={`${ s.col } ${ s.oneThird } `}>
                <input type="submit" className={s.submit} value="rechercher" />
              </span>

              <span className={`${ s.col } ${ s.oneThird } `}>
                <a href={ this.state.csvURL } className={`${ s.submit } ${ s.extract } `} target='_blank' download={`${ this.state.circSelect }.csv`} > Extraire PV remplis </a>
              </span>
            </div>

            <div className={`${ s.row } ${s.ltr}`} >
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> PVs manquants -  {this.state.unfilledNumber}</span>
            </div>
            <div className={`${ s.row } ${s.ltr}`} >
              {listUnfilled}
            </div>

            <div className={`${ s.row } ${s.ltr}`} >
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> PVs à resaisir une fois -  {this.state.oneTimeFilledNumber}</span>
            </div>
            <div className={`${ s.row } ${s.ltr}`} >
              {listOneTimeFilled}
            </div>

            <div className={`${ s.row } ${s.ltr}`} >
              <span className={`${ s.col } ${ s.oneThird } ${s.ltr} ${s.head}`}> PVs erronés -  {this.state.errorFilledNumber}</span>
            </div>
            <div className={`${ s.row } ${s.ltr}`} >
              {listerrorFilled}
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Stats);
