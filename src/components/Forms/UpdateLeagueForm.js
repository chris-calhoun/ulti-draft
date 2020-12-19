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
import LeagueData from '../../helpers/data/leagueData';

const DatePicker = require('reactstrap-date-picker');

export default class UpdateLeagueForm extends Component {
  state = {
    leagueObj: {
      firebaseKey: this.props.league?.firebaseKey || '',
      startDate: this.props.league?.startDate || '',
      endDate: this.props.league?.endDate || '',
      fieldAddress: this.props.league?.fieldAddress || '',
      leagueName: this.props.league?.leagueName || '',
    },
  }

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
    this.props.toggle();
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
            <Input type="text" name="leagueName" id="leagueNameId" value={this.state.leagueObj.leagueName} onChange={this.handleChange} />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label htmlFor="fieldAddress">Field Address</Label>
        <Input type="text" name="fieldAddress" id="addressId" value={this.state.leagueObj.fieldAddress} onChange={this.handleChange}/>
      </FormGroup>
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
