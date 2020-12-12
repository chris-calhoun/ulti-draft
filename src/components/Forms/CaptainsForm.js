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
    numberOfTeams: '',
  };

  componentDidMount() {
    const numberOfTeams = this.props.numTeams;
    this.setState({
      numberOfTeams,
    });
  }

  createCaptainInputs = (e) => {
    e.preventDefault();
    // const arr = [];
    // for (let i = 1; i <= nTeams; i + 1) {
    //   arr.push(i);
    // }
    console.warn('clicked', this.state.numberOfTeams);
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

  render() {
    // const { numTeams } = this.state.numberOfTeams;
    // console.warn('number', this.state.numberOfTeams);
    // this.createCaptainInputs(numTeams);
    return (
      <div>
        <h2>Captain's Form</h2>
        <p>Props: {this.props.numTeams}</p>
        <div className="captainForm mx-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="teamCaptain" sm={2}>Add Captain</Label>
              <Col sm={8}>
                <Input type="text" name="teamCaptain" id="teamCaptain1Id" value={this.state.teamCaptain} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <Button onClick={(e) => this.createCaptainInputs(e)}>Add Captain</Button>
          </Form>
        </div>
      </div>
    );
  }
}
