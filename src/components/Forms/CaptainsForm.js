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
    numberOfTeams: '',
    teamCaptain: '',
    arrCaptains: [],
  };

  componentDidMount() {
    const numberOfTeams = this.props.numTeams;
    this.setState({
      numberOfTeams,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    TeamData.createTeam(this.state);
  }

  handleClickAddPlayer = (e) => {
    e.preventDefault();
    // if the number of captains is less than the number of teams the user chose
    const numCaptainsAdded = this.state.arrCaptains.length + 1;
    console.warn('# of caps: ', numCaptainsAdded);
    console.warn('# of teams: ', this.state.numberOfTeams);
    if (numCaptainsAdded === this.state.numberOfTeams) {
      const lastCaptain = this.state.teamCaptain;
      this.setState({
        arrCaptains: [...this.state.arrCaptains, { teamCaptain: lastCaptain }],
        teamCaptain: '',
      });
      // change add button to submit button
      console.warn('change add button to submit');
    } else {
      const newCaptain = this.state.teamCaptain;
      this.setState({
        arrCaptains: [...this.state.arrCaptains, { teamCaptain: newCaptain }],
        teamCaptain: '',
      });
    }
  };

  render() {
    const showCaptains = () => (
      this.state.arrCaptains.map((captain) => <p>{captain.teamCaptain}</p>)
    );

    return (
      <div>
        <p>Props: {this.state.numberOfTeams}</p>
        <div className="captainForm mx-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="teamCaptain" sm={2}>Add Captain</Label>
              <Col sm={8}>
                <Input type="text" name="teamCaptain" id="teamCaptain1Id" value={this.state.teamCaptain} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <div className="captainButtons">
              <Button onClick={(e) => this.handleClickAddPlayer(e)}>Add Captain</Button>
            </div>
          </Form>
        </div>
        <div>
          <h4 className="mt-5">List of Names</h4>
          <div>
            {this.state.arrCaptains.length === 0
              ? (<p>no captains</p>)
              : (showCaptains())}
          </div>
        </div>
      </div>
    );
  }
}
