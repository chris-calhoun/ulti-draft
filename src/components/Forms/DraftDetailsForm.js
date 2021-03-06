import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { CSVReader } from 'react-papaparse';
import StateDropdown from '../Dropdown/stateDropdown';
import TeamsDropdown from '../Dropdown/numTeamsDropdown';
import AuthData from '../../helpers/data/authData';
import LeagueData from '../../helpers/data/leagueData';
import PlayerData from '../../helpers/data/playerData';

const DatePicker = require('reactstrap-date-picker');

class DraftDetailsForm extends Component {
  state = {
    leagueObj: {
      firebaseKey: '',
      city: '',
      state: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      fieldAddress: '',
      leagueName: '',
      userId: '',
      zipcode: '',
      numTeams: '',
      isActive: false,
    },
    playerData: [],
  }

  componentDidMount() {
    const userId = AuthData.getUid();
    const leagueCopy = this.state.leagueObj;
    leagueCopy.userId = userId;
    this.setState({
      leagueObj: leagueCopy,
    });
  }

  handleChange = (e) => {
    const leagueCopy = this.state.leagueObj;
    leagueCopy[e.target.name] = e.target.value;

    this.setState({
      leagueObj: leagueCopy,
    });
  }

  navigateToCaptainsForm = (fbKey) => {
    const { history } = this.props;
    if (history) {
      history.push({
        pathname: './captains',
        state: {
          leagueObj: {
            numTeams: parseInt(this.state.leagueObj.numTeams, 10),
            fbKey,
          },
        },
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { playerData } = this.state;

    LeagueData.createLeague(this.state.leagueObj).then((response) => {
      playerData.forEach((player) => {
        const currentPlayer = player;
        currentPlayer.data.leagueId = response.data.firebaseKey;
        currentPlayer.data.available = true;
        PlayerData.createPlayer(currentPlayer);
      });
      this.navigateToCaptainsForm(response.data.firebaseKey);
    });
  }

  handleStartDateChange(value, formattedValue) {
    const leagueCopy = this.state.leagueObj;
    leagueCopy.startDate = value;
    leagueCopy.startDateF = formattedValue;
    this.setState({
      leagueObj: leagueCopy,
    });
  }

  handleEndDateChange(value, formattedValue) {
    const leagueCopy = this.state.leagueObj;
    leagueCopy.endDate = value;
    leagueCopy.endDateF = formattedValue;
    this.setState({
      leagueObj: leagueCopy,
    });
  }

  // papa-parse
  handleOnDrop = (data) => {
    this.setState({
      playerData: data,
    });
  }

  handleOnError = (err) => {
    console.warn(err);
  }

  handleOnRemoveFile = (data) => {
    console.warn('---------------------------');
    console.warn(data);
    console.warn('---------------------------');
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="mb-5">
      <Row form>
        <Col>
          <FormGroup>
            <Label htmlFor="leagueName">League Name</Label>
            <Input type="text" name="leagueName" id="leagueNameId" placeholder="Nashville Indoor League" value={this.state.leagueObj.leagueName} onChange={this.handleChange} />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label htmlFor="fieldAddress">Field Address</Label>
        <Input type="text" name="fieldAddress" id="addressId" placeholder="2500 West End Ave." value={this.state.leagueObj.address} onChange={this.handleChange}/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input type="text" name="city" id="cityId" placeholder="Nashville" value={this.state.leagueObj.city} onChange={this.handleChange}/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <StateDropdown onChange={this.handleChange}/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label htmlFor="zipcode">Zip</Label>
            <Input type="text" name="zipcode" id="zipcodeId" placeholder="37203" value={this.state.leagueObj.zipcode} onChange={this.handleChange}/>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Start Date</Label>
              <DatePicker name="startDate" value={this.state.leagueObj.startDate} onChange={(v, f) => this.handleStartDateChange(v, f)} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>End Date</Label>
              <DatePicker name="endDate" value={this.state.leagueObj.endDate} onChange={(v, f) => this.handleEndDateChange(v, f)} />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <TeamsDropdown onChange={this.handleChange}/>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          noDrag
          style={{}}
          config={{ header: true }}
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Click to Upload</span>
        </CSVReader>
        <FormText color="muted">
          Please add a CSV file containing a list of the names of players who have signed up for your league.
        </FormText>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
    );
  }
}

export default withRouter(DraftDetailsForm);
