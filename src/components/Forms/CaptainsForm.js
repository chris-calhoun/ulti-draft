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
    if (this.state.arrCaptains.length < this.state.numberOfTeams) {
      const newCaptain = this.state.teamCaptain;
      this.setState({
        arrCaptains: [...this.state.arrCaptains, { teamCaptain: newCaptain }],
      });
      console.warn(this.state.arrCaptains);
    // once the prescribed number of captains are added, display submit button
    } else {
      console.warn('all captains have been added');
    }
    console.warn(this.state.arrCaptains);
  };

  render() {
    const showCaptains = () => (
      this.state.arrCaptains.map((captain) => <p>{captain.teamCaptain}</p>)
    );

    return (
      <div>
        <h2>Captain's Form</h2>
        <p>Props: {this.state.numberOfTeams}</p>
        <div className="captainForm mx-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="teamCaptain" sm={2}>Add Captain</Label>
              <Col sm={8}>
                <Input type="text" name="teamCaptain" id="teamCaptain1Id" value={this.state.teamCaptain} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <Button onClick={(e) => this.handleClickAddPlayer(e)}>Add Captain</Button>
          </Form>
        </div>
        <div>
          <h3>List of Names</h3>
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
