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
import DatePicker from '../DatePicker';
import StateDropdown from '../Dropdown/stateDropdown';
import TeamsDropdown from '../Dropdown/numTeamsDropdown';
import AuthData from '../../helpers/data/authData';
import LeagueData from '../../helpers/data/leagueData';

export default class DraftDetailsForm extends Component {
  state = {
    firebaseKey: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    fieldAddress: '',
    leagueName: '',
    userId: '',
    zipcode: '',
    numTeams: '',
  }

  componentDidMount() {
    const userId = AuthData.getUid();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    LeagueData.createLeague(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
      <Row form>
        <Col>
          <FormGroup>
            <Label for="leagueName">League Name</Label>
            <Input type="text" name="leagueName" id="leagueNameId" placeholder="Nashville Indoor League" value={this.state.leagueName} onChange={this.handleChange} />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="fieldAddress">Field Address</Label>
        <Input type="text" name="fieldAddress" id="addressId" placeholder="2500 West End Ave." value={this.state.address} onChange={this.handleChange}/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="cityId" placeholder="Nashville" value={this.state.city} onChange={this.handleChange}/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <StateDropdown />
            {/* <Label for="exampleState">State</Label>
            <Input type="text" name="state" id="exampleState" placeholder="TN"/> */}
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="zipcode">Zip</Label>
            <Input type="text" name="zipcode" id="zipcodeId" placeholder="37203" value={this.state.zipcode} onChange={this.handleChange}/>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Row>
          <Col md={6}>
            <DatePicker title={'Start Date'}/>
          </Col>
          <Col md={6}>
            <DatePicker title={'End Date'}/>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <TeamsDropdown name="numTeams" value={this.state.numTeams} onChange={this.handleChange}/>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for="csvFile">Add CSV File</Label>
          <Input type="file" name="csvFile" id="csvFileId" />
        <FormText color="muted">
          Please add a CSV file containing a list of the names of players who have signed up for your league.
        </FormText>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
    );
  }
}
