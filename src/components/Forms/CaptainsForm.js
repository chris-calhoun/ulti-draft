import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
} from 'reactstrap';

export default class CaptainsForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.warn('submitted');
  }

  render() {
    return (
      <div>
        <h2>Captain's Form</h2>
        <p>Props: {this.props.numTeams}</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
