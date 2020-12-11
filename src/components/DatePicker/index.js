import React, { Component } from 'react';
import { FormGroup, Label } from 'reactstrap';

const DatePicker = require('reactstrap-date-picker');

export default class DatePickerDropdown extends Component {
  state = {
    value: new Date().toISOString(),
  }

  handleChange(value, formattedValue) {
    this.setState({
      value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue, // Formatted String, ex: "11/19/2016"
    });
  }

  // componentDidUpdate() {
  //   // Access ISO String and formatted values from the DOM.
  //   const hiddenInputElement = document.getElementById('example-datepicker');
  //   console.warn(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
  //   console.warn(hiddenInputElement.getAttribute('data-formattedvalue')); // Formatted String, ex: "11/19/2016"
  // }

  render() {
    const { title } = this.props;
    return (
      <FormGroup>
        <Label>{title}</Label>
        <DatePicker id="example-datepicker" value={this.state.value} onChange={(v, f) => this.handleChange(v, f)} />
      </FormGroup>
    );
  }
}
