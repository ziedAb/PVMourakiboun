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
import s from './Parties.css';
import NumberInput from '../numberInput';

class Parties extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.list != undefined){
      var list = this.props.list.map((item, index) => {
        return <NumberInput className={`${ s.col } ${ s.oneThird } ${s.marginRow}`} key={ index + 1 } index={ index + 1 } label={item.name}/>
      });
      return <div className={s.partiesContainer}>{list}</div>;
    }
    return null;
  }
}

//   render() {
//     return (
//       <div className={s.row}>
//         <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.station} maxLength="2" id="station" name="station" label="مكتب الاقتراع"/>
//         <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.center} maxLength="3" id="center" name="center" label="مركز الاقتراع"/>
//         <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.subDelegation} maxLength="2" id="subDelegation" name="subDelegation" label="العمادة"/>
//         <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.delegation} maxLength="2" id="delegation" name="delegation" label="المعتمدية"/>
//         <NumberInput className={`${ s.col } ${ s.oneFifth }`} onChange={this.handleChange} value={this.state.circonscription} maxLength="2" id="circonscription" name="circonscription" label="الدائرة الانتخابية"/>
//       </div>
//     );
//   }
// }

export default withStyles(s)(Parties);
