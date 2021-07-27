import React, { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import States from "./components/States";
import Cards from "./components/Cards";
import Charts from "./components/Charts";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async (country) => {
      let url = "";

      if (country === "" || country === "USA") {
        url =
          "https://api.covidactnow.org/v2/country/US.json?apiKey=f1e6a26157b645dba24ada6af4ec4552";
      } else {
        url = `https://api.covidactnow.org/v2/state/${country}.json?apiKey=f1e6a26157b645dba24ada6af4ec4552`;
      }

      try {
        const response = await axios.get(url);

        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(country);
  }, [country]);

  const countryForm = async (country) => {
    setCountry(country);
  };

  return (
    <div>
      <NavBar />

      <Container fluid>
        <Row
          style={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Col xl={3}>
            <States countryForm={countryForm} />
          </Col>
          <Col xl={5}>
            <Charts data={data} country={country} />
          </Col>
          <Col xl={2}>
            <Cards data={data} country={country} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
