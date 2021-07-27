import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const States = ({ countryForm }) => {
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(
          " https://api.covidactnow.org/v2/states.json?apiKey=f1e6a26157b645dba24ada6af4ec4552"
        );

        const list = response.data.map((item) => item.state);

        setStateList(list);
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, []);

  return (
    <div>
      <Form.Group>
        <Form.Label>Choose a state from the list</Form.Label>
        <Form.Control onChange={(e) => countryForm(e.target.value)} as="select">
          <option value="USA">United States</option>
          {stateList.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default States;
