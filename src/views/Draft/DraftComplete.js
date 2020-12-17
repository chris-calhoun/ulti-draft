import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const DraftComplete = () => (
    <div>
      <Jumbotron>
        <h1 className="display-3">Draft Complete</h1>
        <p className="lead">Thanks for joining and good luck this season!</p>
        <hr className="my-2" />
        <p className="lead">
        <Link to = "/">
          <Button color="success">Exit Draft</Button>
        </Link>
        </p>
      </Jumbotron>
    </div>
);

export default DraftComplete;
