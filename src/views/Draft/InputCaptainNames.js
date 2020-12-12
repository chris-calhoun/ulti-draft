// import React, { Component } from 'react';
// import CaptainsForm from '../../components/Forms/CaptainsForm';

// export default class InputCaptainNames extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Captain Names</h1>
//         <div className='captainForm'>
//           <CaptainsForm numTeams={this.props.location.state.numTeams}/>
//         </div>
//       </div>
//     );
//   }
// }
import React from 'react';
import CaptainsForm from '../../components/Forms/CaptainsForm';

export default function InputCaptainNames(props) {
  return (
      <div>
        <h1>Captain Names</h1>
        <div className='captainForm'>
          <CaptainsForm numTeams={props.location.state.numTeams}/>
        </div>
      </div>
  );
}
