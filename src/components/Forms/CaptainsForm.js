import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';

export default class CaptainsForm extends Component {
  state = {
    teamCaptain1: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.warn('submitted');
  }

  render() {
    return (
      <div>
        <h2>Captain's Form</h2>
        <p>Props: {this.props.numTeams}</p>
        <div className="captainForm mx-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="teamCaptain1" sm={2}>Team 1 Captain</Label>
              <Col sm={8}>
                <Input type="text" name="teamCaptain1" id="teamCaptain1Id" value={this.state.teamCaptain1} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}
