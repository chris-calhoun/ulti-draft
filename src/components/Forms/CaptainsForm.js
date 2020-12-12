import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';
import TeamData from '../../helpers/data/teamData';

export default class CaptainsForm extends Component {
  state = {
    teamCaptain: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    TeamData.createTeam(this.state);
  }

  createCaptainInputs = (numTeams) => {
    const numberOfTeams = parseInt(numTeams, 10);
    for (let i = 0; i < numberOfTeams; i + 1) {
      // create captain input for each team
    }
  }

  render() {
    return (
      <div>
        <h2>Captain's Form</h2>
        <p>Props: {this.props.numTeams}</p>
        <div className="captainForm mx-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="teamCaptain" sm={2}>Team 1 Captain</Label>
              <Col sm={8}>
                <Input type="text" name="teamCaptain" id="teamCaptain1Id" value={this.state.teamCaptain} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}
