import React, { useState, useEffect } from "react";

import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";

const Charts = ({ data, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get(
          "https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=f1e6a26157b645dba24ada6af4ec4552"
        );

        setDailyData(response);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  let chart;

  if (dailyData.data && (country === "USA" || country === "")) {
    console.log(dailyData.data, "if");
    chart = (
      <Line
        data={{
          labels: dailyData.data.actualsTimeseries.map((e) => e.date),
          datasets: [
            {
              data: dailyData.data.actualsTimeseries.map((e) => e.cases),
              label: "Confirmed Cases",
              borderColor: "red",
              fill: true,
            },
            {
              data: dailyData.data.actualsTimeseries.map((e) => e.deaths),
              label: "Deaths Cases",
              borderColor: "black",
              fill: true,
            },
          ],
        }}
        options={{
          legends: {
            labels: {
              fontColor: "black",
              fontSize: 18,
            },
          },
          title: {
            display: true,
            text: "Covid-19 in the world",
            fontColor: "black",
          },
        }}
      />
    );
  } else if (data.data) {
    chart = (
      <Doughnut
        data={{
          labels: ["Confirmed", "Negative Cases", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: ["cornflowerblue", "grey", "red"],
              data: [
                data.data.actuals.cases,
                data.data.actuals.negativeTests,
                data.data.actuals.deaths,
              ],
            },
          ],
        }}
        options={{
          legends: {
            display: true,
            fontColor: "white",
          },
          title: {
            display: true,
            text: `Covid-19 in ${country}`,
            fontColor: "black",
          },
        }}
      />
    );
  }

  if (!data.data) {
    return "Loading...";
  } else {
    return <div> {chart} </div>;
  }
};

export default Charts;
