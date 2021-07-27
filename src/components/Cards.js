import React from "react";
import CountUp from "react-countup";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const Cards = ({ data }) => {
  if (!data.data) {
    return "...Loading";
  } else {
    return (
      <div>
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>Confirmed Cases</Card.Title>
              <Card.Text>
                <CountUp
                  start={0}
                  end={data.data.actuals.cases}
                  duration={2}
                  separator="."
                />
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Death Cases</Card.Title>
              <Card.Text>
                <CountUp
                  start={0}
                  end={data.data.actuals.deaths}
                  duration={2}
                  separator="."
                />
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Negative Test Cases</Card.Title>
              <Card.Text>
                <CountUp
                  start={0}
                  end={data.data.actuals.negativeTests}
                  duration={2}
                  separator="."
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
};

export default Cards;
