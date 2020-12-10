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
import DatePicker from '../DatePicker';

export default class DraftDetailsForm extends Component {
  render() {
    return (
      <Form>
      <Row form>
        <Col>
          <FormGroup>
            <Label for="leagueName">League Name</Label>
            <Input type="text" name="leagueName" id="leagueNameId" placeholder="Nashville Indoor League" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="fieldAddress">Field Address</Label>
        <Input type="text" name="address" id="addressId" placeholder="2500 West End"/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" id="exampleCity" placeholder="Nashville"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" id="exampleState" placeholder="TN"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" id="exampleZip" placeholder="37203"/>
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
        <Label for="exampleAddress2">Address 2</Label>
        <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
      </FormGroup>
      <Button>Sign in</Button>
    </Form>
    );
  }
}
