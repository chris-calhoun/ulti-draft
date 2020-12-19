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
import PlayerData from '../../helpers/data/playerData';
// import TeamPlayersData from '../../helpers/data/TeamPlayersData';

export default class NewPlayerForm extends Component {
  state = {
    teamKey: this.props?.teamKey,
    playerData: {
      age: '',
      available: false,
      first_name: '',
      gender: '',
      id: '',
      last_name: '',
      leagueId: this.props?.leagueId,
    },
  }

  handleChange = (e) => {
    this.setState((prevState) => ({
      playerData: {
        ...prevState.playerData,
        [e.target.name]: e.target.value,
      },
    }));
  }

  handleSave = (e) => {
    e.preventDefault();
    const { playerData } = this.state;
    // console.warn(playerData);
    PlayerData.addPlayer(playerData);
    // TeamPlayersData.createTeamPlayerJoin(teamKey, playerId);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="mb-5">
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="first_name">First Name</Label>
            <Input type="text" name="first_name" id="firstNameId" value={this.state.playerData.first_name} onChange={this.handleChange}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="last_name">Last Name</Label>
            <Input type="text" name="last_name" id="lastNameId" value={this.state.playerData.last_name} onChange={this.handleChange}/>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="age">Age</Label>
              <Input type="text" name="age" id="ageId" value={this.state.playerData.age} onChange={this.handleChange}/>
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
        <Col md={6}>
            <FormGroup>
              <Label htmlFor="gender">Gender</Label>
              <Input type="text" name="gender" id="genderId" value={this.state.playerData.gender} onChange={this.handleChange}/>
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
      <Button onClick={this.handleSave}>Save</Button>
      <Button>Submit</Button>
    </Form>
    );
  }
}
