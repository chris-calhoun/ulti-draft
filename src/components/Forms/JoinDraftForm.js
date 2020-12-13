import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';

export default class JoinDraftForm extends Component {
  state = {
    draftCode: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { draftCode } = this.state.draftCode;
    this.navigateToCaptainsForm(draftCode);
  }

  navigateToCaptainsForm = (draftCode) => {
    const { history } = this.props;
    if (history) {
      history.push({
        pathname: `./active-draft/${draftCode}`,
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='draftCode'
          value={this.state.name}
          onChange={this.handleChange}
          className='form-control form-control-lg m-1'
          required
          />
        <Button>submit</Button>
      </form>
    );
  }
}
