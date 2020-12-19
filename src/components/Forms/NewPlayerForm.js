import Rebase from 're-base';
import firebase from 'firebase';
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
import axios from 'axios';
import TeamPlayersData from '../../helpers/data/TeamPlayersData';

const baseUrl = 'https://ulti-draft-default-rtdb.firebaseio.com/';

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
      leagueId: this.props?.leagueId || '',
    },
  }

  componentDidMount() {
    const base = Rebase.createClass(firebase.database());
    this.setState({
      base,
    });
  }

  componentDidUpdate() {
    this.props.onUpdate(this.props.teamId);
  }

  handleChange = (e) => {
    this.setState((prevState) => ({
      playerData: {
        ...prevState.playerData,
        [e.target.name]: e.target.value,
      },
    }));
  }

  addPlayer = () => {
    const immediateRef = this.state.base.push('/Player', {
      data: this.state.playerData,
    });
    const generatedKey = immediateRef.key;
    const { teamId } = this.props;

    this.patchKey(generatedKey);
    TeamPlayersData.createTeamPlayerJoin(teamId, generatedKey);
  }

  patchKey = (playerId) => new Promise((resolve, reject) => {
    axios.patch(`${baseUrl}/Player/${playerId}.json`, { id: playerId })
      .then(resolve)
      .catch((error) => reject(error));
  })

  handleSubmit = (e) => {
    e.preventDefault();
    this.addPlayer();
    // this.props.onUpdate(this.props.teamId);
    this.props.toggle();
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
      <Button>Submit</Button>
    </Form>
    );
  }
}
