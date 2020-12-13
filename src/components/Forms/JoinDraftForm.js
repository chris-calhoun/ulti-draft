import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

class JoinDraftForm extends Component {
  state = {
    draftCode: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  navigateToDraft = (draftCode) => {
    const { history } = this.props;
    if (history) {
      history.push({
        pathname: `./active-draft/${draftCode}`,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { draftCode } = this.state;
    this.navigateToDraft(draftCode);
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
          <div className="d-flex justify-content-center mt-3">
            <Button>submit</Button>
          </div>
      </form>
    );
  }
}

export default withRouter(JoinDraftForm);
