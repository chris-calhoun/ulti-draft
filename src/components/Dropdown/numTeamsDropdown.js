import React from 'react';

export default function TeamsDropdown() {
  return (
<div className="form-group">
  <label for="sel1">Number of Teams</label>
    <select className="form-control" id="sel1">
    <option value="1">1</option>
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
