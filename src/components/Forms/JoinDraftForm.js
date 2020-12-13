import React, { Component } from 'react';
import {
  Button,
  Form,
  Input,
  FormText,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import LeagueData from '../../helpers/data/leagueData';

class JoinDraftForm extends Component {
  state = {
    draftCode: '',
    draftExists: true,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  navigateToDraft = (draftCode) => {
    const { history } = this.props;
    if (history) {
      history.push({
        pathname: `./active-draft/${draftCode}`,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { draftCode } = this.state;

    LeagueData.getLeague(draftCode).then((resp) => {
      if (resp) {
        this.navigateToDraft(draftCode);
      } else {
        this.setState({
          draftExists: false,
        });
      }
    });
  }

  render() {
    let showErrorText;
    const { draftExists } = this.state;

    switch (draftExists) {
      case false:
        showErrorText = (
          <FormText color="danger">Draft does not exist, please try again.</FormText>
        );
        break;
      case true:
        break;
      default:
        console.warn('addOrSubmit state not found');
    }
    return (
      <Form onSubmit={this.handleSubmit}>
          <Input type="text" name="draftCode" id="draftCodeId" value={this.state.name} onChange={this.handleChange} required/>
          {showErrorText}
          <div className="d-flex justify-content-center mt-3">
            <Button>submit</Button>
          </div>
      </Form>
    );
  }
}

export default withRouter(JoinDraftForm);
