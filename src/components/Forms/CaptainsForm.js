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
    addOrSubmit: 'add',
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
    TeamData.createTeam(this.state.arrCaptains);
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
      this.setState({
        addOrSubmit: 'submit',
      });
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

    const { addOrSubmit } = this.state;
    let showButton;
    let captainInput;

    switch (addOrSubmit) {
      case 'add':
        showButton = (
          <Button onClick={(e) => this.handleClickAddPlayer(e)}>Add Captain</Button>
        );

        captainInput = (
          <>
            <Label for="teamCaptain" sm={2}>Add Captain</Label>
            <Col sm={8}>
              <Input type="text" required name="teamCaptain" id="teamCaptain1Id" value={this.state.teamCaptain} onChange={this.handleChange} />
            </Col>
          </>
        );
        break;
      case 'submit':
        showButton = (
          <Button onClick={this.handleSubmit}>Submit</Button>
        );

        captainInput = (<> </>);
        break;
      default:
        console.warn('addOrSubmit state not found');
    }

    return (
      <div>
        {/* <p>Props: {this.state.numberOfTeams}</p> */}
        <div className="captainForm mx-5">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
                {captainInput}
            </FormGroup>
            <div className="captainButtons">
              {showButton}
            </div>
          </Form>
        </div>
        <div>
          <h4 className="mt-5">Captains</h4>
          <div>
            {this.state.arrCaptains.length === 0
              ? (<p>None added</p>)
              : (showCaptains())}
          </div>
        </div>
      </div>
    );
  }
}
