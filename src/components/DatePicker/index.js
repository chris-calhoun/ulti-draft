import React, { Component } from 'react';
import { FormGroup, Label } from 'reactstrap';

const DatePicker = require('reactstrap-date-picker');

export default class DatePickerDropdown extends Component {
  state = {
    value: new Date().toISOString(),
  }

  handleDateChange(value, formattedValue) {
    this.setState({
      value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue, // Formatted String, ex: "11/19/2016"
    });
  }

  handleDateSelect() {
    this.props.onDateSelect(this.props.id, this.state.formattedValue);
  }

  componentDidUpdate() {
    // Access ISO String and formatted values from the DOM.
    const hiddenInputElement = document.getElementById(this.props.id);
    console.warn(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.warn(hiddenInputElement.getAttribute('data-formattedvalue')); // Formatted String, ex: "11/19/2016"
  }

  render() {
    const { title, name, id } = this.props;
    return (
      <FormGroup>
        <Label>{title}</Label>
        <DatePicker id={id} name={name} value={this.state.value} onChange={(v, f) => this.handleDateChange(v, f)} />
      </FormGroup>
    );
  }
}
