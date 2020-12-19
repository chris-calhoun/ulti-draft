import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import StateDropdown from '../Dropdown/stateDropdown';
import LeagueData from '../../helpers/data/leagueData';

const DatePicker = require('reactstrap-date-picker');

export default class UpdateLeagueForm extends Component {
  state = {
    leagueObj: {
      firebaseKey: this.props.league?.firebaseKey || '',
      city: this.props?.league?.city || '',
      state: this.props?.league?.state || '',
      startDate: this.props?.league?.startDate || '',
      endDate: this.props?.league?.endDate || '',
      fieldAddress: this.props?.fieldAddress || '',
      leagueName: this.props?.leagueName || '',
      zipcode: this.props?.zipcode || '',
    },
  }

  // componentDidMount() {
  //   const userId = AuthData.getUid();
  //   const leagueCopy = this.state.leagueObj;
  //   leagueCopy.userId = userId;
  //   this.setState({
  //     leagueObj: leagueCopy,
  //   });
  // }

  handleChange = (e) => {
    const leagueCopy = this.state.leagueObj;
    leagueCopy[e.target.name] = e.target.value;

    this.setState({
      leagueObj: leagueCopy,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    LeagueData.updateLeague(this.state.leagueObj).then(() => {
      this.props.onUpdate(this.props.league.firebaseKey);
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
      <Button>Submit</Button>
    </Form>
    );
  }
}
