import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import TeamData from '../../helpers/data/teamData';
import LeagueTeamData from '../../helpers/data/leagueTeamsData';

class CaptainsForm extends Component {
  state = {
    numberOfTeams: '',
    teamCaptain: '',
    leagueFireBK: '',
    arrCaptains: [],
    addOrSubmit: 'add',
  };

  componentDidMount() {
    const { numTeams, fbKey } = this.props.location.state.leagueObj;
    const numberOfTeams = numTeams;
    const leagueFireBK = fbKey;
    this.setState({
      numberOfTeams,
      leagueFireBK,
    });
  }

  navigateToDraft = () => {
    const { history } = this.props;
    const { leagueFireBK } = this.state;
    if (history) {
      history.push({
        pathname: `/active-draft/${leagueFireBK}`,
        state: {
          arrCaptains: this.state.arrCaptains,
        },
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { arrCaptains, leagueFireBK } = this.state;

    arrCaptains.forEach((team) => {
      TeamData.createTeam(team)
        .then((response) => {
          const teamFBKey = response.data.firebaseKey;
          // console.warn(response.data.leagueFireBK);
          LeagueTeamData.createLeagueTeamJoin(teamFBKey, leagueFireBK);
        });
    });
    // console.warn(response.data.firebaseKey);
    this.navigateToDraft();
  }

  handleClickAddPlayer = (e) => {
    e.preventDefault();
    const numCaptainsAdded = this.state.arrCaptains.length + 1;
    // console.warn('# of caps: ', numCaptainsAdded);
    // console.warn('# of teams: ', this.state.numberOfTeams);
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
      this.state.arrCaptains.map((captain, key) => <p key={key}>{captain.teamCaptain}</p>)
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
            <Label htmlFor="teamCaptain" sm={2}>Add Captain</Label>
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

export default withRouter(CaptainsForm);
