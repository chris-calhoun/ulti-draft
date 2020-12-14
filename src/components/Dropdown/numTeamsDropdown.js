import React from 'react';

export default function TeamsDropdown(props) {
  return (
<div className="form-group">
  <label htmlFor="sel1">Number of Teams</label>
    <select className="form-control" name="numTeams" defaultValue="Select a number" onChange={props.onChange} id="sel1">
      <option value="Select a number" disabled>Select a number</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
    </select>
</div>
  );
}
